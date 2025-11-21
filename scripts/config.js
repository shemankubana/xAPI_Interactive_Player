var _iv_config = {
  title: "Interactive Training Video",
  description:
    "This is a placeholder description for your training video. Replace this with your own content.",
  // Option 1: Use a URL to an externally hosted video (recommended for smaller ZIP files)
  source : 'https://articulateusercontent.com/rise/courses/DKyqJJHMztHe3Dzzi5p6VPd7hkLxZ22T/transcoded-r7VXbCH5HlvyRl7K-Into%2520of%2520New%2520construction%2520permit.mp4?v=1',
  // Option 2: Use a local video file from the assets folder
  // source : './assets/sample-vid.mp4',
  // Poster image can also be a URL or local file
  poster_image_url : 'https://your-cdn.com/poster-image.jpg',
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
      time: 90,
      label: "Question 1",
      main_text : "Based on the content covered so far, what is the main topic of this section?",
      type : "multiple-choice",
      choices : [
      	{ 'label':'A',
          'content':'Answer option A'},
      	{ 'label':'B',
          'content':'Answer option B'},
      	{ 'label':'C',
          'content':'Answer option C'},
      	{ 'label':'D',
          'content':'Answer option D'},
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
      index: 1,
      time: 240,
      label: "Additional Information",
      main_text : "Need more information on this topic?",
      small_text : "Visit our <a href='https://your-website.com/resources'>resource center</a> for additional materials.",
      type : "information",
    },
    {
      index: 2,
      time: 390,
      label: "Question 2",
      main_text : "The key concept explained in this segment is important for understanding the overall process. <span class='instructions'>(true or false)</span>",
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
      time: 540,
      label: "Question 3",
      main_text : "Which of the following best describes the procedure demonstrated in this section?",
      type : "multiple-choice",
      choices : [
      	{ 'label':'A',
          'content':'First procedure option'},
      	{ 'label':'B',
          'content':'Second procedure option'},
      	{ 'label':'C',
          'content':'Third procedure option'},
      	{ 'label':'D',
          'content':'Fourth procedure option'},
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
      time: 720,
      label: "Key Takeaway",
      main_text : "Remember this important point",
      small_text : "This is a critical concept that will be referenced throughout the training. Make sure you understand it fully before continuing.",
      type : "information",
    },
    {
      index: 5,
      time: 840,
      label: "Question 4",
      main_text : "Based on everything covered in this video, which statement is most accurate?",
      type : "multiple-choice",
      choices : [
      	{ 'label':'A',
          'content':'Summary statement A'},
      	{ 'label':'B',
          'content':'Summary statement B'},
      	{ 'label':'C',
          'content':'Summary statement C'},
      	{ 'label':'D',
          'content':'Summary statement D'},
      ],
      correct : ['C'],
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
