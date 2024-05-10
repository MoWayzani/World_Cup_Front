
 const darkModeToggle = document.querySelector("#chk");
 const modalOpenBtn = document.getElementById("condition-modal-btn");
 const modalContainer = document.querySelector(".quiz-modal-container");
 const modalConditionBox = modalContainer.querySelector(".quiz-modal-condition");
 const exitModal = modalConditionBox.querySelector(".exit-modal");
 const startQuizBtn = modalConditionBox.querySelector(".start-quiz");
 const questionSection = document.querySelector(".question-section");
 const questionText = questionSection.querySelector(".question-text");
 const questionOptionContainer =
   questionSection.querySelector(".question-options");
 const questionProgressText = questionSection.querySelector(
   ".question-progress-text"
 );
 const timeText = questionSection.querySelector(".time-count");
 const nextQuiz = questionSection.querySelector(".next-question");
 const scoreElement = questionSection.querySelector(".score");
 const timelineElement = questionSection.querySelector(".timeline");
 const questionProgressbar = questionSection.querySelector(".question-progress");
 const resultSection = document.querySelector(".result-section");
 const canvas = document.getElementById("my-canvas");
 const resultExpression = resultSection.querySelector(".result-expression");
 const resultText = resultSection.querySelector(".result-text");
 const resultFeedback = resultSection.querySelector(".feedback");
 const restart = resultSection.querySelector(".restart");
 const backHome = resultSection.querySelector(".back-to-home");
 const loadingContainer = document.querySelector(".loading-container");
 

 let questionIndex = 0;
 let timeCount;
 let userScore = 0;
 let counter; 
 let timelineCounter;

 const tick = document.createElement("div");
 tick.classList.add("tick-icon");
 tick.innerHTML = `<i class="fa-solid fa-check"></i>`;
 

 const cross = document.createElement("div");
 cross.classList.add("cross-icon");
 cross.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
 

 var confettiSettings = {
   target: "my-canvas",
   max: "250",
   size: "1.8",
   rotate: true,
   clock: "29",
   start_from_edge: true,
 };
 var confetti = new ConfettiGenerator(confettiSettings);
 
 
 const modalFunc = (condition) => {
   if (condition === "open") {
     modalConditionBox.classList.add("active");
     document.body.style.overflow = "hidden";
     if (document.body.classList.contains("dark-mode")) {
       modalContainer.classList.add("active-dark");
     } else {
       modalContainer.classList.add("active");
     }
   } else {
     modalConditionBox.classList.remove("active");
     document.body.style.overflow = "auto";
     if (document.body.classList.contains("dark-mode")) {
       modalContainer.classList.remove("active-dark");
     } else {
       modalContainer.classList.remove("active");
     }
   }
 };

 const quizArr = 
 [
     {
       id: 1,
       question: "Which country won the first FIFA World Cup in 1930?",
       options: {
         A: "Brazil",
         B: "Germany",
         C: "Uruguay",
         D: "Italy"
       },
       answer: "C"
     },
     {
       id: 2,
       question: "Which player has scored the most goals in FIFA World Cup history?",
       options: {
         A: "Pelé",
         B: "Miroslav Klose",
         C: "Ronaldo",
         D: "Diego Maradona"
       },
       answer: "B"
     },
     {
       id: 3,
       question: "How many times has Brazil won the FIFA World Cup?",
       options: {
         A: "Five",
         B: "Four",
         C: "Six",
         D: "Three"
       },
       answer: "A"
     },
     {
       id: 4,
       question: "Which country hosted the 2010 FIFA World Cup?",
       options: {
         A: "Germany",
         B: "South Africa",
         C: "Brazil",
         D: "Spain"
       },
       answer: "B"
     },
     {
       id: 5,
       question: "Who won the Golden Boot for scoring the most goals in the 2018 FIFA World Cup?",
       options: {
         A: "Lionel Messi",
         B: "Neymar",
         C: "Harry Kane",
         D: "Cristiano Ronaldo"
       },
       answer: "C"
     },
     {
       id: 6,
       question: "Which national team is known as 'La Furia Roja'?",
       options: {
         A: "Portugal",
         B: "Brazil",
         C: "Spain",
         D: "Mexico"
       },
       answer: "C"
     },
     {
       id: 7,
       question: "Which team did Zinedine Zidane play for in the World Cup?",
       options: {
         A: "Brazil",
         B: "France",
         C: "Italy",
         D: "Spain"
       },
       answer: "B"
     },
     {
       id: 8,
       question: "What is the maximum number of players a football team can have on the field at any time during a World Cup match?",
       options: {
         A: "11",
         B: "10",
         C: "12",
         D: "13"
       },
       answer: "A"
     },
     {
       id: 9,
       question: "In what year was the first World Cup held?",
       options: {
         A: "1922",
         B: "1930",
         C: "1948",
         D: "1950"
       },
       answer: "B"
     },
     {
       id: 10,
       question: "Which country has appeared in three World Cup finals but has never won the competition?",
       options: {
         A: "Netherlands",
         B: "Czech Republic",
         C: "Hungary",
         D: "Sweden"
       },
       answer: "A"
     },
   ];
   
   const quizArra = getRandomQuestions();


