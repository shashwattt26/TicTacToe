let boxes = document.querySelectorAll(".box");
let winMessage = document.querySelector("#winMessage");
let x = document.querySelector("#xWins");
let o = document.querySelector("#oWins");

const moveSound = new Audio("media/audio/mixkit-message-pop-alert-2354.mp3");
const winSound = new Audio("media/audio/level-up-05-326133.mp3");
const resSound = new Audio("media/audio/mixkit-long-pop-2358.wav");
const tieSound = new Audio("media/audio/sadwhisle-91469.mp3")

let turnO = true;
let box1,box2,box3;
let xWins = 0;
let oWins = 0;

const winPattern = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

setWins();
boxes.forEach((box) => {
  	box.addEventListener("click", () => {
		console.log("box was clicked");
		moveSound.play();
		if(turnO) {
			box.innerText = "O";
			console.log("turnO == true");
		}
		else {
			box.innerText = "X";
			console.log("turnO == false");
		}
		box.disabled = true;
		turnO = !turnO;
		updateTurnDisplay();
		checkWinner();
		checkBoxFilled();
	});
});


function reset() {
	boxes.forEach((box) => {
		box.innerText = "";
		box.disabled = false;
	});
	console.log("reset!");
	turnO = true;
	resSound.play();
}

function checkWinner() {
	for (let pattern of winPattern) {
		box1 = boxes[pattern[0]].innerText;
		box2 = boxes[pattern[1]].innerText;
		box3 = boxes[pattern[2]].innerText;
		if(box1 != "" && box2 != "" && box3 != "") {
			if(box1 === box2 && box2 === box3) {
				console.log(`${box1} wins`);
				if(box1 === "X") {
					xWins++;
					setWins(xWins,oWins);
					winSound.play();
					showMessage("Congratulations X wins!");
				} 
				else {
					oWins++;
					setWins(xWins,oWins);
					winSound.play();
					showMessage("Congratulations O wins!");
				}
				reset();
				return ;
			}
		}
	}
}

function checkBoxFilled() {
		for(let box of  boxes) {
			if(box.innerText === "") return;
		}

		console.log("It's a tie!");
		showMessage("It's a tie!");
		tieSound.play();
		setTimeout(reset, 2000);
}

function setWins() {
	x.innerText = `${xWins}`;
	o.innerText = `${oWins}`;
}

function newgame() {
	reset();
	console.log("New Game");
	xWins = 0;
	oWins = 0;
	setWins();
}

function showMessage(message) {
	winMessage.innerText = "";
	winMessage.innerText = message;
	winMessage.parentNode.classList.add("container2");
	setTimeout(hide, 3000);
}

function hide() {
	winMessage.parentNode.classList.remove("container2");
}

let turnDisplay = document.querySelector("#turnDisplay");

function updateTurnDisplay() {
	turnDisplay.innerText = `Turn: ${turnO ? "O" : "X"}`;
}
