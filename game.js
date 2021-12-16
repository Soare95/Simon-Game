var buttonColors = ["red", "blue", "green", "yellow"];..
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).on("keypress", function() {
  if (!started) {
    $("h1").text("Level: " + level);
    nextSequence();
    started = true;
  }
})

$(".btn").click(function() {
  var userChosenColor = this.id;

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success")
    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    playSound("wrong");

    $("h1").text("Game Over! Press any key to restart.")

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)

    startOver();
  }
}


function nextSequence() {
  userClickedPattern = [];

  level ++;
  $("h1").text("Level: " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  // console.log("PC: " + gamePattern)

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor)
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
