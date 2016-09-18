(function() {
  var questions = [
  
  {
    question: "WHO IS FIRST CRICKETER TO HIT FIRST DOUBLE CENTURY IN ODI?",
	choices: ['SEHWAG','SACHIN TENDULKAR','MARTIN GUPTILL','ROHIT SHARMA'],
    correctAnswer: 1
  }, 
  
  {
    question: "WHICH OF THESE FRANCHISE ARE NOT FROM THE FIRST SEASON OF IPL?",
    choices: ['MUMBAI INDIANS','RAJASTHAN ROYALS','SUNRISERS HYDREBAD','ROYAL CHALLENGERS BANGALORE'],
    correctAnswer: 2
  }, 
  
  {
    question: "WHICH OF THESE CRICKETERS ARE NOT RETIRED FROM TEST CRICKET?",
    choices: ['MITCHELL JHONSON','MS DHONI','GAUTHAM GAMBHIR','BRENDON MACCULLUM'],
    correctAnswer: 2
  }, 
  
  {
    question: "THE FASTEST CENTURY IN ODI IS HIT BY?",
    choices: ['COREY ANDERSON','SHAHID AFRIDI','SHEWAG','AB DE VILLIERS'],
    correctAnswer: 3
  }, 
  
  {
    question: "THE FIGURE 4 RUNS AND 6 WICKETS IS ACHIEVED BY??",
    choices: ['MITCHELL JOHNSON','STUART BINNY','DALE STEYN','SURESH RAINA'],
    correctAnswer: 1
  },
  
  {
    question: "WHICH OF THESE TEAMS WERE NOT SEMIFINALIST IN 2011 WORLD CUP:",
    choices: ['SRILANKA','INDIA','PAKISTAN','NEW ZEALAND'],
    correctAnswer: 3
  },
  
  {
    question: "WHICH OF THE FOLLOWING CRICKETER-COUNTRY PAIR IS CORRECT?",
    choices: ['TIM SOUTHEE-AUSTRALIA','ALIASTOR COOK-IRELAND','IMRAN TAHIR-SOUTH AFRICA','MAXWELL-NEW ZEALAND'],
    correctAnswer: 2
  },
  
  {
    question: "WHICH OF THESE ARE NOT DONE WICKET KEEPING?",
    choices: ['RAHUL DRAVID','VVS LAXMAN','GILCHRIST','DINESH KARTHIK'],
    correctAnswer: 1
  },
  
  {
    question: "WHICH OF THE FOLLOWING FRANCHISE YUVRAJ SINGH DID NOT PLAY?",
    choices: ['ROYAL CHALLENGERS BANGALORE','PUNE WARRIORS','MUMBAI INDIANS','KINGS XI PUNJAB'],
    correctAnswer: 2
  },
  
  {
    question: "WHICH OF THESE CRICKETERS HAVE CENTURY IN ALL THE INTERNATIONAL FORMATS?",
    choices: ['SURESH RAINA','GLANE MAXWELL','SHEWAG','KUMAR SANGAKKARA'],
    correctAnswer: 0
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
