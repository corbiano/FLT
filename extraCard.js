
var gameOpen = false;
var inputAdded = false;
var titlePassed = false;

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

  if (!titlePassed){

    casinoTitle();
    
  } else {

    casinoMenu();

  }




  
}
























function casinoTitle(){
	var canvas = document.getElementById("cardArea");
	var ctx = canvas.getContext("2d");
	
	ctx.globalCompositeOperation = 'destination-under'

    const img = new Image;
    img.src = "https://corbiano.github.io/FLT/casinoBG.jpg";
	ctx.drawImage(img, 0, 0);
    //ctx.fillStyle = "black";
	//ctx.fillRect(0, 0, canvas.width, canvas.height);





    if(cardArea.key && cardArea.key == 13){

        titlePassed = true;
        
    }
}


function casinoTitle(){
	var canvas = document.getElementById("cardArea");
	var ctx = canvas.getContext("2d");
	
	ctx.globalCompositeOperation = 'destination-under'

    const img = new Image;
    img.src = "https://corbiano.github.io/FLT/casinoBG.jpg";
	ctx.drawImage(img, 0, 0);
    //ctx.fillStyle = "black";
	//ctx.fillRect(0, 0, canvas.width, canvas.height);





    if(cardArea.key && cardArea.key == 13){

        console.log("eh");
        
    }
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
        titlePassed = false;
		cardArea.start();
		cardArea.canvas.id = "cardArea";
        $(`#cardArea`).css("margin", "auto");
		$(`#cardArea`).css("border-radius", "10px");
		$(`#cardArea`).css("width", "100%");
        addInput();
	}
}

function closeCasino() {
	cardArea.stop();
	BJstart = false;
	PKstart = false;
    titlePassed = false;
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

function keyDown(event){
	cardArea.key = event.keyCode;
}

function keyUp(event){
	cardArea.key = false;
}
