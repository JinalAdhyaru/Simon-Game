var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

var buttonColours = ["red","green","yellow","blue"];

//for starting the game on keypress
$(document).keypress(function() {
    if(!started) {
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    } 
});

//for checkig the order of sequence
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {     
        if(started == true) {  
            playSound("wrong");
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            startOver();
        }
    }
}

//for adding the pressed button to array
$(".btn").click(function() {
    var userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

//for generating the next random sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//for sound
function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

//for animation
function animatePress(currentColour) {
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
} 

//for reseting it when game is over
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


