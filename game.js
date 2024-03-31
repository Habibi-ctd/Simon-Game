var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];


var started = false;
var level = 0;

$("body").keypress(function (event) {
  if (!started){
    $("#level-title").text('level ' + level);
    nextSequence();
    started = true;
  }
});

$("h1").click(function () {
  if (!started){
    $("#level-title").text('level ' + level);
    nextSequence();
    started = true;
  }
});



$(".btn").click(function () {
  $(this).fadeIn(100).fadeOut(100).fadeIn(100);
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

// Create a new function called checkAnswer(), it should take one input with the
// name currentLevel
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      },525);
    }
  }
  else {
    playSound("wrong");

    // 2. In the styles.css file, there is a class called "game-over", apply this class to the body of the
    // website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $('body').removeClass("game-over");
    },200);

    $("h1").text("Wrong, click Here or Press any key to restart the game!!");
    startOver();
  };
}

// 1. Create a new function called startOver().
function startOver() {
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  started = false;
};

// 2. Call startOver() if the user gets the sequence wrong.
//
// 3. Inside this function, you'll need to reset the values of level, gamePattern
// and started variables.

function nextSequence(){
userClickedPattern = [];
level++;
console.log(level);
$("#level-title").text('level ' + level);
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];

gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
animatePress(randomChosenColour);
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
