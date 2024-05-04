var Agent;

function beginSelectedGame(gameType) {
    gameArea.start();
    gameArea.canvas.id = "gameArea";
    $(`#gameArea`).css("width", "100%");
    if(gameType == "test"){
        //backgroundColor("white");
        Agent = new component(30, 30, "red", ((gameArea.canvas.width / 2) - (Agent.width / 2)), (gameArea.canvas.height * 0.75));
        
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
        window.addEventListener('keydown', function (e) {
            gameArea.key = e.keyCode;
            })
        window.addEventListener('keyup', function (e) {
            gameArea.key = false;
            })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
}

function backgroundColor(color) {
    var canvas = document.getElementById("gameArea");
    var ctx = canvas.getContext("2d");

    ctx.globalCompositeOperation = 'destination-over'

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
}


function component(width, height, color, x, y) {
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
    this.speedY = -5;
  }
}


function updateGameArea() {
  gameArea.clear();
  gravity();
  Agent.speedX = 0;
  Agent.speedY = 0;
  if (gameArea.key && gameArea.key == 32) {Agent.jump()};
  Agent.newPos();
  Agent.update();
}


function gravity() {
    
    if(Agent.y  < gameArea.canvas.height * 0.75) {

        Agent.speedY += 0.1;
        
    }
    
}
