$(init)

// Score and question number
let questionNum = 0;
let score = 0;

function init(){
    renderAnswerResult();
    startQuiz();
    renderNewQuestion();
    replayQuiz();

}

function startQuiz(){
    $('#start-button').on('click', function(e){
        e.preventDefault();
        renderQuestion();
    })   
}

function replayQuiz(){
    $('body').on('click', '#replay-button', function(e){
        e.preventDefault();
        score = 0;
        questionNum = 0;
        $('#score').html(score)
        $('.question-display').show();
        $('.score-card').hide();
        renderQuestion();
    })
}

// rendering functions for each view
function renderQuestion(){
    $('main').html(generateQuestion)
}

function renderAnswerResult(){
    $('main').on('submit', function(e){
        e.preventDefault();
        $('main').html(validateAnswer);
    })
}

function renderNewQuestion(){
    $('main').on('click', '#next-btn', function(e){
        e.preventDefault();
        renderQuestion();
    })
}

function updateQuestion(){
    questionNum++;
    $('#question-number').html(` ${questionNum}`);
}

// generates the question and answer data 
function generateQuestion(){
    updateQuestion();
    if (questionNum > 10) {
            return gameOver();       
    } else {
        let formTemplate = $(`<form class="question-form">
                                <fieldset class="answer-choice">
                                    <legend id="current-question">${STORE[questionNum-1].question}</legend>
                                    <div class="answer-box"></div>
                                    <div class="answer-btn"> 
                                        <input class="btn" type="submit" value="Submit">
                                    </div>
                                </fieldset>  
                            </form>`);
        let answerBox = $(formTemplate).find('.answer-box')
    
        STORE[questionNum-1].answers.forEach(function (answer, index) {
            $(answerBox).append(`<label for="${index}">
            <input type="radio" id="${index}" class="answer-text" 
            value="${answer}" name="answer" required>${answer}</label><br>`)
            })  

        return formTemplate;
    }
}
// Needs to check if the answer is correct 
function validateAnswer(){
        let answerChoice = $('input[name=answer]:checked').val();
        let correctAnswer = STORE[questionNum-1].correctAns;
        let image = STORE[questionNum-1].image;
        let imageAlt = STORE[questionNum-1].imageAlt;
        if (answerChoice == correctAnswer) {
            score++;
            $('#score').html(score)
            return `<div class="correct-box">
                        <h3 class="correct-text"> That's right! Good Job!</h3>
                        <img class="result-box-img" src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" alt="big brain">
                        <form class="button-form">
                            <input class="btn" id="next-btn" type="submit" value="Next">
                        </form>
                    </div>`
        } else {
            return `<div class="incorrect-box">
                        <h3 class="incorrect-text"> Sorry, that's not quite right!</h3>
                        <p>The answer is actually <br>
                        <span class="wrong-answer">${correctAnswer}</span></p>
                        <img class="result-box-img" src="${image}" alt="${imageAlt}">
                        <form class="button-form">
                            <input class="btn" id="next-btn" type="submit" value="Next">
                        </form>
                    </div>`
        }
}

//Display gameover screen
function gameOver(){
    $('.question-display').hide();
    $('.score-card').hide();
    return `<h3>Wow! You got <span class="score">${score} </span>out of ${STORE.length} right!</h2>
                    <form class="question-form">
                        <div class="finish-box">
                            <h3> Want to give it another try?</h3>
                            <div class="btn-controls">
                                <input class="btn" id="replay-button" type="submit" value="Replay">
                            </div>
                        </div> 
                </form>`
}
