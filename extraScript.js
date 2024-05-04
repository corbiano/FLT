var Agent;

function beginSelectedGame(gameType) {
    gameArea.start();
    if(gameType == "test"){
        //backgroundColor("white");
        //Agent = new component(30, 30, "red", 10, 120);
        if(document.getElementByID("gameCanvas") != null)
            console.log("set id!");
    }
}


var gameArea = {
  	canvas : document.createElement("canvas"),
  	start : function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.id = "gameCanvas";
   	this.context = this.canvas.getContext("2d");
   	$(`#gameWindow`).append(this.canvas);
  	}
}

function backgroundColor(color) {
    var canvas = document.getElementById("gameCanvas");
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
  ctx = myGameArea.context;
  ctx.fillStyle = color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
}
