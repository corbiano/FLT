var Agent;
var Sup;
var Duck;
var isOnFloor;
var gameSpeed;
var Score;
var frame;
var mouseX;
var mouseY;
var mousePressed = false;
var highScore = 0;
var lastScore = 0;
var killedBy = "";


var gameOpen = false;
var gameStart = false;

$(`#Frontline_IconsTopDefault`).append(`

<div class="IconDefault headertext"><i style="float:right; margin-top: 21px; margin-right: 10px;font-size:26px;" class="fa-sharp fa-solid fa-gamepad" id="gameButton" title="Reload" onclick="openGame()"></i></div>

`);


function openGame() {
	if(!gameOpen){
		gameOpen = true;
		  $(`.container-half`).first().append(`
		  <div class="container-left" id="gameWindow" style="background-image: linear-gradient(45deg, black, black);">
		  <div class="sectiontitle borderdark" id="gameTitle" style="background-color: rgb(133, 86, 114); border-bottom: none;">Game
 
   		<button type="submit" class="templatebutton" onclick="closeGame()">Close</button>
 
 		  </div>
   		</div>
		  `);
		
		  beginSelectedGame('test');
    }
  }
    
    
function closeGame() {
	  gameArea.stop();
	  gameStart = false;
	  gameOpen = false;
	  clearInterval(updateGameArea);
	  window.removeEventListener('mousemove', mouseMove, true)
      	  window.removeEventListener('keydown', keyDown, true)
          window.removeEventListener('keyup', keyUp, true)
	  $(`#gameWindow`).remove();
}

function beginSelectedGame(gameType) {
	if(gameOpen){
	    highScore = localStorage.getItem("highScore");
	    gameArea.start();
	    gameArea.canvas.id = "gameArea";
	    $(`#gameArea`).css("margin", "auto");
	    //$(`#gameArea`).css("width", "100%");
	    if(gameStart){
	            backgroundColor("black");
	            Score = 0;
	            frame = 0;
	            gameSpeed = 4;
	            Agent = new component(30, 30, "green", ((gameArea.canvas.width / 2) - 15), ((gameArea.canvas.height * 0.75) - 110), "player");
	            Sup = new component(30, 40, "red", gameArea.canvas.width, ((gameArea.canvas.height * 0.75) + 5), "wall");
	            Duck = new component(10, 10, "yellow", gameArea.canvas.width + 300, (gameArea.canvas.height - 50), "collectable");
	        
	      }
	}
}

function titleScreen() {
	if(gameOpen){
	  var canvas = document.getElementById("gameArea");
	  var ctx = canvas.getContext("2d");
	
	  ctx.globalCompositeOperation = 'destination-under'
	
	  ctx.fillStyle = "black";
	  ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	  ctx.fillStyle = "white";
	  ctx.fillRect((canvas.width - 195), 150, 176, 100);
	  ctx.fillStyle = "#2b2b2b";
	  ctx.fillRect((canvas.width - 192), 153, 170, 94);
	
	  ctx.fillStyle = "white";
	  ctx.font = "60px Arial";
	  ctx.fillText("Play", 313, 217);
	
	  ctx.fillStyle = "red";
	  ctx.font = "70px Arial";
	  ctx.fillText("Agent Jump", 60, 90);
	 
	  ctx.fillStyle = "white";
	  ctx.font = "15px Arial";
	  ctx.fillText("High score: " + String(localStorage.getItem("highScore")), 10, 170);
	  ctx.fillText("Last run: " + String(localStorage.getItem("lastScore")), 10, 200);
	  ctx.fillText("Killed by: " + String(localStorage.getItem("killedBy")), 10, 230);
	}
}

function hoverButtonStart() {
	if(gameOpen){ 
	  var canvas = document.getElementById("gameArea");
	  var ctx = canvas.getContext("2d");
	
	  ctx.globalCompositeOperation = 'destination-under'
	
	  ctx.fillStyle = "#525252";
	  ctx.fillRect((canvas.width - 192), 153, 170, 94);
	
	  ctx.fillStyle = "white";
	  ctx.font = "60px Arial";
	  ctx.fillText("Play", 313, 217);
	}

}

function hoverButtonMM() {
	if(gameOpen){ 
	  var canvas = document.getElementById("gameArea");
	  var ctx = canvas.getContext("2d");
	
	  ctx.globalCompositeOperation = 'destination-under'
	
	  ctx.fillStyle = "#525252";
	  ctx.fillRect((canvas.width - 192), 153, 170, 94);
	
	  ctx.fillStyle = "white";
	  ctx.font = "60px Arial";
	  ctx.fillText("Play", 313, 217);
	}

}
function hoverButtonRetry() {
	if(gameOpen){   
	  var canvas = document.getElementById("gameArea");
	  var ctx = canvas.getContext("2d");
	
	  ctx.globalCompositeOperation = 'destination-under'
	
	  ctx.fillStyle = "#525252";
	  ctx.fillRect((canvas.width - 192), 153, 170, 94);
	
	  ctx.fillStyle = "white";
	  ctx.font = "60px Arial";
	  ctx.fillText("Play", 313, 217);
	}
}


