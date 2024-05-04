var Agent;
var Sup;
var isOnFloor;
var gameSpeed;
var Score;
var frame;

function beginSelectedGame(gameType) {
    gameArea.start();
    gameArea.canvas.id = "gameArea";
    $(`#gameArea`).css("width", "100%");
    if(gameType == "test"){
        //backgroundColor("white");
        score = 0;
        frame = 0;
        gameSpeed = 5;
        Agent = new component(30, 30, "green", ((gameArea.canvas.width / 2) - 15), (gameArea.canvas.height * 0.75), "player");
        

        
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
      },
    stop : function() {
    clearInterval(this.interval);
  }
}

function backgroundColor(color) {
    var canvas = document.getElementById("gameArea");
    var ctx = canvas.getContext("2d");

    ctx.globalCompositeOperation = 'destination-over'

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
}


function component(width, height, color, x, y, type) {
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


function updateGameArea() {
  if (Agent.crashWith(Sup)) {
      gameArea.stop();
  } else {
      gameArea.clear();
      Agent.floorCheck();
      gravity();
      if (gameArea.key && gameArea.key == 87) {Agent.jump()};
      Sup.x -= gameSpeed;
      Sup.speedY = 0;
      Sup.update();
      Agent.newPos();
      Agent.update();
      if (frame >= 150){
          supHeight = (Math.floor(Math.random() * 20));
          Sup = new component(30, 30 + supHeight, "red", gameArea.canvas.width, ((gameArea.canvas.height * 0.75) - supHeight), "wall");
          frame = 0;
      } else {
          frame += 1;
      }
  }
}


function gravity() {
    if(!isOnFloor) {
        Agent.speedY += 1;
    }
}
