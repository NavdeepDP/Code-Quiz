console.log("Checking js script");

/**
 * VARIABLES
 */

var questionIndex = 0;
var score =0;

var questionSet = [

    {
        question: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within _____.",
        options: ["quotes", "curly braces", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in Javascript can be used to store _____.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal/bash", "for loops", "console log"],
        answer: "console log"
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    }


];

/**
 * DOM ELEMENTS
 */

var startQuizButton = document.getElementById("start-quiz-button");
var quizStartDiv = document.getElementById("quiz-start-message");
var quizQuestionsDiv = document.getElementById("quiz-questions");
var quizQuestionRowCol = document.getElementById("question-string");
var quizOptionsRowCol = document.getElementById("question-options");
var questionParagraph = document.createElement("p");// paragraph for question string
var optionList = document.getElementById("option-list");
var resultDiv = document.getElementById("result-div");
var answerCheck = document.getElementById("answer-check-result");
var timeCounter = document.getElementById("time-counter");
var allDoneDiv= document.getElementById("all-done");
var testScoreElement  = document.getElementById("test-score");





/**
 * FUNCTION DEFINITIONS
 */

function startQuiz(event) {
    // clear the start quiz message on  the page
    quizStartDiv.style.display = "none";
    // clear all done display
    allDoneDiv.style.display ="none";
    // start timer
    startTimer();

    displayNextQuestionAndOptions();

    quizQuestionsDiv.style.display = "block";

}

function displayNextQuestionAndOptions() {
    // question
    questionParagraph.textContent = questionSet[questionIndex].question;

    optionList.innerHTML ="";

    quizQuestionRowCol.appendChild(questionParagraph);
    // options
    for (var i = 0; i < questionSet[questionIndex].options.length; i++) {
        var listElement = document.createElement("li");
        listElement.setAttribute("data-index", i);
        listElement.setAttribute("question-index", questionIndex);
        listElement.style.marginBottom = "5px";
        var listButtonElement = document.createElement("button");
        listButtonElement.textContent = questionSet[questionIndex].options[i];
        listElement.appendChild(listButtonElement);
        optionList.appendChild(listElement);
    }


    quizOptionsRowCol.appendChild(optionList);
}

function displayNextQuestion() {

    resultDiv.style.display = "none";
    questionIndex++;
    if(questionIndex >= questionSet.length)
    {
        testDoneDisplay();
    }
    else{
        displayNextQuestionAndOptions();
    }
    
}

function testDoneDisplay()
{
    resultDiv.style.display = "none";
    quizQuestionsDiv.style.display = "none";
    testScoreElement.textContent = score;
    allDoneDiv.style.display="block";
}
/***
 * FUNCTION CALLS
 */



/***
 * ADDING EVENT HANDLERS
 */

startQuizButton.addEventListener("click", startQuiz);

optionList.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button") === true) {
        var optionIndex = element.parentElement.getAttribute("data-index");
        var questionIndex = element.parentElement.getAttribute("question-index");


        if (questionSet[questionIndex].answer === questionSet[questionIndex].options[optionIndex]) {

            answerCheck.textContent = "Correct!";
            score += 5;
            console.log("correct answer");
        }
        else {
            answerCheck.textContent = "Wrong!";
            console.log("Wrong answer");
        }
        answerCheck.style.fontStyle = "italic";
        resultDiv.style.display = "block";

       
        setTimeout(function(){  displayNextQuestion(); }, 1000);

    }

});


/**
 * TIMER VARIABLES
 */
var totalSeconds = 10;

var Interval;
/**
 * 
 * TIMER FUNCTIONS
 * 
 */

function startTimer() {
    renderTime();
    if (totalSeconds > 0) {
        interval = setInterval(function () {

            totalSeconds--;
            renderTime();
            if (totalSeconds === 0)
            {
                clearInterval(interval);
                testDoneDisplay();
            }

        }, 1000);
    }


}

function renderTime() {

    timeCounter.textContent = totalSeconds;
}