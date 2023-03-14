// Global variables all defined here
const quizSection = document.querySelector("#quiz-section");
const questionNumberEl = document.querySelector("#question-number");
const currentQuestionEl = document.querySelector("#current-question");
const totalQuestionsEl = document.querySelector("#total-questions");
const questionEl = document.querySelector("#question-title");
const choicesEl = document.querySelector("#choices");
const startBtn = document.querySelector("#start-btn");
const introSection = document.querySelector("#start-screen");
const scoreEl = document.querySelector("#score");
const outroSection = document.querySelector("#outro-section");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const initialsEl = document.querySelector("#initials");
const submitBtn = document.querySelector("#submit-btn");
const feedbackEl = document.querySelector("#feedback");

// only store up to 5 highs scores
const MAX_HIGH_SCORES = 5;

// sets the inital values for variables that will change as the quiz progresses
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerId;

// Event listeners for start, check answer and save high score
startBtn.addEventListener("click", startQuiz);
choicesEl.addEventListener("click", checkAnswer);
submitBtn.addEventListener("click", saveHighScore);

// This function is called when the start button is clicked. It hides the intro section, displays the quiz section, 

function startQuiz() {
  introSection.style.display = "none";
  quizSection.style.display = "block";
  // sets the first question
  setQuestion();
  // stars the timer
  startTimer();
}

// setQuestion function sets the current question by updating the text
function setQuestion() {
  // starting at the first question in the array which was set to zero at the start of the quiz
  const currentQuestion = quizData[currentQuestionIndex];
  questionNumberEl.style.display = "block";
  // display the current question number and total number of questions
  currentQuestionEl.textContent = currentQuestionIndex + 1;
  totalQuestionsEl.textContent = quizData.length;
  questionEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach((choice, index) => {
  const choiceEl = document.createElement("div");
  choiceEl.classList.add("choice");
  choiceEl.textContent = index + 1 + ". " + choice;
  choicesEl.appendChild(choiceEl);
});
}

function checkAnswer(event) {
  if (!event.target.matches(".choice")) return;
  const selectedChoice = event.target;
  const selectedAnswer = parseInt(selectedChoice.textContent.charAt(0)) - 1;
  const currentQuestion = quizData[currentQuestionIndex];

  // checks whether the clicked choice matches the correct answer or not
  if (selectedAnswer === currentQuestion.answer) {
    selectedChoice.classList.add("correct");
    score++;
    feedbackEl.textContent = "Correct!";
  }
  // if answer is wrong, deduct 10 seconds from the timer
  else {
    selectedChoice.classList.add("incorrect");
    timeLeft -= 10;
    feedbackEl.textContent = "Wrong!";
  }
  // increment the current question index to next one
  currentQuestionIndex++;

  if (currentQuestionIndex === quizData.length) {
    // once at the end of the quiz, call the endQuiz function
    endQuiz();
  }
  else {
    setTimeout(() => {
      feedbackEl.textContent = "";
      setQuestion();
    }, 1000);
  }
}

// this function starts the timer and counts down from 60 seconds for each question
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    document.querySelector("#time").textContent = timeLeft;
    if (timeLeft === 0) {
      endQuiz();
    }
  }, 1000);
}

// called when there are no more questions or the timer reaches 0
function endQuiz() {
  clearInterval(timerId);
  quizSection.style.display = "none";
  outroSection.style.display = "block";
  scoreEl.textContent = score;
}

// saves the high score to local storage
function saveHighScore() {
  const initials = initialsEl.value.toUpperCase().trim();
  //  checking if the input is valid
  if (initials === "") return;
  const highScore = { initials: initials, score: score };
  // save to local storage
  highScores.push(highScore);
  // sorts the scores from highest to lowest
  highScores.sort((a, b) => b.score - a.score);
  // only keeps the top 5 scores
  highScores.splice(MAX_HIGH_SCORES);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  // redirects the user to the highscores.html page
  window.location.href = "highscores.html";
}