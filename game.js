var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPatṭern =[];

var started = false;
var level =0;
$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level" +level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
var userColor = $(this).attr("id");
userClickedPatṭern.push(userColor);

playSound(userColor);
animatePress(userColor);
checkAnswer(userClickedPatṭern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPatṭern[currentLevel]){
      if(userClickedPatṭern.length===gamePattern.length){
        setTimeOut(function(){
          nextSequence();
        },1000);
      }
  }
  else{

    playSound("wrong");
    $("body").addClass("game-over");

     $("#level-title").text("Game Over, Press Any Key to Restart");

     setTimeOut(function(){
       $("body").removeClass("game-over");
     },200);

     startOver();
  }
}

function nextSequence() {
  userClickedPatṭern =[];
  level++;
  $("#level-title").text("Level" +level);

  var randumNum = Math.floor(Math.random()*4);
  var randumColor = buttonColors[randumNum];
  gamePattern.push(randumColor);

  $("#" +randumColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randumColor);
}



function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" +currentColor).removeClass("pressed");
  },100);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function startOver(){
  level =0;
  gamePattern=[];
  started=false;
}