function getRelativeCoordinates(event, element) {
	if(gameOpen){   
	  const rect = element.getBoundingClientRect();
	  const x = event.clientX - rect.left;
	  const y = event.clientY - rect.top;
	  return { x, y };
	}
}


var gameArea = {
  	canvas : document.createElement("canvas"),
  	start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
   	    this.context = this.canvas.getContext("2d");
   	    $(`#gameWindow`).append(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('mousemove', mouseMove, true)
      	window.addEventListener('keydown', keyDown, true)
        window.addEventListener('keyup', keyUp, true)
        
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
    stop : function() {
    clearInterval(this.interval);
  }
}

function backgroundColor(color) {
	if(gameOpen){     
	    var canvas = document.getElementById("gameArea");
	    var ctx = canvas.getContext("2d");
	
	    ctx.globalCompositeOperation = 'destination-under'
	
	    ctx.fillStyle = color;
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
    
}

function updateScore() {
	if(gameOpen){ 
	  var canvas = document.getElementById("gameArea");
	  var ctx = canvas.getContext("2d");
	
	  ctx.fillStyle = "white";
	  ctx.font = "20px Arial";
	  ctx.fillText("Ducks: " + String(Score), 10, 30);
	}
}

function failScreen() {
	if(gameOpen){ 
	  backgroundColor("black");
	  var canvas = document.getElementById("gameArea");
	  var ctx = canvas.getContext("2d");
	
	  if(Score < 10){
	    ctx.fillStyle = "red";
	    ctx.font = "70px Arial";
	    ctx.fillText("AUTOFAIL", 80, 100);
	  } else if(Score >= 10 && Score < 50) {
	    ctx.fillStyle = "orange";
	    ctx.font = "70px Arial";
	    ctx.fillText("KEEP TRYING", 60, 100);
	  } else if(Score >= 50 && Score < 100) {
	    ctx.fillStyle = "green";
	    ctx.font = "70px Arial";
	    ctx.fillText("GOOD JOB", 80, 100);
	  } else if(Score >= 100) {
	    ctx.fillStyle = "white";
	    ctx.font = "70px Arial";
	    ctx.fillText("YOU WIN", 90, 100);
	  }
	  
	  ctx.fillStyle = "white";
	  ctx.font = "20px Arial";
	  if(Score == 1)
	    ctx.fillText("You collected " + String(Score) + " duck.", 145, 155);
	  else
	    ctx.fillText("You collected " + String(Score) + " ducks.", 145, 150);
	
	  ctx.fillStyle = "white";
	  ctx.fillRect((canvas.width - 100), 170, 70, 70);
	  ctx.fillStyle = "#2b2b2b";
	  ctx.fillRect((canvas.width - 97), 173, 64, 64);
	
	  
	  ctx.fillStyle = "white";
	  ctx.font = "50px Arial";
	  ctx.fillText("M", canvas.width - 86, 222, 146, 70);
	  ctx.fillStyle = "white";
	  ctx.font = "20px Arial";
	  ctx.fillText("MENU", canvas.width - 95, 160, 146, 70);
	  
	  ctx.strokeStyle = "red";
	  ctx.lineWidth = 10;
	
	  ctx.beginPath();
	  ctx.moveTo((canvas.width - 100), 170);
	  ctx.lineTo((canvas.width - 30), 250);
	
	  ctx.stroke();
	
	  ctx.beginPath();
	  ctx.moveTo((canvas.width - 100), 250);
	  ctx.lineTo((canvas.width - 30), 170);
	
	  ctx.stroke();
	
	  ctx.fillStyle = "red";
	  ctx.font = "10px Arial";
	  ctx.fillText("Work in Progress", canvas.width - 105, 260);
	
	  ctx.fillStyle = "white";
	  ctx.fillRect(30, 170, 70, 70);
	  ctx.fillStyle = "#2b2b2b";
	  ctx.fillRect(33, 173, 64, 64);
	
	  ctx.fillStyle = "white";
	  ctx.font = "50px Arial";
	  ctx.fillText("R", 45, 222, 146, 70);
	  ctx.fillStyle = "white";
	  ctx.font = "20px Arial";
	  ctx.fillText("RETRY", 33, 160, 146, 70);
	}
}



function component(width, height, color, x, y, type) {
	if(gameOpen){   
	  this.width = width;
	  this.height = height;
	  this.speedX = 0;
	  this.speedY = 0;
	  this.x = x;
	  this.y = y;
	  this.update = function(){
	    ctx = gameArea.context;
	    ctx.fillStyle = color;
	    ctx.fillRect(this.x, this.y, this.width, this.height);
	  }
	  this.newPos = function() {
	    this.x += this.speedX;
	    this.y += this.speedY;
	  }
	
	  this.jump = function(){
	    if(isOnFloor && type == "player")
	      this.speedY = -15;
	  }
	  this.floorCheck = function(){
	    if(this.y >= (gameArea.canvas.height * 0.75)){
	        this.y = (gameArea.canvas.height * 0.75);
	        isOnFloor = true;
	    } else {
	        isOnFloor = false;
	    }
	    
	  }
	
	  this.crashWith = function(otherobj) {
	    var myleft = this.x;
	    var myright = this.x + (this.width);
	    var mytop = this.y;
	    var mybottom = this.y + (this.height);
	    var otherleft = otherobj.x;
	    var otherright = otherobj.x + (otherobj.width);
	    var othertop = otherobj.y;
	    var otherbottom = otherobj.y + (otherobj.height);
	    var crash = true;
	    if ((mybottom < othertop) ||
	        (mytop > otherbottom) ||
	        (myright < otherleft) ||
	        (myleft > otherright)) {
	              crash = false;
	    }
	    return crash;
	  }
	}
}


function updateGameArea() {
	if(gameOpen){   
	    if (!gameStart){
	    gameArea.clear();
	    titleScreen();
	    document.onmousedown = function(e) {
	      mousePressed = true;
	    };
	    document.onmouseup = function(e) {
	      mousePressed = false;
	    };
	
	    if(mouseX > 310 && mouseX < 480){
	      if(mouseY > 203 && mouseY < 297){
	        hoverButtonStart();
	          if(mousePressed){
	            gameStart = true;
	            gameArea.clear();
	            beginSelectedGame();
	          }
	        }
	      
	    }
	
	  } else if (Agent.crashWith(Sup)) {  
	    gameArea.clear();
	    localStorage.setItem("lastScore", Score);
	    localStorage.setItem("killedBy", "Sup");
	    if(Score > localStorage.getItem("highScore"))
	      localStorage.setItem("highScore", Score);
	    failScreen();
	    if(gameArea.key && gameArea.key == 82){
	      resetGame();
	    } else if (gameArea.key && gameArea.key == 77){
	      gameStart = false;
	      resetGame();
	    }
	
	  } else if(gameStart){
	      gameArea.clear();
	      backgroundColor("black");
	
	
	      if (Agent.crashWith(Duck)) {
	        var randX = (Math.floor(Math.random() * 500) + 300);
	        Duck.x = (gameArea.canvas.width + randX);
	        var randY = (-(Math.floor(Math.random() * 50)) - 50);
	        Duck.y = ((gameArea.canvas.height * 0.75) + randY);
	        Score += 1;
	      }
	      if(Duck.x < -30){
	        var randX = (Math.floor(Math.random() * 500) + 300);
	        Duck.x = (gameArea.canvas.width + randX);
	        var randY = (-(Math.floor(Math.random() * 50)) - 50);
	        Duck.y = ((gameArea.canvas.height * 0.75) + randY);
	      }
	
	      Agent.floorCheck();
	      gravity();
	
	      if (gameArea.key && gameArea.key == 87) {Agent.jump()};
	
	      Sup.x -= gameSpeed;
	      Sup.speedY = 0;
	      if (Sup.x < -30){
	        var rand = (Math.floor(Math.random() * 200) + 100);
	        Sup.x = (gameArea.canvas.width + rand);
	        gameSpeed += 0.1
	      }
	      Sup.update();
	
	      Duck.x -= gameSpeed;
	      Duck.speedY = 0;
	      Duck.update();
	
	      Agent.newPos();
	      Agent.update();
	
	      updateScore();
	
	  }
	}
}

function resetGame(){
	if(gameOpen){   
	  gameArea.stop();
	  gameArea.clear();
	  clearInterval(updateGameArea);
	  Score = 0;
	  gameSpeed = 0;
	  window.removeEventListener('mousemove', mouseMove, true)
      	  window.removeEventListener('keydown', keyDown, true)
          window.removeEventListener('keyup', keyUp, true)
	  beginSelectedGame();
	}
}

function resetGameMenu(){
	if(gameOpen){   
	  gameArea.stop();
	  gameArea.clear();
	  clearInterval(updateGameArea);
	  Score = 0;
	  gameSpeed = 0;
	  gameStart = false;
	  window.removeEventListener('mousemove', mouseMove, true)
      	  window.removeEventListener('keydown', keyDown, true)
          window.removeEventListener('keyup', keyUp, true)
	  var oldCanv = document.getElementById('gameArea');
	  document.getElementById('gameWindow').removeChild(oldCanv);
	  beginSelectedGame();
	}
}


function gravity() {
    if(!isOnFloor && gameOpen) {
        Agent.speedY += 1;
    }
}


function mouseMove(event){
	const gameWindow = document.getElementById("gameWindow");
        const coords = getRelativeCoordinates(event, gameWindow);
        mouseX = coords.x;
        mouseY = coords.y;
}
function keyDown(event){
	gameArea.key = event.keyCode;
}
function keyUp(event){
	gameArea.key = false;
}