function getRandomQuestions() {
  const shuffled = quizArr.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
}




 const initialShowQuestion = () => {
 
   resultSection.classList.remove("active");
   canvas.style.display = "none";
 
  
   questionIndex = 0;
   userScore = 0;
   scoreElement.textContent = userScore;
 };
 

 const showQuestion = () => {
 
   questionSection.classList.add("active");
 
  
   timer();
 
   
   timelineFunc();
 
  
   if (document.querySelectorAll(".single-option")) {
     document
       .querySelectorAll(".single-option")
       .forEach((element) => element.remove());
   }
 
 
   questionText.textContent = `${questionIndex + 1}. ${
     quizArr[questionIndex].question
   }`;
 
  
   const options = quizArr[questionIndex].options;
 
   for (let option in options) {
     let singleQuestionElement = document.createElement("div");
     singleQuestionElement.classList.add("single-option");
     singleQuestionElement.innerHTML = `
     <span class="single-option-text"> ${option}.  ${options[option]}</span>`;
     singleQuestionElement.addEventListener("click", (e) =>
       selectedAnswer(option, e)
     );
     questionOptionContainer.append(singleQuestionElement);
   }
 
  
   questionProgress();
 

   nextQuiz.style.display = "none";
 };
 
 
 const timelineFunc = () => {
  
   timelineElement.style.width = `100%`;
   timeText.textContent = 10;
 
   timelineCounter = setInterval(() => {
     
     const getTime = Number(timeText.textContent);
 
   
     timelineElement.style.width = `${getTime * 10}%`;
   }, 1000);
 };
 

 const selectedAnswer = (option, e) => {
   
   clearInterval(counter);
 
  
   clearInterval(timelineCounter);
 
   
   const selectedOption = option;
   const correctOption = quizArr[questionIndex].answer;
  
   if (selectedOption === correctOption) {
     userScore += 5;
     scoreElement.textContent = userScore;
     showIconTick(e, true);
   } else {
     showIconTick(e, false);
     showCorrectAnswer();
   }
 
  
   const singleOption = document.querySelectorAll(".single-option");
   singleOption.forEach((element) => element.classList.add("disabled"));
 
  
   nextQuizBtnChange();
 };
 

 const showIconTick = (e, isTick) => {
   if (e.target.classList.contains("single-option")) {
     e.target.children[0].insertAdjacentElement(
       "afterend",
       isTick === true ? tick : cross
     );
     e.target.classList.add(isTick === true ? "correct" : "incorrect");
   } else {
     e.target.insertAdjacentElement("afterend", isTick === true ? tick : cross);
     e.target.parentNode.classList.add(
       isTick === true ? "correct" : "incorrect"
     );
   }
 };
 

 const showCorrectAnswer = () => {
   
   const singleOption = document.getElementsByClassName("single-option");
 
  
   const correctOption = quizArr[questionIndex].answer;
 
   
   for (let option of singleOption) {
     if (option.textContent.trim().slice(0, 1) == correctOption) {
       option.children[0].insertAdjacentElement("afterend", tick);
       option.classList.add("correct");
     }
 
    
     option.classList.add("disabled");
   }
 };
 
 
 const questionProgress = () => {
  
   questionProgressbar.style.width = `${
     ((questionIndex + 1) / quizArr.length) * 100
   }%`;
 
  
   questionProgressText.innerHTML = `<span class="bold">${
     questionIndex + 1
   } </span> of  <span class="bold">${quizArr.length}</span> Questions`;
 };
 

 const timer = () => {
  
   timeCount = 10;
   timeText.textContent = timeCount;
   counter = setInterval(() => {
     timeCount--;
     timeText.textContent = timeCount;
     if (timeCount == 0) {
      
       timeText.textContent = "0" + timeCount;
       timelineElement.style.width = `0%`;
 
      
       clearInterval(counter);
       clearInterval(timelineCounter);
 
    
       showCorrectAnswer();
 
       
       nextQuizBtnChange();
     } else {
      
       timeText.textContent = "0" + timeCount;
     }
   }, 1000);
 };
 
 
 const nextQuizBtnChange = () => {
   nextQuiz.style.display = "block";
   if (questionIndex === quizArr.length - 1) {
     nextQuiz.textContent = "Show Result";
   } else {
     nextQuiz.textContent = "Next Question";
   }
 };
 

 const showResult = () => {
   questionSection.classList.remove("active");
   resultSection.classList.add("active");
   canvas.style.display = "block";
 
 
   resultText.textContent = `You scored ${userScore} points`;
 
 
   scoreFeedback(userScore);
 };
 

 const scoreFeedback = (userScore) => {
  
   if (userScore >= 80 && userScore <= 100) {
     confettiStart();
     resultFeedback.textContent = `You are an expert in WorldCup, well done on your outstanding performance. Keep up the good work and continue to showcase your skills.`;
   } else if (userScore >= 60 && userScore < 80) {
     confettiStart();
     resultFeedback.textContent = `You have a solid understanding of WorldCup, keep working to improve your skills and understanding. Your performance is good. `;
   } else if (userScore >= 40 && userScore < 60) {
     confettiStart();
     resultFeedback.textContent = `You have a fair understanding of WorldCup, but there is room for improvement.`;
   } else {
     confetti.clear();
     resultExpression.textContent = `Needs Improvement!!!`;
     resultFeedback.textContent = `The result of this quiz is not satisfactory, it's clear that you have a limited understanding of WorldCup.`;
   }
 };
 

 const confettiStart = () => {
   setTimeout(() => confetti.render(), 500);
 };
 

 darkModeToggle.addEventListener("click", () => {
   document.body.classList.toggle("dark-mode");
 });
 

 modalOpenBtn.addEventListener("click", () => {
   modalFunc("open");
 });
 

 exitModal.addEventListener("click", () => {
   modalFunc("close");
 });
 

 modalContainer.addEventListener("click", (e) => {
   if (e.target == modalContainer) {
     modalFunc("close");
   }
 });
 

 startQuizBtn.addEventListener("click", () => {

   modalFunc("close");
 

   if (questionIndex === 0) {
     loadingContainer.style.display = "flex";
     document.body.style.overflow = "hidden";
     setTimeout(() => {
       loadingContainer.style.display = "none";
       showQuestion();
     }, 2500);
   } else {
    
     showQuestion();
   }
 
   
   scoreElement.textContent = 0;
 });
 

 nextQuiz.addEventListener("click", () => {

   questionIndex++;
 
 
   if (questionIndex > quizArr.length - 1) {
     showResult();
   } else {
    
     showQuestion();
   }
 });
 

 restart.addEventListener("click", () => {
  
   initialShowQuestion();
 

   if (questionIndex === 0) {
     loadingContainer.style.display = "flex";
     document.body.style.overflow = "hidden";
     setTimeout(() => {
       loadingContainer.style.display = "none";
       showQuestion();
     }, 2500);
   } else {
     
     showQuestion();
   }
 });
 
 backHome.addEventListener("click", () => {

   initialShowQuestion();
 });