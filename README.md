# Interactive Video Player #

Video player that supports quizzing, hotspots, scoring etc. 

# Replacing the Video #

To replace the video go into the assets folder. You can either delete the sample-vid.mp4 and drag in a new video with the same name or drag in a new video with a different name and update the name of the video in the config file I will mention later. 

NOTE: You can also update the poster.png file in the assets folder with a new screen shot of your video. 

# Updating the Config #

- In the scripts folder is a config.js file. Open that up in any text editor to add your questions. 

In this file you can do several things, change the name of the title and description, update the parth to the video and poster image and addjust if you want it xAPI or not. You also enter in your xAPI connection info. 

# Markers #

Markers are the dots that get created on the video. Add a new marker section made up of this kind of code for multiple choice questions. 

{
  index: 5,
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

Or this for just info pop ups

{
  index: 2,
  time: 15,
  label: "Information",
  main_text : "Looking for additional information about jQuery?",
  small_text : "Please visit <a href='https://www.jquery.com'>jQuery.com</a>",
  type : "information",
},

Update the time, label and text as well as correct and incorrect answers and feedback. 

#Beta JSON builder#

If you are not comfortable with JSON you can try out the builder tool that is currently in BETA so it may not be fully functional yet. http://jeffbatt.com/videobuilder/