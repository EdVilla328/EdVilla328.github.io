
const POINTS = 20;

function setText(id, ok, msg) {
  let box = document.querySelector('#' + id + ' .feedback');
  box.className = 'feedback ' + (ok ? 'correct' : 'incorrect');
  box.textContent = msg;
  box.style.color = ok ? 'green' : 'red';
}

document.getElementById('quiz').addEventListener('submit', function (e) {
  e.preventDefault();
  let total = 0;
//Q1
  let q1choice = document.querySelector('input[name="q1"]:checked');
  let q1 = q1choice ? q1choice.value : '';
  let q1ok = (q1 === 'Mexico City');
  setText('q1', q1ok, q1ok ? 'Correct!' : 'Incorrect. Correct answer: Mexico City.');
  if (q1ok) total += POINTS;

  // Q2 
  let q2 = (document.querySelector('input[name="q2"]').value || '').toLowerCase().trim();
  let q2ok = (q2 === 'Seoul');
  setText('q2', q2ok, q2ok ? 'Correct!' : 'Incorrect. The Capital is "Seoul".');
  if (q2ok) total += POINTS;

  // Q3 
  let q3 = document.querySelector('select[name="q3"]').value;
  let q3ok = (q3 === 'Washington DC');
  setText('q3', q3ok, q3ok ? 'Correct!' : 'Incorrect. The correct choice is "Washington DC".');
  if (q3ok) total += POINTS;

  // Q4 
  let q4 = Number(document.querySelector('input[name="q4"]').value);
  let q4ok = (q4 === 6);
  setText('q4', q4ok, q4ok ? 'Correct!' : 'Incorrect. We expected 6.');
  if (q4ok) total += POINTS;

  // Q5 
  let pickedNodes = document.querySelectorAll('input[name="q5"]:checked');
  let picked = [];
  for (let i = 0; i < pickedNodes.length; i++) {
    picked.push(pickedNodes[i].value);
  }
  let correct = ['Versaille', 'Lyon', 'Rennes'];

  let same = picked.length === correct.length;
  if (same) {
    for (let j = 0; j < correct.length; j++) {
      if (picked.indexOf(correct[j]) === -1) { same = false; break; }
    }
  }
  setText('q5', same, same ? 'Correct: Versaille, Lyon, Rennes.' : 'Incorrect. Correct Capitals are: Versaille, Lyon, Rennes.');
  if (same) total += POINTS;

  
  let scoreBox = document.getElementById('scoreBox');
  scoreBox.style.display = 'block';
  scoreBox.textContent = 'Total Score: ' + total + ' / ' + (POINTS * 5);
});

document.getElementById('quiz').addEventListener('reset', function () {
  
  let fb = document.querySelectorAll('.feedback');
  for (let i = 0; i < fb.length; i++) {
    fb[i].textContent = '';
    fb[i].className = 'feedback';
  }
 
  let cards = document.querySelectorAll('.card');
  for (let j = 0; j < cards.length; j++) {
    cards[j].style.borderColor = 'lightgray';
  }
  let scoreBox = document.getElementById('#scoreBox');
  scoreBox.style.display = 'none';
  scoreBox.textContent = POINTS;
});










/*
document.querySelector("button").addEventListener("click", gradeQuiz);


displayQ3Options();
function displayQ3Options(){

    let q3Options = ["font-color", "fontColor", "color", "textColor"];
    q3Options = _.shuffle(q3Options);

    for(let i of q3Options){

    

    let inputElement = document.createElement("input");
    inputElement.type = "radio";
    inputElement.name = "q3";
    inputElement.value = i;
    console.log(inputElement);


    let labelElement = document.createElement("label");
    labelElement.textContent = i;
    labelElement.append(inputElement);

    document.querySelector("#q3Options").append(labelElement);
    }
}





function gradeQuiz(){

    let userAnswer1 = document.querySelector("input[name=q1]: checked").value;

    //alert (userAnswer1);

    if(userAnswer1 == "color"){
        alert("Right")

    }else{
        alert("Wrong")
    }
}

*/