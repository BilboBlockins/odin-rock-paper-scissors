console.log("Let's Play!");

playerHand = document.querySelector(".player-hand");
computerHand = document.querySelector(".computer-hand");

function handleChoice(choice) {
  playerHand.innerText = choice;
  console.log(`You chose ${choice}`)
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
