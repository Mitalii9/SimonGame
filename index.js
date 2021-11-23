var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
        $("#"+ currentColor).removeClass("pressed")
    },100)
}

function nextSequence(){
  var randomNumber=Math.floor(Math.random()*4);
  var randomChoosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);

    $("."+randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
  level++;
  $("h1").text("Level "+level);

}

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

var level=0;
var started=false;


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
      if(currentLevel === gamePattern.length-1){
        console.log("success");
        setTimeout(function(){
            userClickedPattern.length=0;
            nextSequence();
          }, 1000);
      }
  }
  else{
    console.log("Wrong");
    playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over");
      $("h2").text("(Press Any Key to Restart)")
      resetGame();
      startOver();
  }
}

function resetGame(){
 gamePattern.length = 0
 userClickedPattern.length = 0
 level = 0;
}

// start the game on first keypress/keydownn only
$(document).on("keydown", function(){
   if(level === 0)
       nextSequence();
});

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

/* IMPORTANT:
$(document).on('click', '# OR .', function(){

});*/
