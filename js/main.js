console.log("Let's Play!");

let computerWins = 0;
let playerWins = 0;
let roundNum = 1;

const handBoxes = document.querySelectorAll(".hand-box");
const playerHand = document.querySelector(".player-hand");
const computerHand = document.querySelector(".computer-hand");
const playerHandText = document.querySelector(".player-text");
const computerHandText = document.querySelector(".computer-text");
const readout = document.querySelector(".readout");
const scoreboard = document.querySelector(".scoreboard");
const roundDisplay = document.querySelector(".round")
const choices = document.querySelector(".choices")
const rockBtn = document.querySelector(".rock-btn");
const paperBtn = document.querySelector(".paper-btn");
const scissorsBtn = document.querySelector(".scissors-btn");
const playAgainBtn = document.querySelector(".play-again-btn")

rockBtn.onclick = () => handleChoice('rock');
paperBtn.onclick = () => handleChoice('paper');
scissorsBtn.onclick = () => handleChoice('scissors');
playAgainBtn.onclick = () => handlePlayAgain();

startGame();

async function startGame() {
  await animatePlay(0);
  changeIcon("rock", "rock");
}

//Checks for end game condition and gives message.
function isGameOver() {
  if(roundNum > 5) {
    roundDisplay.innerText = `Game Over.`;
    if (computerWins > playerWins) {
  	  readout.innerText = `Computer wins best of 5 rounds with ${computerWins} points.`;
    } else if (playerWins > computerWins) {
  	  readout.innerText = `You win best of 5 rounds with ${playerWins} points!`;
    } else {
  	  readout.innerText = `Best of 5 rounds is a tie.`;
    }
    return true;
  } else {
  	return false;
  }
}

//Resets all the readouts, round number, and score 
function handlePlayAgain() {
  roundNum = 1;
  computerWins = 0;
  playerWins = 0;
  console.log("Player wants to play again.");
  changeIcon("rock", "rock");
  playAgainBtn.className = "choice-btn hide";
  rockBtn.className = "choice-btn";
  paperBtn.className = "choice-btn";
  scissorsBtn.className = "choice-btn";
  playerHandText.innerText = "...";
  computerHandText.innerText = "...";
  readout.innerText = "Best of 5 rounds.";
  scoreboard.innerText = "Score: You - 0, Computer - 0";
  roundDisplay.innerText = "Round 1 of 5: Choose your weapon!";
}

//Adds some animation to the hands during play
async function animatePlay(time) {
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;
  changeIcon("rock", "rock");
  playerHandText.innerText = "...";
  computerHandText.innerText = "...";
  
  handBoxes.forEach((el) => {
    el.classList.add("bouncing")	
  });
  await delayForBounce(time);
  handBoxes.forEach((el) => {
    el.classList.remove("bouncing")	
  });
  
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;
}

//Returns a promise to add delay to async functions
function delayForBounce(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
	}, time);	
  });
}

//Main function that handles choice clicks
async function handleChoice(choice) {
  await animatePlay(1500);
  let computerChoice = computerPlay();
  playerHandText.innerText = choice.toUpperCase();
  computerHandText.innerText = computerChoice.toUpperCase();

  changeIcon(choice, computerChoice);
  console.log(`You chose ${choice}`);
  console.log(`Computer chose ${computerChoice}`);
  let outcome = playRound(choice, computerChoice);
  handleResults(outcome, choice, computerChoice);
}

//Changes icon based on selections (rock during play like in real life)
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

//Used with buttons to readout score and add to wins. Increments rounds.
function handleResults(outcome, choice, computerChoice) {
  if (outcome === "Tie") {
    readout.innerText = `You tied with ${choice.toUpperCase()} - no points.`;
    scoreboard.innerText = `Score: You - ${playerWins}, Computer - ${computerWins}`;
  } else if (outcome === "Win") {
    readout.innerText = `You Win!!! ${choice.toUpperCase()} beats ${computerChoice.toUpperCase()}!`;
    playerWins++;
    scoreboard.innerText = `Score: You - ${playerWins}, Computer - ${computerWins}`;
  } else if (outcome === "Lose") {
    readout.innerText = `You Lose... ${computerChoice.toUpperCase()} beats ${choice.toUpperCase()}.`;
    computerWins++;
    scoreboard.innerText = `Score: You - ${playerWins}, Computer - ${computerWins}`;
  }
  roundNum++;
  roundDisplay.innerText = `Round ${roundNum} of 5: Choose you weapon!`;
  
  if (isGameOver()) {
    rockBtn.className = "choice-btn hide";
    paperBtn.className = "choice-btn hide";
    scissorsBtn.className = "choice-btn hide";
    playAgainBtn.className = "choice-btn";
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
