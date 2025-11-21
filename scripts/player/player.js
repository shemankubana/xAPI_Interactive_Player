var _iv_ = _iv_ || {};

_iv_.cfg = _iv_config;
_iv_.time = 0;
_iv_.seek = false;
_iv_.video = document.getElementById('player-video');
_iv_.title = document.getElementById('player-title');
_iv_.descr = document.getElementById('player-descr');
_iv_.modal = document.getElementById('player-modal');
_iv_.question_active = false;
_iv_.started = false;
_iv_.num_scored_questions = 0;
_iv_.xapi_enabled = true;
_iv_.xapi_warn = true;
_iv_.xapi_video_name = "video-test";
_iv_.xapi_question_label = "question-";

if(_iv_.cfg.show_feedback_on_markers){
  $('body').addClass('feedback_on_markers');
}

_iv_.video.innerHTML = '<video id=\"question_video\" controls preload=\"none\" class=\"video-js vjs-default-skin\" width=\"100%\" height=\"100%\" poster=\"'+_iv_.cfg.poster_image_url+'\"><source src="' + _iv_.cfg.source + '" type="video/mp4"></video>';
_iv_.title.innerHTML = _iv_.cfg.title;
_iv_.descr.innerHTML = _iv_.cfg.description;

$(document).ready(function() {
  if(_iv_.xapi_enabled){
    xapi_user_functions(); 
  } else {
    hide_user_login();
  }
  
  _iv_.player = videojs('question_video');
  _iv_.player.markers({
    markerTip: {
      display: true,
      text: function(marker) {
        return marker.label;
      }
    },
    markers: _iv_.cfg.markers,
    onMarkerReached: function(marker, index) {
      if (!$('.vjs-marker').eq(index).hasClass('visited') && (index === 0 || $('.vjs-marker').eq(index - 1).hasClass('visited'))) {
      // if (index === 0 || $('.vjs-marker').eq(index - 1).hasClass('visited')) { 
        showQuestion(index);
        send_xapi_statement('reached', _iv_.xapi_video_name + '/' + _iv_.xapi_question_label + (index+1));
      }
    },
    onMarkerClick: function(marker) {
      if (_iv_.cfg.allow_question_review && (marker.index === 0 || $('.vjs-marker').eq(marker.index - 1).hasClass('visited'))) {
        showQuestion(marker.index);
      }
    }
  });

  _iv_.player.on('playing', function(event) {
    if(!_iv_.started){
      send_xapi_statement('started-watching', _iv_.xapi_video_name);
      _iv_.started = true;
    }
  });

  _iv_.player.on('seeked', function(event) {
    seekIfAllowed();
  });

  _iv_.player.on('seeking', function(event) {
    seekIfAllowed();
  });
  
  _iv_.player.on('ended', function() {
    send_xapi_statement('finished-watching', _iv_.xapi_video_name);
    _iv_.num_scored_questions = $('.vjs-marker.correct').length + $('.vjs-marker.incorrect').length;
    var raw_score = $('.vjs-marker.correct').length/_iv_.num_scored_questions;
    var results_html = '<div id=\"results-screen\" class=\"spacing-sm\">';
    if(_iv_.num_scored_questions > 0){
      results_html += '<h4>Results</h4><p>You correctly answered <strong>' + $('.vjs-marker.correct').length + ' / ' + _iv_.num_scored_questions + '</strong> questions</p><h4>Score</h4><h1 style=\"border-top:none;font-size:7.5vw\">' + Math.round(100*raw_score) + '%</h1>';
      if(raw_score < 1){
        results_html +="<br><br><button class=\"button-clean\" onClick=\"window.location.reload();\">Try Again?</button>";
      }
    } else {
      results_html += '<h4>Results</h4><h1 style=\"border-top:none;font-size:7.5vw\">Complete</h1><p>This video did not have a scored portion. Thanks for watching.</p>';
    }
    results_html+= '</div>';
    $('.outer-wrapper').prepend(results_html);
    $(_iv_.video).slideUp();
    $('#results-screen').slideDown();

    // Notify Rise 360 that the interaction is complete
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'complete' }, '*');
    }
  });

  setInterval(function(event) {
    _iv_.time = _iv_.player.currentTime();
  }, 200);
});

var force_allow_seeking = false;

function navigateToTime(t) {
  force_allow_seeking = true;
  for(var i = 0; i < _iv_.cfg.markers.length; i++){
    if(_iv_.cfg.markers[i].time < t){
      if(!$('.vjs-marker').eq(i).hasClass('visited')){
        $('.vjs-marker').eq(i).addClass('visited');
      }
    }
  }
  setTimeout(function(){
    _iv_.player.currentTime(t);
    _iv_.player.play();
    hideHotspot($('.vjs-marker').eq(0));    
    seekIfAllowed();
  },100);
  setTimeout(function(){
    force_allow_seeking = false;
  },200);
}

