const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let gameOver = false;
let level = 0;
let score = 0;
let date = new Date();
let currentYear = date.getFullYear();


$(".footer").append(` ${currentYear} Jason Kidd`);


// Start the game when the user presses a key
$(document).on("keydown", function (event) {
  if (gameOver) {
    startOver();
  } else if (!started) {
    $("#level-title").text("Level " + level);
    $("#game-score").text("Score: " + score);
    nextSequence();
    started = true;
  }
});


// Detect when the user clicks a button
$(".btn").on("click", function () {
  if (!gameOver && started) {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});


// Choose a square to be randomly selected for the next level
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  level++;

  $("#level-title").text("Level " + level);

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


// Check if the button the user clicked is equal to the randomly chosen button
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      score += 50;
      $("#game-score").text("Score: " + score);

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver = true;

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("#game-score").text("Your score: " + score);

    $(".btn").prop("disabled", true);
  }
}


// Reset all the game values
function startOver() {
  level = 0;
  score = 0;
  gameOver = false;
  started = false;
  userClickedPattern = [];
  gamePattern = [];
}


