const gameObj = document.querySelector(".game-obj");
const scoreObj = document.querySelector(".score>span");
const scoreLoseObj = document.querySelector(".score-lose>span");
const scoreBestObj = document.querySelector(".score-best>span");
const scoreBestMenuObj = document.querySelector(".bst-score-menu>span");
const startMenuObj = document.querySelector(".start-menu");
const stopMenuObj = document.querySelector(".stop-menu");
const loseMenuObj = document.querySelector(".lose-menu");	
const gameAreaObj = document.querySelector(".game-area");
const startBtnObj = document.querySelector(".start");
const closeMessObj = document.querySelector(".title-pos>span");
const messObj = document.querySelector(".title-pos");
const backObj = document.querySelector(".back");
const restartObj = document.querySelector(".restart");
const restartLoseObj = document.querySelector(".restart-lose");
const stopScoreObj = document.querySelector(".stop-score>span");
const loseScoreObj = document.querySelector(".lose-score>span");
const loseThisScoreObj = document.querySelector(".lose-this-score>span");


const audioPoint = document.querySelector("#point-a");
const audioOmission = document.querySelector("#omission-a");
const audioScore = document.querySelector("#score-a");
const audioLose = document.querySelector("#lose-a");
	


let score = 0;
let scoreLose = 0;
let timeInterval = 1200;
let stop = true;
let event = "click";


window.addEventListener("load", () =>{
	scoreBestMenuObj.innerHTML = localStorage.scoreBest;
	scoreBestObj.innerHTML = localStorage.scoreBest;
	stopScoreObj.innerHTML = localStorage.scoreBest;
	if(!localStorage.close){
		localStorage.close = false;
	}
	else{
		if(localStorage.close == "true"){
			messObj.style.display = "none";
		}
	}
	
});

startBtnObj.addEventListener("click", () => {
	startMenuObj.style.display = "none";
	startGame();
	loopAudio.play();
	loopAudio.volume = 0.2;
});

gameObj.addEventListener(event, () => {
	gameObj.style.display = "none";
	score++;
	if(score % 10 === 0){
		audioScore.load();
		audioScore.play();
	}
	else{
		audioPoint.load();
		audioPoint.play();
	}
});

closeMessObj.addEventListener("click", () => {
	localStorage.close = true;
	messObj.classList.add("title-pos-anim");
});								

backObj.addEventListener("click", backGame);
restartObj.addEventListener("click", restartGame);
restartLoseObj.addEventListener("click", () => {
	loseMenuObj.style.display = "none";
	restartGame();
});



window.addEventListener("keydown", e => {
	if(e.key == " "){
		stopGame();
	}
})


function startGame(){
	score = 0;
	scoreLose = 0;
	timeInterval = 1200;
	stop = false;
	Intervalus();
}

function stopGame(){
	if(stop === false){
		stop = true;
		stopMenuObj.style.display = "flex";
	}
}

function backGame(){
	stop = false;
	stopMenuObj.style.display = "none";
	Intervalus();
}

function restartGame(){
	score = 0;
	scoreLose = 0;
	timeInterval = 1200;
	stop = false;
	stopMenuObj.style.display = "none";
	Intervalus();
}

function gameInit(){
	if(stop === false){
		if(gameObj.style.display === "block"){
		scoreLose++;
		audioOmission.load();
		audioOmission.play();
	}
	if(!localStorage.scoreBest){
		localStorage.scoreBest = 0;
	}
	if(localStorage.scoreBest < score){
		localStorage.scoreBest = score;
	}
	if(scoreLose > 3){
		audioLose.load();
		audioLose.play();
		gameOver();
	}
	gameObj.style.display = "block";
	gameObj.style.backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
	gameObj.style.left = Math.floor(Math.random() * (window.innerWidth - 150)) + "px";
	gameObj.style.top = Math.floor(Math.random() * (window.innerHeight - 150)) + "px";

	if(score % 10 === 0){
		timeInterval = 1200 - score * 3;
	}

	scoreObj.innerHTML = score;
	scoreLoseObj.innerHTML = scoreLose;
	scoreBestObj.innerHTML = localStorage.scoreBest;
	stopScoreObj.innerHTML = localStorage.scoreBest;
	loseScoreObj.innerHTML = localStorage.scoreBest;
	loseThisScoreObj.innerHTML = score;



	Intervalus();
	}
	else{
		return;
	}
	
}

function gameOver(){
	stop = true;
	loseMenuObj.style.display = "flex";
}

function Intervalus(){
	if(stop === true){
		return;
	}
	else{
		setTimeout(gameInit, timeInterval);
	}
}