function hotspotFunctionCall(el,i,j){
  console.log(el);
  _iv_.cfg.markers[i].choices[j].action(_iv_.player, el);
  $('.hotspot-feedback').show(0);
  $('.hotspot-pre').hide(0);
}

function assembleQuestions() {
  var questions = "";
  for (var i = 0; i < _iv_.cfg.markers.length; i++) {
    var i_base1 = i + 1;
    var question_content = '<div class=\"question-content\" id=\"question--' + i + '\" style=\"display:none\">' + '<h2 class=\"question-text\">' + _iv_.cfg.markers[i].main_text + '<div class=\"question-label\">' + _iv_.cfg.markers[i].label + '</div></h2>';
    if(_iv_.cfg.markers[i].type === 'hotspot'){
      var htspt = _iv_.cfg.markers[i].choices;
      var hotspot_html = '';

      for(var j = 0; j < htspt.length; j++){
        hotspot_html += '<div class=\"hotspot '+htspt[j].classes+' \" onclick=\"hotspotFunctionCall($(this),'+i+','+j+')\" style=\"width:' + htspt[j].size[0] + '%;height:' + htspt[j].size[1] + '%;top:' + htspt[j].coord[0] + '%;left:' + htspt[j].coord[1] + '%;\"><div class=\"inner\">'+htspt[j].inner_label+'</div></div>';
      }

      hotspot_html += '<div class=\"h-instructions\"><h2 class=\"question-text hotspot-pre\">' + _iv_.cfg.markers[i].main_text + '<div class=\"question-label\">' + _iv_.cfg.markers[i].label + '</div></h2><button class=\"hotspot-continue hotspot-feedback\" data-custom_index='+i+'>Continue</button></div>';
      question_content += '<div class="hotspot-wrapper">' + hotspot_html + '</div>';
      question_content += '</div>';
    } else if(_iv_.cfg.markers[i].type === 'multiple-choice'){
      _iv_.num_scored_questions++;
      question_content += '<ul>';

      for (var j = 0; j < _iv_.cfg.markers[i].choices.length; j++) {
        var classes = '';
        for (var k = 0; k < _iv_.cfg.markers[i].correct.length; k++) {
          if ( _iv_.cfg.markers[i].choices[j].label === _iv_.cfg.markers[i].correct[k] ) {
            classes += 'correct';
          }
        }
        question_content += '<li id=\"question--' + i + '-choice--' + _iv_.cfg.markers[i].choices[j].label + '\" class=\"' + classes + '\">' + _iv_.cfg.markers[i].choices[j].content + '</li>';
      }
      question_content += '</ul><button class=\"submit\">Submit</button></div>';
    } else {
      question_content += '<p>' + _iv_.cfg.markers[i].small_text + '</p>';
      question_content += '</ul><button class=\"continue visible\">Continue</button></div>';
    }
    questions += question_content;
  }
  _iv_.modal.innerHTML += questions;
  setTimeout(function() {
    addQuestionInteractivity();
  }, 100);
}

assembleQuestions();

function showQuestion(index) {
  _iv_.player.pause();
  _iv_.question_active = true;
  $('.question-content').hide();
  $('#question--' + index).show();
  if($('#question--' + index).find('.hotspot-wrapper').length > 0){
    displayHotspots(index);
  } else {
    setTimeout(function() {
      $('.modal-overlay').fadeIn();
    }, 0);
  }
}

function setSeeking(bool) {
  _iv_.seek = bool;
  setTimeout(function() {
    _iv_.seek = true;
  }, 1000);
}

function seekIfAllowed() {
  try{

    if (
      _iv_.player.currentTime() >
      _iv_.player.markers.getMarkers()[$('.vjs-marker.visited').length].time
      ) {
      if (force_allow_seeking){
        setSeeking(true);
      } else {
        _iv_.player.currentTime(_iv_.time);
        setSeeking(false);
      }
    } else {
      setSeeking(true);
    }
  } catch (e) {
    // console.log(e);
  }
}

function addQuestionInteractivity() {
  $('.question-content li').on('click', function() {
    var $this = $(this);
    var $question = $this.closest('.question-content');
    if ($this.hasClass('selected')) {
      $question.find('.submit').removeClass('visible');
    } else {
      $question.find('li').removeClass('selected');
      $question.find('.submit').addClass('visible');
    }
    $this.toggleClass('selected');
  });
  
  $('.submit').on('click', function() {
    var index = $(this).closest('.question-content').attr('id').split('question--')[1];
    console.log('index',index);
    var current_marker = $('.vjs-marker').eq(index);
    checkQuestion($(this), current_marker, index);
  });

  $('.continue').on('click', function() {
    var index = $(this).closest('.question-content').attr('id').split('question--')[1];
    var current_marker = $('.vjs-marker').eq(index);
    hideModalAndResume(current_marker);
  });  
  $('.hotspot-continue').on('click', function() {
    var index = parseInt($(this).data('custom_index'));
    var current_marker = $('.vjs-marker').eq(index);
    hideHotspot(current_marker);
  });   
}

