var _iv_config = {
  title: "Using jQuery in Tumult Hype",
  description:
    "This is the description for the video. It can be as long as you want. It can contain <b>bold</b> or other HTML formatting tags.",
  // Option 1: Use a URL to an externally hosted video (recommended for smaller ZIP files)
  // source : 'https://your-domain.com/path-to-your-video.mp4',
  // Option 2: Use a local video file from the assets folder
  source : './assets/sample-vid.mp4',
  // Poster image can also be a URL or local file
  poster_image_url : './assets/poster.png',
  show_feedback_after_questions : true,
  show_feedback_on_markers : true,
  allow_question_review : true,
  x_api : true,
  x_api_endpoint: "https://cloud.scorm.com/lrs/CJ0NK8AJKV/sandbox/",
  x_api_username: "4NWI_hcWLlmqyQAhSiE",
  x_api_password: "aVkZim3lxv8kt7NE2xo",
  markers: [
    {
      index: 0,
      time: 5,
      label: "Question 1",
      main_text : "Where can you download jQuery?",
      type : "multiple-choice",
      choices : [
      	{ 'label':'A',
          'content':'facebook.com'},
      	{ 'label':'B',
          'content':'jQuery.com'},
      	{ 'label':'C',
          'content':'learningdojo.net'},
      	{ 'label':'D',
          'content':'It can&rsquo;t be downloaded&mdash;it must seek you out'},
      ],
      correct : ['B'],
      feedback : {
        correct : {
          label : "That's Correct!",
          details : "You correctly identified the answer from that video segment.",
          continue_action : function(_iv_){
            console.log('after continue correct');
          }
        },
        incorrect : {
          label : "Sorry, that's not correct.",
          details : "You should review the video segment to identify the correct answer.",
          continue_action : function(_iv_){
            console.log('after continue incorrect');
            navigateToTime(5); 
          }
        }
      }
    },
    {
      index: 1,
      time: 15,
      label: "Information",
      main_text : "Looking for additional information about jQuery?",
      small_text : "Please visit <a href='https://www.jquery.com'>jQuery.com</a>",
      type : "information",
    },
    {
      index: 2,
      time: 19.5,
      label: "Question 2",
      main_text : "You can download both the uncompressed or compressed version at jQuery.com <span class='instructions'>(true or false)</span>",
      type : "multiple-choice",
      choices : [
      	{ 'label':'T',
          'content':'True'},
      	{ 'label':'F',
          'content':'False'}
      ],
      correct : ['T'],
      feedback : {
        correct : {
          label : "That's Correct!",
          details : "You correctly identified the answer from that video segment."
        },
        incorrect : {
          label : "Sorry, that's not correct.",
          details : "You should review the video segment to identify the correct answer."
        }
      }
    },
    {
      index: 3,
      time: 29.5,
      label: "Question 3",
      main_text : "What is the version of jQuery highlighted in the video?",
      type : "multiple-choice",
      choices : [
      	{ 'label':'A',
          'content':'3.1.0'},
      	{ 'label':'B',
          'content':'3.1.1'},
      	{ 'label':'C',
          'content':'0.1'},
      	{ 'label':'D',
          'content':'25'},
      ],
      correct : ['B'],
      feedback : {
        correct : {
          label : "That's Correct!",
          details : "You correctly identified the answer from that video segment."
        },
        incorrect : {
          label : "Sorry, that's not correct.",
          details : "You should review the video segment to identify the correct answer."
        }
      }
    },
    {
      index: 4,
      time: 40,
      label: "Question 4",
      main_text : "Tumult Hype is compatible with jQuery <span class='instructions'>(true or false)</span>",
      type : "multiple-choice",
      choices : [
      	{ 'label':'T',
          'content':'True'},
      	{ 'label':'F',
          'content':'False'}
      ],
      correct : ['T'],
      feedback : {
        correct : {
          label : "That's Correct!",
          details : "You correctly identified the answer from that video segment."
        },
        incorrect : {
          label : "Sorry, that's not correct.",
          details : "You should review the video segment to identify the correct answer."
        }
      }
    },
    // {
    //   time: 16,
    //   label: "Question 2",
    //   main_text : "Which of the following are most important? (Select all that apply)",
    //   type : "multiple-select",
    //   choices : {
    //   	'A':'This is choice A',
    //   	'B':'This is choice B',
    //   	'C':'This is choice C',
    //   	'D':'This is choice D'
    //   },
    //   correct : ['A','B','D']
    // },
    // {
    //   time: 23.6,
    //   label: "Question 3",
    //   main_text : "How does this portion of the video make you feel?",
    //   type : "text-free",
    // },
    // {
    //   time: 28,
    //   label: "Question 4",
    //   main_text : "What is the best way to build a course?",
    //   type : "text-specific",
    //   correct : "This is the specified response.",
    //   percent_match : 0.95
    // },
    // {
    //   time: 36,
    //   label: "Question 5",
    //   main_text : "What is the best way to develop?",
    //   type : "text-specific",
    //   correct : "This is the more loosely specied response.",
    //   percent_match : 0.5
    // }
 ]
};
