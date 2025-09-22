
//alert("running external JS code!")

//Global Varaiables
//let randomNumber = Math.floor(Math.random()* 99 )+ 1;
//console.log(randomNumber);
let randomNumber;
let attempts = 0;

 let wins = 0;
 let losses = 0;

//document.querySelector("h1").style.color= "red";

//randomNumber;
// attempts = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

   //showing the Guess button
   document.querySelector("#guessBtn").style.display = "inline";

   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus(); // adding focus to textbox
   playerGuess.value = ""; // clearing the textbox

   let feedback = document.querySelector("#feedback");
   feedback.textContent = ""; //clearing the feedback

   //clearing previous guesses
   document.querySelector("#guesses").textContent = "";

   document.querySelector("#attemptsLeft").textContent = 7;
   document.querySelector("#wins").textContent = wins;
   document.querySelector("#losses").textContent = losses;
  
   //adding focus to textbox
   //document.querySelector("#playerGuess").focus();
}

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

function checkGuess(){
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);

    if(guess < 1 || guess > 99){
       feedback.textContent = "Enter a number between 1 and 99";
       feedback.style.color = "red";
        return;
    }


attempts ++;
console.log("Attempts: " + attempts);
document.querySelector("#attemptsLeft").textContent = (7 - attempts);
feedback.style.color = "orange";

if (guess == randomNumber){
    feedback.textContent = " You guessed it! You Won!";
    feedback.style.color = "darkgreen";

    wins++;
    document.querySelector("#wins").textContent = wins;
    gameOver();

} else {
    document.querySelector("#guesses").textContent += guess + " ";
    if (attempts == 7){
        feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
        feedback.style.color = "red";

        losses++;
        document.querySelector("#losses").textContent = losses;
        gameOver();

    } else if (guess > randomNumber){
        feedback.textContent = "Guess was high";

    } else {
        feedback.textContent = "Guess was low";
    }
}
}

function gameOver(){
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hides Guess button
    resetBtn.style.display = "inline"; //displays Reset button
}