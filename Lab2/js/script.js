// Evernt listener
document.querySelector("#guessBtn").addEventListener("click", guess);
document.querySelector("#textColorBtn").addEventListener("click", changeTextColor);

function changeTextColor(){
    let userColor = document.querySelector("#textColor").value;
    document.querySelector("#result").style.color = userColor;
}

//global variable
let randomNumber = Math.floor(Math.random() * 99)+ 1;
let attempts=0;
let result="";

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