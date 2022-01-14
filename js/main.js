console.log("Let's Play!");

//Handles logic for the round
function playRound(playerSelection, computerSelection) {
	if (playerSelection === computerSelection){
		return "Tie";
	}
	return "Someone won I'm just too dumb to know who...";
}

//Function returns random value for computer's play
function computerPlay() {
	return "Rock";
}

//Fuction return player input (will lowercase all but better to use buttons later)
function playerPlay() {
	let input = prompt("Rock, Paper, or Scissors?");
	return input.toLowerCase();
}

//Validation function for typed input
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
		console.log(`Computer Chose ${computerChoice}`)
		console.log(playRound(choice, computerChoice));
		round++;
		
		console.log(`End of round ${round}`);
	}
}

//Run game

game();
