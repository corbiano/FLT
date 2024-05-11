
var gameOpen = false;
var inputAdded = false;

var BJstart = false;
var PKstart = false;

$(`#Frontline_IconsTopDefault`).append(`
<div class="IconDefault headertext">
<i style="float:right; margin-top: 21px; margin-right: 10px;font-size:26px;" class="fa-sharp fa-solid fa-gamepad" id="gameButton" title="Reload" onclick="openCasino()"></i>
</div>
`);


var cardArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 810;
		this.canvas.height = 270;
		this.context = this.canvas.getContext("2d");
		$(`#gameWindow`).append(this.canvas);
		$(`#gameWindow`).css("width", "100%");
		this.interval = setInterval(updateCasino, 25);
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop : function() {
		clearInterval(this.interval);
	}
}






function updateCasino(){

  if (!BJstart && !PKstart){

      CasinoMenu();
    
  }




  
}
























function casinoMenu(){
	var canvas = document.getElementById("gameArea");
	var ctx = canvas.getContext("2d");
	
	ctx.globalCompositeOperation = 'destination-under'

	ctx.drawImage(`url("corbiano.github.io/FLT/casinoBG.jpg")`, 0, 0);
}

function openCasino() {
	if(!gameOpen){
		//add game window
		$(`.container-half`).first().append(`
		<div class="container-left" id="gameWindow" style="background-image: linear-gradient(45deg, black, black);">
		<div class="sectiontitle borderdark" id="gameTitle" style="background-color: rgb(133, 86, 114); border-bottom: none;">Game
		<button type="submit" class="templatebutton" onclick="closeCasino()">Close</button>
		</div>
		</div>
		`);
		
		gameOpen = true;
		cardArea.start();
	}
}

function closeCasino() {
	cardArea.stop();
	BJstart = false;
	PKstart = false;
	removeInput();
	$(`#gameWindow`).remove();
}

function addInput(){

  window.addEventListener('keydown', keyDown, true)
	window.addEventListener('keyup', keyUp, true)
  inputAdded = true;

}

function removeInput(){

  window.removeEventListener('keydown', keyDown, true)
	window.removeEventListener('keyup', keyUp, true)
  inputAdded = false;

}
