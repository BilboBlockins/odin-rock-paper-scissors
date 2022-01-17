console.log("Let's Play!");

let computerWins = 0;
let playerWins = 0;
let roundNum = 0;

const playerHandText = document.querySelector(".player-text");
const computerHandText = document.querySelector(".computer-text");
const readout = document.querySelector(".readout");
const scoreboard = document.querySelector(".scoreboard");

const rockBtn = document.querySelector(".rock-btn");
const paperBtn = document.querySelector(".paper-btn");
const scissorsBtn = document.querySelector(".scissors-btn");

rockBtn.addEventListener('click', () => handleChoice('rock'))
paperBtn.addEventListener('click', () => handleChoice('paper'))
scissorsBtn.addEventListener('click', () => handleChoice('scissors'))

//Main function that handles choice clicks
function handleChoice(choice) {
  let computerChoice = computerPlay();
  playerHandText.innerText = choice;
  computerHandText.innerText = computerChoice;

  console.log(`You chose ${choice}`);
  console.log(`Computer chose ${computerChoice}`);

  let outcome = playRound(choice, computerChoice);
  handleResults(outcome, choice, computerChoice);
}

//Used with buttons to readout score and add to wins. todo: need to update icon classes.
function handleResults(outcome, choice, computerChoice) {
  if (outcome === "Tie") {
    readout.innerText = "You tied - no one wins points."
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
  console.log(`End of round ${roundNum}\n\n`);
}

//Handles logic for the round. 0 is a tie, 1 is a win, -1 is a computer win.
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

//Run game
game();