function checkQuestion($el, current_marker, index) {
  var question_correct = true;
  console.log('checkQuestion',$el, current_marker, index);
  $el.closest('.question-content').find('li').each(function() {
    if (($(this).hasClass('correct') && !$(this).hasClass('selected')) || (!$(this).hasClass('correct') && $(this).hasClass('selected'))) {
      question_correct = false;
    }
  });
  console.log('checkQuestion - question_correct', question_correct);
  if (question_correct) {
    current_marker.addClass('correct').removeClass('incorrect');
  } else {
    current_marker.addClass('incorrect').removeClass('correct');
  }

  if(_iv_.cfg.show_feedback_after_questions){
    showQuestionFeedback($el,question_correct, current_marker, index);
  } else {
    hideModalAndResume(current_marker);
  }
}

function showQuestionFeedback($el, question_correct, current_marker, index) {
  var feedback_content = '';
  var after_continue_enabled = false;
  if (question_correct) {
    feedback_content += '<h2 class=\"correct-feedback\">'+_iv_.cfg.markers[index].feedback.correct.label+'</h2>';
    feedback_content += '<p>'+_iv_.cfg.markers[index].feedback.correct.details;
    if(_iv_.cfg.markers[index].feedback.correct.continue_action){
      after_continue_enabled = true;
    }
    sendQuestionFeedback('correctly-answered', index);
  } else {
    feedback_content += '<h2 class=\"incorrect-feedback\">'+_iv_.cfg.markers[index].feedback.incorrect.label+'</h2>';
    feedback_content += '<p>'+_iv_.cfg.markers[index].feedback.incorrect.details;
    if(_iv_.cfg.markers[index].feedback.incorrect.continue_action){
      after_continue_enabled = true;
    }
    sendQuestionFeedback('incorrectly-answered', index);
  }
  feedback_content += '<a href=\"#\" onclick=\"afterContinue('+index+','+question_correct+','+after_continue_enabled+')\" class=\"continue-button\">Continue</a></p>';

  showFeedbackContent($el.closest('.question-content'),current_marker,feedback_content);
}
function sendQuestionFeedback(status_correct, index){
  send_xapi_statement(status_correct, _iv_.xapi_video_name + '/' + _iv_.xapi_question_label +(1+parseInt(index))); 
}

function hide_user_login(){
  $('.change-user').hide();
}

function xapi_user_functions(){
  //xapi_mbox defined in xapi.js
  //xapi_name defined in xapi.js
  
  $('textarea#name_field').val(xapi_name);
  $('textarea#email_field').val(xapi_mbox.split('mailto:')[1]);

  $('.change-user').on('click',function(){
    $(this).toggleClass('changing');
    // Put the object into storage
    localStorage.setItem('xapi_mbox', xapi_mbox);
    localStorage.setItem('xapi_name', xapi_name);
  });
  
  $('.change-user textarea').on('click',function(ev){
    ev.stopPropagation();
  }); 
  $('.change-user textarea').on('keyup',function(){
    xapi_mbox = 'mailto:'+$('textarea#email_field').val();
    xapi_name = $('textarea#name_field').val();
  });  
}

function check_if_enter(){
  var key = window.event.keyCode;

  // If the user has pressed enter
  if (key === 13) {
    event.preventDefault();
    $('.change-user').trigger('click');
    return false;
  }
  else {
    return true;
  }
}

function afterContinue(index,correct,enabled){
  if(enabled){
    if(correct){
      _iv_.cfg.markers[index].feedback.correct.continue_action(_iv_.player);
    } else {
      _iv_.cfg.markers[index].feedback.incorrect.continue_action(_iv_.player);
    }
  }
}

function showFeedbackContent($el,current_marker,feedback_content){
  $el.html(feedback_content);
  $('.continue-button').on('click',function(){
    hideModalAndResume(current_marker);
  });
}

function hideModalAndResume(current_marker){
  $('.modal-overlay').fadeOut();
  current_marker.addClass('visited');
  _iv_.player.play();
  _iv_.question_active = false;
}

function displayHotspots(index){
  $('#question--' + index).find('.hotspot-wrapper').find('.hotspot-pre').show(0);
  $('#question--' + index).find('.hotspot-wrapper').find('.hotspot-feedback').hide(0);
  $(_iv_.video).append($('#question--' + index).find('.hotspot-wrapper').clone(true));
}

function hideHotspot(current_marker){
  $('.inner-wrapper').children('.hotspot-wrapper').html('').remove();
  if(current_marker.hasClass('correct') || current_marker.hasClass('incorrect')){
    current_marker.addClass('visited');
  }
  hideModalAndResume(current_marker);
}

setInterval(function() {
  if (_iv_.question_active) {
    _iv_.player.pause();
  }
}, 300);
