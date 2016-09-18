(function() {
  var questions = [
  
  {
  	
    question: "WHICH OF THESE ARE NOT CAST OF MOVIE BAAR BAAR DEKHO?",
	choices: ['SIDDHARTH MALHOTRA' , 'KATRINA KAIF' ,'SAUANI GUPTA','ANUPAM KHER'],
    correctAnswer: 3
  }, 
  
  {
    question: "FROM WHERE DOES VEERU PROPOSE TO BASANTHI IN SHOLAY?",
    choices: ['TOP OF ROOF', 'TOP OF LADDER', 'TOP OF WATER TANK', 'TOP OF TREE'],
    correctAnswer: 2
  }, 
  
  {
    question: "WHICH OF THESE BOLLYWOOD CELEBRATIES ARE PAIRS?",
    choices: ['SHAHRUKH KHAN-GOWRI','ABHISHEK BACCHAN-AISHWARYA RAI','AMITABH BACCHAN-JAYA BACCHAN', 'ALL OF THE ABOVE'],
    correctAnswer: 3
  }, 
  
  {
    question: "SONG 'EK DO THEEN' OF MADHURI DIXIT IS PICTURISED IN WHICH MOVIE?",
    choices: ['MR.INDIA','TEZAAB', 'RAM LAKHAN', 'PUKAR'],
    correctAnswer: 1
  }, 
  
  {
    question: "WHAT IS THE NAME OF AISHWARYA RAI IN THE MOVIE DHOOM2?",
    choices: ['SUNEHRI','SARA','SIMRAN','SUHANA'],
    correctAnswer: 0
  },
  
  {
    question: "WHICH OF THESE ARE NOT THE MOVIE OF AKSHAY KUMAR?",
    choices: ['BABY','AIRLIFT','HOUSEFULL3','KHATORON KI KHILADI'],
    correctAnswer: 4
  },
  
  {
    question: "WHICH MOVIE IS NOT DIRECTED BY SANJAY LEELA BANSHALI",
    choices: ['HUM DIL DE CHUKE SANAM','BAAJIRAO-MASTAANI','HUM AAPKE HAI KAUN','SAAWARIYA'],
    correctAnswer: 2
  },
  
  {
    question: "WHICH OF THESE ACTORS NOT ACTED IN A BIOPIC MOVIES?",
    choices: ['FARHAN AKTHAR','IMRAAN HASHMI','PRIYANKA CHOPRA','DEEPIKA PADOKONE'],
    correctAnswer: 3
  },
  
  {
    question: "WHICH OF THESE ACTRESSES PAIR DID NOT ACT IN A SAME MOVIE?",
    choices: ['KANGNA RANAUT-PRIYANKA CHOPRA','ANUSHKA SHARMA-KATRINA KAIF','BIPASHA BASU-DEEPIKA PADOKONE','SONAKSHI SINHA-MAADHURI DIXIT'],
    correctAnswer: 3
  },
  
  {
    question: "WHICH WAS THE FIRST HINDI MOVIES TO RECIEVE THE NATIONAL AWARD?",
    choices: ['KABULIWALA','DO AANKHEN BARAH HAATH','MIRZA GHALIB','SATYA'],
    correctAnswer: 2
  }
  
  ];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();

