var Agent;

function beginSelectedGame(gameType) {
    gameArea.start();
    if(gameType == "test"){
        //Agent = new component(30, 30, "red", 10, 120);
        console.log("still working");
    }
}

var gameArea = {
  	canvas : document.createElement("canvas"),
  	start : function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
   	this.context = this.canvas.getContext("2d");
   	$(`#gameWindow`).append(this.canvas);
  	}
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
