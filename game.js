let buttonColours= Array("red", "blue", "green", "yellow");
let gamePattern= new Array();
let randomChosenColour;
let userClickedPattern= new Array();
let level = 0
let started = false

$(document).keypress(function(event){
    if (!started) {
        $("h2").text("Level " + level);
        nextSequence();
        started = true;
      }
})

$('.grid-item').click(function(event) {
    let classNames = event.target.className;
    const myArray = classNames.split(" ");
    let classNameColour = myArray[0];
    var userChosenColour = classNameColour

    userClickedPattern.push(userChosenColour);
    $('.' +randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    checkAnswer(userClickedPattern[userClickedPattern.length-1]);
    animatePress(userChosenColour, event)
})

function checkAnswer(userLastClicked) {
    if(gamePattern[gamePattern.length-1] === userLastClicked){
        if (gamePattern.toString() === userClickedPattern.toString()) {

          nextSequence();
        } 
    }
    else {
        $('h2').text('Game Over, Press Any Key to Restart');
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence(){
    $("h2").text("Level " + level);
    userClickedPattern = [];
    level ++
    let randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('.' +randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour, event){
    if($(event.target).hasClass(currentColour)){
        $('.' + currentColour).addClass('pressed');
        setTimeout(function(){
            $('.' + currentColour).removeClass('pressed')
        }, 100)
    }
}

function startOver(){
    gamePattern = new Array();
    level = 0;
    started =false
}