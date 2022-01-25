console.log("Let's Play!");

let computerWins = 0;
let playerWins = 0;
let roundNum = 0;

const handBoxes = document.querySelectorAll(".hand-box");

const playerHand = document.querySelector(".player-hand");
const computerHand = document.querySelector(".computer-hand");
const playerHandText = document.querySelector(".player-text");
const computerHandText = document.querySelector(".computer-text");
const readout = document.querySelector(".readout");
const scoreboard = document.querySelector(".scoreboard");

const rockBtn = document.querySelector(".rock-btn");
const paperBtn = document.querySelector(".paper-btn");
const scissorsBtn = document.querySelector(".scissors-btn");

const roundDisplay = document.querySelector(".round")

rockBtn.addEventListener('click', () => handleChoice('rock'))
paperBtn.addEventListener('click', () => handleChoice('paper'))
scissorsBtn.addEventListener('click', () => handleChoice('scissors'))

startGame();

async function startGame() {
  await animatePlay();
}

function isGameOver() {
  if(roundNum > 5) {
  	return true;
  } else {
  	return false;
  }
}

async function animatePlay() {
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;
  changeIcon("rock", "rock");
  playerHandText.innerText = "...";
  computerHandText.innerText = "...";
  
  handBoxes.forEach((el) => {
    el.classList.add("bouncing")	
  });
  await delayForBounce(1500);
  handBoxes.forEach((el) => {
    el.classList.remove("bouncing")	
  });
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;
}

function delayForBounce(time) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, time);	
	});
}

//Main function that handles choice clicks
async function handleChoice(choice) {
  await animatePlay();
  let computerChoice = computerPlay();
  playerHandText.innerText = choice.toUpperCase();
  computerHandText.innerText = computerChoice.toUpperCase();

  changeIcon(choice, computerChoice);

  console.log(`You chose ${choice}`);
  console.log(`Computer chose ${computerChoice}`);

  let outcome = playRound(choice, computerChoice);
  handleResults(outcome, choice, computerChoice);
}

function changeIcon(playerIcon, computerIcon) {
	//replace all current classes with the updated versions
	//scissors icon has a different rotation so needs its own condition
	if(playerIcon !== 'scissors'){
		playerHand.className = 
		`fa-rotate-90 player-hand far fa-hand-${playerIcon} fa-7x`;
	} else {
		playerHand.className = 
		`fa-flip-horizontal player-hand far fa-hand-${playerIcon} fa-7x`;
	}

	if(computerIcon !== 'scissors') {
		computerHand.className = 
		`flipper computer-hand far fa-hand-${computerIcon} fa-7x`;
	} else {
		computerHand.className = 
		`computer-hand far fa-hand-${computerIcon} fa-7x`;	
	}
}

//Used with buttons to readout score and add to wins. todo: need to update icon classes.
function handleResults(outcome, choice, computerChoice) {
  if (outcome === "Tie") {
    readout.innerText = `You tied with ${choice} - no one wins points.`
    scoreboard.innerText = `Score: You - ${playerWins}, Computer - ${computerWins}`
  } else if (outcome === "Win") {
    readout.innerText = `You Win! ${choice} beats ${computerChoice}!`
    playerWins++;
    scoreboard.innerText = `Score: You - ${playerWins}, Computer - ${computerWins}`
  } else if (outcome === "Lose") {
    readout.innerText = `You Lose! ${computerChoice} beats ${choice}!`
    computerWins++;
    scoreboard.innerText = `Score: You - ${playerWins}, Computer - ${computerWins}`
  }
  roundNum++
  roundDisplay.innerText = `Round ${roundNum}`
  
  if (isGameOver()) {
  	roundDisplay.innerText = `Game Over`
    if (computerWins > playerWins) {
  	  readout.innerText = `Computer wins best of 5 rounds with ${computerWins} points`;
    } else if (playerWins > computerWins) {
  	  readout.innerText = `Player wins best of 5 rounds with ${playerWins} points`;
    } else {
  	  readout.innerText = `Best of 5 rounds is a tie`;
    }
    let playAgainBtn = document.createElement("button");
    playAgainBtn.innerHTML = "Play Again?";
    scoreboard.appendChild(playAgainBtn);

  }
  console.log(`End of round ${roundNum}\n\n`);
}

//Handles logic for the round.
function playRound(playerSelection, computerSelection) {
	

	//check for tie condition
	if (playerSelection === computerSelection) return "Tie";
	//check other win conditions - since tie is covered already any non-win is a loss.
	switch (playerSelection) {
		case "rock":
			return (computerSelection === "scissors") ? "Win" : "Lose";
		case "paper":
			return (computerSelection === "rock") ?  "Win" : "Lose";
		case "scissors":
			return (computerSelection === "paper") ? "Win" : "Lose";
		default:
			return "Someone won I'm just too dumb to know who...";	
	}
}

//Function returns random value for computer's play.
function computerPlay() {
    //Get random 0, 1, or 2
    let num = Math.floor(Math.random() * 3);
    //Return choice
    switch (num) {
    	case 0:
    		return "rock";
    	case 1:
    		return "paper";
    	case 2:
    		return "scissors";
    	default:
    		return "wtf?";
    }
}

//Fuction return player input (will lowercase all but better to use buttons later).
function playerPlay() {
	let input = prompt("Rock, Paper, or Scissors?");
	return input.toLowerCase();
}

//Validation function for typed input - not needed with button input.
function validChoice(choice) {
	return (choice === "rock" || choice === "paper" || choice === "scissors")
}

//Game function to keep track of game
function game() {
	let round = 0;
	let computerWin = 0;
	let playerWin = 0;

	//Main loop - play 5 rounds
	while (round < 5) {
		let computerChoice = computerPlay();
		let choice = playerPlay();

		//Some validation here since they are typing this in
		while (!validChoice(choice)) {
			alert('Invalid play - choose Rock, Paper, or Scissors.');
			choice = playerPlay();
		}

		console.log(`You Chose ${choice}`);
		console.log(`Computer Chose ${computerChoice}\n`)
		
		//Log the play output.
		let outcome = playRound(choice, computerChoice)
		
		if (outcome === "Tie") {
			console.log("You tied - no one wins points.")
			console.log (`Score: You - ${playerWin}, Computer - ${computerWin}`)
		} else if (outcome === "Win") {
			console.log(`You Win! ${choice} beats ${computerChoice}!`)
			playerWin++;
			console.log (`Score: You - ${playerWin}, Computer - ${computerWin}`)
		} else if (outcome === "Lose") {
			console.log(`You Lose! ${choice} beats ${computerChoice}!`)
			computerWin++;
			console.log (`Score: You - ${playerWin}, Computer - ${computerWin}`)
		}
		
		//Count round
		round++;
		
		console.log(`End of round ${round}\n\n`);
	}
	
}

//Run game - change to event driven game by clicks
//game();
