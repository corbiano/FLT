var cardsDealt = 0;
var playerCards = 0;
var dealerCards = 0;

var betAmount = 0;
var betPlaced = false;

var wallet = 0;


var titleBG = "https://corbiano.github.io/FLT/casinoTitle.jpg";
var menuBG = "https://corbiano.github.io/FLT/casinoMenu.jpg";
var gameBG = "https://corbiano.github.io/FLT/casinoBJ.jpg";

var gameOpen = false;
var inputAdded = false;
var titlePassed = false;

var canInput = true;

var BJstart = false;
var PKstart = false;

$(`#Frontline_IconsTopDefault`).append(`
<div class="IconDefault headertext">
<i style="float:right; margin-top: 21px; margin-right: 10px;font-size:26px;" class="fa-sharp fa-solid fa-coins" id="gameButton" title="Reload" onclick="openCasino()"></i>
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
		//deck.dealPlayer();
		drawCard("A", "hearts", 0);
		drawCard("10", "clubs", 1);
		
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

	if(BJstart){
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.roundRect(5, 10, 105, 30, 5);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.stroke();
	
		ctx.fillStyle = "white";
		ctx.font = "20px Arial";
		ctx.fillText("$" + String(wallet), 10, 30);
	}

}



function bet(){
	
	var canvas = document.getElementById("cardArea");
  	var ctx = canvas.getContext("2d");
	
	ctx.fillStyle = "white";
  	ctx.font = "20px Arial";
	
	var tempBet = "Bet Amount: " + String(betAmount);
	var tempBetWidth = ctx.measureText(tempBet).width / 2;
	ctx.fillText(tempBet, (canvas.width / 2 - tempBetWidth), 30);

	var tempInfo = "Press Enter to place bet";
	var tempInfoWidth = ctx.measureText(tempInfo).width / 2;
	ctx.fillText(tempInfo, (canvas.width / 2 - tempInfoWidth), canvas.height - 20);
	
	makeButton(canvas.width / 2 - 147.5, canvas.height / 2, 70, 70, "+1", "1");
	makeButton(canvas.width / 2 - 72.5, canvas.height / 2, 70, 70, "+5", "2");
	makeButton(canvas.width / 2 + 2.5, canvas.height / 2, 70, 70, "+10", "3");
	makeButton(canvas.width / 2 + 77.5, canvas.height / 2, 70, 70, "+100", "4");
	makeButton(15, canvas.height - 85, 70, 70, "CLEAR", "C");
	makeButton(canvas.width - 85, canvas.height - 85, 70, 70, "MENU", "M");


	if(canInput){
		if(cardArea.key && cardArea.key == 49){
	
		        betAmount += 1;
			canInput = false;
	        
	    	}
	
	    	if(cardArea.key && cardArea.key == 50){
	
		        betAmount += 5;
			canInput = false;
	        
	    	}
	
	    	if(cardArea.key && cardArea.key == 51){
	
	        	betAmount += 10;
			canInput = false;
	        
	    	}
		
		if(cardArea.key && cardArea.key == 52){
	
	        	betAmount += 100;
			canInput = false;
	        
	    	}
	
		if(cardArea.key && cardArea.key == 67){
	
	        	betAmount = 0;
			canInput = false;
	        
	    	}
	
		if(cardArea.key && cardArea.key == 77){
	
	        	BJstart = false;
			canInput = false;
	        
	    	}
	
		if(cardArea.key && cardArea.key == 13){
	
	        	betPlaced = true;
			canInput = false;
	        
	    	}
	
	}
}

function drawCard(value, suit, count){
	var canvas = document.getElementById("cardArea");
  	var ctx = canvas.getContext("2d");
	
	ctx.fillStyle = "white";
  	ctx.fillRect(10 + ((count * 10) + (count * 70)), canvas.height - 120, 70, 110);

	if(suit == "hearts" || suit == "diamonds"){
		ctx.fillStyle = "red";
	} else if(suit == "spades" || suit == "clubs"){ 
		ctx.fillStyle = "black";
	}
	
  	ctx.font = "bold 20px Arial";
  	ctx.fillText(value, 10 + ((count * 10) + (count * 70)) , canvas.height - 100);
	
}
	

function makeButton(x, y, w, h, type, key){

  var canvas = document.getElementById("cardArea");
  var ctx = canvas.getContext("2d");
  var midX = (x + (w / 2));
  var midY = (y + (h / 2));

  //OUTER BUTTON
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, w, h);
  
  //INNER BUTTON
  ctx.fillStyle = "#2b2b2b";
  ctx.fillRect(x + 3, y + 3, w - 6, h - 6);
  
  //BUTTON FUNCTION
  ctx.fillStyle = "white";
  ctx.font = String(h - 50) + "px Arial";
  var FtempWidth = ctx.measureText(type).width / 2;
  ctx.fillText(type, (midX - FtempWidth), (y - 10));
  
  //BUTTON KEY
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  var KtempWidth = ctx.measureText(key).width / 2;
  var KtempHeight = ctx.measureText(key).height / 2;
  ctx.fillText(key, (midX - KtempWidth), (midY - KtempHeight));
	
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
	canInput = true;
}
