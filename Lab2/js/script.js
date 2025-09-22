// Evernt listener
document.querySelector("#guessBtn").addEventListener("click", guess);
// document.querySelector("#textColorBtn").addEventListener("click", changeTextColor);
document.querySelector("#guessBox").addEventListener("keydown", function (e){
    if (e.key == "Enter"){guess();}
});

/*
function changeTextColor(){
    let userColor = document.querySelector("#textColor").value;
    document.querySelector("#result").style.color = userColor;
}
*/


//global variable
let randomNumber = Math.floor(Math.random() * 99)+ 1;
let attempts=0;
let wins = 0;
let loses = 0;
let MAX_TRIES = 7;

let answersEl = document.querySelector("#answers");
let attemptsEl = document.querySelector("#attempts");
let resultEl = document.querySelector("#result");
let guessBtn = document.querySelector("#guessBtn");
let guessBox = document.querySelector("#guessBox");


let winsEl = document.createElement("p");
winsEl.id = "wins";
winsEl.textContent = "Wins: 0";

let lossesEl = document.createElement("p");
lossesEl.id = "losses";
lossesEl.textContent = "Losses: 0";

let playAgainBtn = document.createElement("button");
playAgainBtn.id = "playAgainBtn";
playAgainBtn.textContent = "Play Again";
playAgainBtn.style.display = "none";
playAgainBtn.addEventListener("click", resetGame);

// Insert above Previous Guesses
document.body.insertBefore(winsEl, answersEl);
document.body.insertBefore(lossesEl, answersEl);
document.body.insertBefore(playAgainBtn, answersEl);

// ---- Helpers (simple) ----
function updateAttemptsText() {
  attemptsEl.textContent = "Number of Attempts: " + attempts + " / " + MAX_TRIES;
}

function setResult(text, color) {
  resultEl.textContent = text;
  if (color) { resultEl.style.color = color; }
}

function disableGuessing(disabled) {
  guessBtn.disabled = disabled;
  guessBox.disabled = disabled;
  if (disabled) {
    guessBtn.style.display = "none";
    playAgainBtn.style.display = "inline-block";
  } else {
    guessBtn.style.display = "inline-block";
    playAgainBtn.style.display = "none";
  }
}

function guess() {
  let raw = document.querySelector("#guessBox").value;
  let userGuess = parseInt(raw, 10);

  // Validate: whole number 1..99
  if (raw === "" || isNaN(userGuess)) {
    setResult("Please enter a whole number.", "red");
    return;
  }
  if (userGuess < 1 || userGuess > 99) {
    setResult("Number must be between 1 and 99.", "red");
    return;
  }

  // Append guess using textContent += (requirement)
  answersEl.textContent += " " + userGuess;

  // Count attempt
  attempts = attempts + 1;
  updateAttemptsText();

  // Compare
  if (userGuess === randomNumber) {
    wins = wins + 1;
    winsEl.textContent = "Wins: " + wins;

    let triesWord = (attempts === 1) ? "try" : "tries";
    setResult("You got it in " + attempts + " " + triesWord + "!", "green");

    // Congratulatory note if within 7 attempts (extra credit)
    if (attempts <= MAX_TRIES) {
      answersEl.textContent += " 🎉 (within 7 attempts)";
    }

    disableGuessing(true);
    return;
  }

  // Not correct -> High/Low hint (color-coded)
  if (userGuess < randomNumber) {
    setResult("Too Low! Try a higher number.", "orange");
  } else {
    setResult("Too High! Try a lower number.", "orange");
  }

  // Loss at 7 attempts
  if (attempts >= MAX_TRIES) {
    losses = losses + 1;
    lossesEl.textContent = "Losses: " + losses;
    setResult("You Lost. The number was " + randomNumber + ".", "red");
    disableGuessing(true);
  }
}

function resetGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  attempts = 0;
  updateAttemptsText();

  // Reset UI
  answersEl.textContent = "Previous Guesses:";
  setResult("The Guess Was", "");
  document.querySelector("#guessBox").value = "";
  disableGuessing(false);
  document.querySelector("#guessBox").focus();
}

// ---- Initial text ----
updateAttemptsText();
setResult("Make your first guess!", "blue");
guessBox.focus();






/** 
function guess(){

    let userGuess = document.querySelector("#guessBox").value;
          //  alert(userGuess);

    let targetNum = randomNumber;

         // document.querySelector("#answers").textContent += userGuess + ", ";
             document.querySelector("#answers").textContent += `${userGuess} `;
            // document.querySelector("#atttempts").textContent; 

        console.log(targetNum);
        console.log(userGuess);
        console.log(attempts);
        attempts++;

        document.querySelector("#attempts").textContent = attempts;
    if(userGuess < targetNum){
        document.querySelector("#result").textContent = "Too Low!";
    } else if (userGuess > targetNum){
        document.querySelector("#result").textContent = "Too High!";
    } else if (userGuess == targetNum){
        document.querySelector("#result").textContent = "You got it!";
    } else {
        document.querySelector("#result").textContent = "Please enter a number between 1 and 100";
    }   

        }

*/