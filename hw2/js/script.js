//Global Variables
let wordList = [
    "javascript", "monkey", "amazing", "pancake", "wizard", "galaxy", "computer", "programming", "hangman", "developer"
];

let pictureLinks = [
    "img/zero.png",
    "img/one.png",
    "img/two.png",
    "img/three.png",
    "img/four.png",
    "img/five.png",
    "img/six.png"
];

let chosenWord;
let shownLetters;
let usedLetters;
let wrongLetters;
let attempts = 0;
let maxAttempts = 6;
let wins = 0;
let losses = 0;

 document.querySelector("#guessBtn").addEventListener("click", checkGuess);
 document.querySelector("#resetBtn").addEventListener("click", initializeGame);

initializeGame ();

//Functions

function initializeGame () {
    chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log("chosenWord: " + chosenWord);

    shownLetters = [];
    usedLetters = [];
    wrongLetters = [];
    attempts = 0;

    document.querySelector("#resetBtn").style.display = "none";
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.disabled = false;
    playerGuess.value = "";
    playerGuess.focus();

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    feedback.className = "";

    document.querySelector("#wrongLetters").textContent = "- ";
    document.querySelector("#attemptsLeft").textContent = String(maxAttempts);
    document.querySelector("#wins").textContent = String(wins);
    document.querySelector("#losses").textContent = String(losses);

    let slots = document.querySelector("#wordSlots");
    slots.innerHTML = "";
    for (let i = 0; i < chosenWord.length; i= i + 1) {
        shownLetters.push("_");
        let span = document.createElement("span");
        span.className = "slot";
        span.textContent = "";
        slots.appendChild(span);
    }
    document.querySelector("#picture").src = pictureLinks[0];
}

    function checkGuess() {
        let feedback = document.querySelector("#feedback");
        feedback.textContent = "";
        feedback.className = "";
        feedback.style.color = "";

        let letter = document.querySelector("#playerGuess").value.toLowerCase();
        console.log("Player letter: " + letter);


        if(!letter || letter.length !== 1 || letter < "a" || letter > "z") { 
            feedback.textContent = "Enter a single letter (a-z).";
            feedback.className="";
            feedback.style.color = "orange";
            return;
     }
        if(indexOfValue(usedLetters, letter) !== -1) {
            feedback.textContent = "You already tried " + letter + ".";
            feedback.style.color = "blue";
            return;
        }

        usedLetters.push(letter);

        let found = false;
        for(let i = 0; i < chosenWord.length; i = i + 1) {
            if(chosenWord[i] === letter) {
                shownLetters[i] = letter;
                found = true;
            }
        }

        if(found) {
            feedback.textContent = "Good " + letter + " is in the word!";
            feedback.className = "";
            feedback.style.color = "darkgreen";

            showLetters();
            if(indexOfValue(shownLetters, "_") === -1) {
                feedback.textContent = "You win! The word was " + chosenWord + ".";
                feedback.className = "win";
                feedback.style.color = "";
                wins++;
                document.querySelector("#wins").textContent = String(wins);
                gameOver();
            }

        } else {
            attempts = attempts + 1;
            document.querySelector("#attemptsLeft").textContent = String(maxAttempts - attempts);
            wrongLetters.push(letter);
            document.querySelector("#wrongLetters").textContent =  wrongLetters.join(", ");
            document.querySelector("#picture").src = pictureLinks[attempts];

            feedback.textContent = "Nope " + letter + " is not in the word.";
            feedback.className = "";
            feedback.style.color = "orange";

            if(attempts === maxAttempts) {
                feedback.textContent = "You lose! The word was " + chosenWord + ".";
                feedback.className = "lose";
                feedback.style.color = "";
                losses++;
                document.querySelector("#losses").textContent = String(losses);
                gameOver();
            }
        }

        let playerGuess = document.querySelector("#playerGuess");
        playerGuess.value = "";
        playerGuess.focus();
    }
    

    function gameOver() {
        let guessBtn = document.querySelector("#guessBtn");
        let resetBtn = document.querySelector("#resetBtn");
        guessBtn.style.display = "none";
        resetBtn.style.display = "inline";

         document.querySelector("#playerGuess").disabled = true;
    }

         function indexOfValue(list, value) {
            for(let i = 0; i < list.length; i = i + 1) {
                if(list[i] === value)  { return i;}
            }
                return -1;
         }

         function showLetters() {
            let slotSpans = document.querySelector("#wordSlots").children;
            for(let i = 0; i < shownLetters.length; i = i + 1) {
                slotSpans[i].textContent = (shownLetters[i] === "_" ) ? "" : shownLetters[i].toUpperCase();
            }
         }

        
