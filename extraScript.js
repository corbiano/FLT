//OBJECTS
var Agent;
var Sup;
var Duck;


//GAME STATES
var isOnFloor;
var gameOpen = false;
var gameStart = false;
var storeOpen = false;
var failed = false;
var inputAdded = false;
var canPromote = false;


//RUN STATS
var gameSpeed;
var Score;
var frame;
var wallet;
var selectedAgent = "";
var wins;
var job = 0;


//SHOP
var hasBlue;
var hasGold;
var hasPlat;


//UI
var button_1_W;
var button_1_H;
var button_1_X;
var button_1_Y;




$(`#Frontline_IconsTopDefault`).append(`
<div class="IconDefault headertext">
<i style="float:right; margin-top: 21px; margin-right: 10px;font-size:26px;" class="fa-sharp fa-solid fa-gamepad" id="gameButton" title="Reload" onclick="openGame()"></i>
</div>
`);


var gameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 810;
		this.canvas.height = 270;
		this.context = this.canvas.getContext("2d");
		$(`#gameWindow`).append(this.canvas);
		this.interval = setInterval(updateGameArea, 25);
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop : function() {
		clearInterval(this.interval);
	}
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
	
	this.shortHop = function(){
		if(isOnFloor && type == "player")
		this.speedY = -5;
	}
	this.fullHop = function(){
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


function beginSelectedGame(gameType) {
	if(gameType == "Jump"){
		if(gameOpen){
			highScore = Number(localStorage.getItem("highScore"));
			wallet = Number(localStorage.getItem("currentDucks"));
			wins = Number(localStorage.getItem("numWins"));
      			job = Number(localStorage.getItem("currentJob"));
			gameArea.start();

			gameArea.canvas.id = "gameArea";
			$(`#gameArea`).css("margin", "auto");
			$(`#gameArea`).css("border-radius", "10px");
			$(`#gameArea`).css("width", "100%");

      if(!inputAdded){
        addInput();
      }

			if(gameStart){

				backgroundColor("black");
        failed = false;
				Score = 0;
				frame = 0;
				gameSpeed = 5;
				Agent = new component(30, 30, "green", ((gameArea.canvas.width / 2) - 15), ((gameArea.canvas.height * 0.75) - 110), "player");
				Sup = new component(30, 40, "red", gameArea.canvas.width, ((gameArea.canvas.height * 0.75) + 5), "wall");
				Duck = new component(10, 10, "yellow", gameArea.canvas.width + 300, (gameArea.canvas.height - 50), "collectable");
			
			}
		}
	}
}















//MAIN GAME LOOP

function updateGameArea() {

	if (!gameStart){

		gameArea.clear();

		if(!storeOpen){
			titleScreen();
		} else {
			storeScreen();
		}

	} else if(!failed) {

		gameArea.clear();
		backgroundColor("black");
		updateScore();

		//SUP CODE
		Sup.x -= gameSpeed;
		Sup.speedY = 0;

		if (Sup.x < -30){
			var rand = (Math.floor(Math.random() * 200) + 100);
			Sup.x = (gameArea.canvas.width + rand);





      //INCREMENT GAME SPEED
      //**********************

			gameSpeed += 0.1

      //**********************
		}

		Sup.update();


		//DUCK CODE
		
		if(Duck.x < -30){
			var randX = (Math.floor(Math.random() * 500) + 300);
			Duck.x = (gameArea.canvas.width + randX);

			var randY = (-(Math.floor(Math.random() * 50)) - 50);
			Duck.y = ((gameArea.canvas.height * 0.75) + randY);
		}
		
		Duck.x -= gameSpeed;
		Duck.speedY = 0;
		Duck.update();

		
		
		//AGENT CODE
		Agent.floorCheck();
		gravity();
		
		if (Agent.crashWith(Duck)) {
			var randX = (Math.floor(Math.random() * 1000) + 500);
			Duck.x = (gameArea.canvas.width + randX);

			var randY = (-(Math.floor(Math.random() * 50)) - 50);
			Duck.y = ((gameArea.canvas.height * 0.75) + randY);
			Score += 1;
		}
		
		if (Agent.crashWith(Sup)) {  
			gameArea.clear();
      failed = true;
		}

		if (gameArea.key && gameArea.key == 87) {

			Agent.fullHop();
			frame++;
		
		} else {

			if(frame > 0){
				console.log(frame);
				frame = 0;
			}
			
		}

		Agent.newPos();
		Agent.update();
		
	
	} else {

    failScreen();

  }

  //frame++;
  
}























//MENUS

function titleScreen() {
	var canvas = document.getElementById("gameArea");
	var ctx = canvas.getContext("2d");

	backgroundColor("black");

	
	//TITLE
	ctx.fillStyle = "red";
	ctx.font = "70px Arial";
	ctx.fillText("Agent Jump", canvas.width / 2, 80);

	//RUN INFO
	ctx.fillStyle = "white";
	ctx.font = "15px Arial";
	ctx.fillText("High score: " + String(localStorage.getItem("highScore")), 10, 190);
	ctx.fillText("Last run: " + String(localStorage.getItem("lastScore")), 10, 220);
  if(canPromote){
    ctx.fillText("Press I to promote.", 10, 250);
  } else {
    ctx.fillText("You are not eligible for a promotion yet.", 10, 250);
  }

	ctx.font = "20px Arial";
  ctx.fillText("Current Position: " + getJob(), 10, 40);
	
	//START BUTTON
	makeButton((gameArea.canvas.width - 200), 180, 70, 70, "START", "W");
	
  
	//STORE BUTTON
  makeButton((gameArea.canvas.width - 100), 180, 70, 70, "STORE", "S");
  
	//HANDLE INPUT
	if(gameArea.key && gameArea.key == 87){
    gameStart = true;
    beginSelectedGame("Jump");
  }

	if(gameArea.key && gameArea.key == 83){storeOpen = true;}

  if(gameArea.key && gameArea.key == 222){resetStats()};

}



function storeScreen(){
	var canvas = document.getElementById("gameArea");
	var ctx = canvas.getContext("2d");
	
	//BACKGROUND
	ctx.globalCompositeOperation = 'destination-under'
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	
	//TITLE
	ctx.fillStyle = "white";
	ctx.font = "30px Arial";
	ctx.fillText("Store", 20, 40);


  //SHOP
  ctx.fillStyle = "blue";
	ctx.fillRect(20, 70, 40, 40);
  ctx.fillStyle = "yellow";
  ctx.fillRect(20, 130, 40, 40);
  ctx.fillStyle = "silver";
  ctx.fillRect(20, 190, 40, 40);

  ctx.fillStyle = "white";
  ctx.font = "25px Arial";

	
  if(JSON.parse(localStorage.getItem("hasBlue")) == false){
	  ctx.fillText("1. Blue Agent, 200 Ducks", 100, 100);
  } else {
	ctx.fillText("Owned!", 100, 100);
  }
	
  if(JSON.parse(localStorage.getItem("hasGold")) == false){
	ctx.fillText("2. Gold Agent, 500 Ducks", 100, 160);
  } else {
	ctx.fillText("Owned!", 100, 160);
  }
	
  if(JSON.parse(localStorage.getItem("hasPlat")) == false){ 
	ctx.fillText("3. Platinum Agent, 1000 Ducks", 100, 220);
  } else {
	ctx.fillText("Owned!", 100, 220);
  }

  //WALLET
  ctx.fillStyle = "white";
  ctx.font = "25px Arial";
	ctx.fillText("Wallet: " + localStorage.getItem("currentDucks"), (canvas.width - 160), 40);
	


	//MENU BUTTON
	makeButton((canvas.width - 100), 170, 70, 70, "MENU", "M");

	//HANDLE INPUT
	if(gameArea.key == 77){storeOpen = false;};
	if(gameArea.key == 187){addMoney(10);};
	
	if(gameArea.key == 49 && JSON.parse(localStorage.getItem("hasPlat")){
		if(Number(localStorage.getItem("currentDucks")) >= 200){
			wallet -= 200;
			localStorage.setItem("currentDucks", wallet);
			localStorage.setItem("hasBlue", true);
		} else{console.log("You cant afford this...");}
	};

	if(gameArea.key == 50 && JSON.parse(localStorage.getItem("hasPlat")){
		if(Number(localStorage.getItem("currentDucks")) >= 500){
			wallet -= 500;
			localStorage.setItem("currentDucks", wallet);
			localStorage.setItem("hasGold", true);
		} else{console.log("You cant afford this...");}
	};

	if(gameArea.key == 51 && JSON.parse(localStorage.getItem("hasPlat")){
		if(Number(localStorage.getItem("currentDucks")) >= 1000){
			wallet -= 1000;
			localStorage.setItem("currentDucks", wallet);
			localStorage.setItem("hasPlat", true);
		} else{console.log("You cant afford this...");}
	};

	
	

}



function failScreen() {
	var canvas = document.getElementById("gameArea");
	var ctx = canvas.getContext("2d");
	backgroundColor("black");
	
	
	//FAIL SPLASH TITLE
	if(Score < 10){
		ctx.fillStyle = "red";
		ctx.font = "70px Arial";
		ctx.fillText("AUTOFAIL", canvas.width / 2 - 160, 100);
	} else if(Score >= 10 && Score < 50) {
		ctx.fillStyle = "orange";
		ctx.font = "70px Arial";
		ctx.fillText("KEEP TRYING", canvas.width / 2 - 150, 100);
	} else if(Score >= 50 && Score < 100) {
		ctx.fillStyle = "green";
		ctx.font = "70px Arial";
		ctx.fillText("GOOD JOB", canvas.width / 2 - 160, 100);
	} else if(Score >= 100) {
		ctx.fillStyle = "white";
		ctx.font = "70px Arial";
		ctx.fillText("YOU WIN", canvas.width / 2 - 170, 100);



    //************
    winGame();
    //************



	}

	//LAST SCORE OUTPUT
	ctx.fillStyle = "white";
	ctx.font = "20px Arial";
	
	if(Score == 1){
		ctx.fillText("You collected " + String(Score) + " duck.", (canvas.width / 2 - 100), 155);
	} else {
		ctx.fillText("You collected " + String(Score) + " ducks.", (canvas.width / 2 - 100), 150);
	}

	//MENU BUTTON
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
	
	//RETRY BUTTON
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

	//HANDLE INPUT
	if(gameArea.key && gameArea.key == 82){
    failed = false;
    setStats(Score, wallet, job, wins);
    resetGame();
  }

  if (gameArea.key && gameArea.key == 77){
    setStats(Score, wallet, job, wins);
		mainMenu();
	}
	
}









	


	

// VARIOUS FUNCTION-ALITY


function winGame(){

    wins++;

}

function gravity() {
	Agent.floorCheck();
	if(!isOnFloor && gameOpen)
		Agent.speedY += 0.7;
}

function backgroundColor(color) {
	var canvas = document.getElementById("gameArea");
	var ctx = canvas.getContext("2d");
	
	ctx.globalCompositeOperation = 'destination-under'
	
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleBbackground() {
	var canvas = document.getElementById("gameArea");
	var ctx = canvas.getContext("2d");
	
	ctx.globalCompositeOperation = 'destination-under'
	
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateScore() {
	var canvas = document.getElementById("gameArea");
	var ctx = canvas.getContext("2d");
	
	ctx.fillStyle = "white";
	ctx.font = "20px Arial";
	ctx.fillText("Ducks: " + String(Score), 10, 30);
}

function openGame() {
	if(!gameOpen){
		//add game window
		$(`.container-half`).first().append(`
		<div class="container-left" id="gameWindow" style="background-image: linear-gradient(45deg, black, black);">
		<div class="sectiontitle borderdark" id="gameTitle" style="background-color: rgb(133, 86, 114); border-bottom: none;">Game
		<button type="submit" class="templatebutton" onclick="closeGame()">Close</button>
		</div>
		</div>
		`);
		
		gameOpen = true;
		beginSelectedGame("Jump");
	}
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

function resetStats(){

  wallet = 0;
  Score = 0;
  wins = 0;
  job = 0;
  localStorage.setItem("highScore", 0);
  localStorage.setItem("lastScore", 0);
  localStorage.setItem("currentDucks", 0);
  localStorage.setItem("currentJob", 0);
  localStorage.setItem("numWins", 0);
  localStorage.setItem("hasBlue", false);
  localStorage.setItem("hasGold", false);
  localStorage.setItem("hasPlat", false);
  

}

function getStats(){

  console.log(localStorage.getItem("highScore"));
  console.log(localStorage.getItem("currentDucks"));
  console.log(localStorage.getItem("currentJob"));
  console.log(localStorage.getItem("numWins"));
  console.log(localStorage.setItem("hasBlue"));
  console.log(localStorage.setItem("hasGold"));
  console.log(localStorage.setItem("hasPlat"));
  

}

function setStats(points, money, position, wins){
  
  if(points > localStorage.getItem("highScore")){
    localStorage.setItem("highScore", points);
  }

  localStorage.setItem("lastScore", points);

  localStorage.setItem("currentDucks", "");
  var tempDuck = (Number(money) + Number(points));
  localStorage.setItem("currentDucks", tempDuck);
  localStorage.setItem("currentJob", position);
  localStorage.setItem("numWins", wins);

}

function addMoney(money){
	var tempMoney = localStorage.getItem("currentDucks");
	tempMoney = Number(tempMoney) + Number(money);
	localStorage.setItem("currentDucks", tempMoney);
}

function getJob(){

  if(job == 0){

    return "Agent";

  } else if(job == 1){

    return "Floor Support";

  } else if(job == 2){

    return "Supervior";

  } else if(job == 3){

    return "Senior Supervisor";

  } else if(job == 4){

    return "Operations Manager";

  } else if(job == 5){

    return "President";

  } else if(job >= 6){

    return "CEO";

  } else {

    job = 0;
    localStorage.setItem("currentJob", job);

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

  if(key == "W" || key == "M"){
    ctx.fillText(key, x + 11, y + 53);
  } else {
    ctx.fillText(key, x + 19, y + 53);
  }


}
    
    
function closeGame() {
	gameArea.stop();
	gameStart = false;
	gameOpen = false;
	removeInput();
	$(`#gameWindow`).remove();
}

function resetGame(){ 
	gameArea.stop();
	gameArea.clear();
	Score = 0;
	gameSpeed = 0;
  wallet = 0;
  failed = false;
	beginSelectedGame("Jump");
}

function mainMenu(){ 
	gameArea.stop();
	gameArea.clear();
	Score = 0;
	gameSpeed = 0;
  wallet = 0;
  gameStart = false;
  failed = false;
}

function keyDown(event){
	gameArea.key = event.keyCode;
}

function keyUp(event){
	gameArea.key = false;
}
