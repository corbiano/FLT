var Agent;

function beginSelectedGame(gameType) {
    gameArea.start();
    gameArea.canvas.id = "gameArea";
    $(`#gameArea`).css("width", "100%");
    if(gameType == "test"){
        //backgroundColor("white");
        Agent = new component(30, 30, "red", 10, 120);
        
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
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}


function updateGameArea() {
  gameArea.clear();
  Agent.x += 1;
  Agent.update();
}
