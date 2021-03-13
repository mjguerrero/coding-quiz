(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'green';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Where is Venezuela locaded?",
      answers: {
        a: "Europe",
        b: "Center America",
        c: "South America",
        d: "Autralia"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the capital of USA?",
      answers: {
        a: "Washington, DC",
        b: "Miami",
        c: "LA",
        d: "Chicago"
      },
      correctAnswer: "a"
    },
    {
      question: "What does Kohler Sales?",
      answers: {
        a: "Cloth",
        b: "Pens",
        c: "Computers",
        d: "Pluming"
      },
      correctAnswer: "d"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  // const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  // const days = Math.floor(total / (1000 * 60 * 60 * 24));
  
  return {
  //   total,
  //   days,
  //   hours,
    minutes,
    seconds
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  // const daysSpan = clock.querySelector('.days');
  // const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

  //   daysSpan.innerHTML = t.days;
  //   hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

//   const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
//   initializeClock('clockdiv', deadline);

// const timeInMinutes = 10;
// const currentTime = Date.parse(new Date());
// const deadline = new Date(currentTime + timeInMinutes*60*1000);

// clock.style.display = 'block';
const schedule = [
  ['Mar 12 2021', 'Mar 30 2021']

];
// iterate over each element in the schedule
for (var i=0; i<schedule.length; i++) {
  var startDate = schedule[i][0];
  var endDate = schedule[i][1];

  // put dates in milliseconds for easy comparisons
  var startMs = Date.parse(startDate);
  var endMs = Date.parse(endDate);
  var currentMs = Date.parse(new Date());

  // if current date is between start and end dates, display clock
  if (endMs > currentMs && currentMs >= startMs ) {
    initializeClock('clockdiv', endDate);
  }
}

schedule.forEach(([startDate, endDate]) => {
// put dates in milliseconds for easy comparisons
const startMs = Date.parse(startDate);
const endMs = Date.parse(endDate);
const currentMs = Date.parse(new Date());

  // if current date is between start and end dates, display clock
  if (endMs > currentMs && currentMs >= startMs ) {
    initializeClock('clockdiv', endDate);
  }
});
const timeInMinutes = 10;
const currentTime = Date.parse(new Date());
const deadline = new Date(currentTime + timeInMinutes*60*1000);
