var cardsDealt = 0;
var playerCards = 0;
var dealerCards = 0;

var betAmount = 0;
var betPlaced = false;


var titleBG = "https://corbiano.github.io/FLT/casinoTitle.jpg";
var menuBG = "https://corbiano.github.io/FLT/casinoMenu.jpg";
var gameBG = "https://corbiano.github.io/FLT/casinoBJ.jpg";

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
		this.interval = setInterval(updateCasino, 25);
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop : function() {
		clearInterval(this.interval);
	}
}

var deck = {
    cards: new Array(52),

    shuffle: function() {
	console.log("shuffled");
	    
    },

    dealPlayer: function() {
	
	playerCards += 1;
	    
    },
    dealDealer: function() {
	
	dealerCards += 1;
	    
    }
}


function updateCasino(){

  if (!titlePassed){

    casinoTitle();
    
  } else {

    if(!BJstart && !PKstart){
	    
	  casinoMenu();
	    
    } else if (BJstart && !PKstart){

	  blackJack();
	    
    } else if (!BJstart && PKstart){

	  poker();

    } else {

	BJstart = false;
	PKstart = false;
	    
    }

  }

  
}
























function casinoTitle(){
	
    handleBackground(titleBG);

    if(cardArea.key && cardArea.key == 13){

        titlePassed = true;
        
    }
}


function casinoMenu(){

    handleBackground(menuBG);


    if(cardArea.key && cardArea.key == 49){

        BJstart = true;
        
    }

    if(cardArea.key && cardArea.key == 50){

        PKstart = true;
        
    }

    if(cardArea.key && cardArea.key == 51){

        console.log("settings");
        
    }
}














function blackJack(){

	handleBackground(gameBG);

	if(!betPlaced){

		bet();
		
	} else {

		//dealBlackjack();
		
	}
	
}




function poker(){


	console.log("WIP");
	PKstart = false;

	
}

























function openCasino() {
	if(!gameOpen){
		//add game window
		$(`.container-half`).first().append(`
		<div class="container-left" id="gameWindow" style="background-image: linear-gradient(45deg, black, black);">
		<div class="sectiontitle borderdark" id="gameTitle" border-bottom: none;">Game
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


function handleBackground(url){

	var canvas = document.getElementById("cardArea");
	var ctx = canvas.getContext("2d");
	
	ctx.globalCompositeOperation = 'destination-under'

    	const img = new Image;
    	img.src = url;
	ctx.drawImage(img, 0, 0);

}



function bet(){
	
	var canvas = document.getElementById("gameArea");
  	var ctx = canvas.getContext("2d");

	
	ctx.fillStyle = "white";
  	ctx.font = "50px Arial";
  	ctx.fillText("Bet Amount: " + String(betAmount), canvas.width / 2 - 50);
	
	makeButton(canvas.width / 2 - 67.5, canvas.height / 2, 30, 30, "+1", "1");
	makeButton(canvas.width / 2 - 32.5, canvas.height / 2, 30, 30, "+5", "2");
	makeButton(canvas.width / 2 - 67.5, canvas.height / 2, 30, 30, "+10", "3");
	makeButton(canvas.width / 2 - 67.5, canvas.height / 2, 30, 30, "+100", "4");
	makeButton(canvas.width / 2 - 15, canvas.height / 2 + 50, 30, 30, "CLEAR", "C");
	makeButton(canvas.width - 45, canvas.height - 45, 30, 30, "MENU", "M");


	
	if(cardArea.key && cardArea.key == 49){

	        betAmount += 1;
        
    	}

    	if(cardArea.key && cardArea.key == 50){

	        betAmount += 5;
        
    	}

    	if(cardArea.key && cardArea.key == 51){

        	betAmount += 10;
        
    	}
	
	if(cardArea.key && cardArea.key == 52){

        	betAmount += 100;
        
    	}

	if(cardArea.key && cardArea.key == 67){

        	betAmount = 0;
        
    	}

	if(cardArea.key && cardArea.key == 77){

        	BJstart = false;
        
    	}
	
	
}
	

function makeButton(x, y, w, h, type, key){

  var canvas = document.getElementById("gameArea");
  var ctx = canvas.getContext("2d");

  //OUTER BUTTON
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, w, h);
  
  //INNER BUTTON
  ctx.fillStyle = "#2b2b2b";
  ctx.fillRect(x + 3, y + 3, w - 6, h - 6);
  
  //BUTTON FUNCTION
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(type, x + 3, y - 10);
  
  //BUTTON KEY
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(key, x + 19, y + 53);
	
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
