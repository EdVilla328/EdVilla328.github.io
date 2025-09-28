
const POINTS = 20;

function updateFeedback(questionId, isCorrect, message) {
  let feedbackbox = document.querySelector('#' + questionId + ' .feedback');
  feedbackbox.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');
  feedbackbox.textContent = message;
  feedbackbox.style.color = isCorrect ? 'green' : 'red';
}

document.getElementById('submitQuiz').addEventListener('click', function () {
  let totalScore = 0;

//Q1
  let q1Option = document.querySelector('input[name="q1"]:checked');
  let q1Answer = q1Option ? q1Option.value : '';
  let isQ1Correct = (q1Answer === 'Mexico City');
  updateFeedback('q1', isQ1Correct, isQ1Correct ? 'Correct!' : 'Incorrect. Correct answer: Mexico City.');
  if (isQ1Correct) totalScore += POINTS;

  // Q2 
  let q2Answer = document.querySelector('input[name="q2"]').value || '';
  let isQ2Corect = (q2Answer === 'Seoul' || q2Answer === 'seoul');
  updateFeedback('q2', isQ2Corect, isQ2Corect ? 'Correct!' : 'Incorrect. The Capital is "Seoul or seoul".');
  if (isQ2Corect) totalScore += POINTS;

  // Q3 
  let q3Answer = document.querySelector('select[name="q3"]').value;
  let isQ3Correct = (q3Answer === 'Washington DC');
  updateFeedback('q3', isQ3Correct, isQ3Correct ? 'Correct!' : 'Incorrect. The correct choice is "Washington DC".');
  if (isQ3Correct) totalScore += POINTS;

  // Q4 
  let q4Answer = Number(document.querySelector('input[name="q4"]').value);
  let isQ4Correct = (q4Answer === 6);
  updateFeedback('q4', isQ4Correct, isQ4Correct ? 'Correct!' : 'Incorrect. We expected 6.');
  if (isQ4Correct) totalScore += POINTS;

  // Q5 
  let pickedNodes = document.querySelectorAll('input[name="q5"]:checked');
  let picked = [];
  for (let i = 0; i < pickedNodes.length; i++) {
    picked.push(pickedNodes[i].value);
  }
  let correct = ['Versailles', 'Washington'];

  let same = picked.length === correct.length;
  if (same) {
    for(let j = 0 ; j < correct.length; j++){
      if(!picked.includes(correct[j])){
        same = false;
        break;
      }
    }
  }
  updateFeedback('q5', same, same ? 'Correct: Versailles, Washington' : 'Incorrect. Correct Choices are: Versailles, Washington.');
  if (same) totalScore += POINTS;

  
  let scoreBox = document.getElementById('scoreBox');
  scoreBox.style.display = 'block';
  scoreBox.textContent = 'Total Score: ' + totalScore + ' / ' + (POINTS * 5);

  let congrats= document.getElementById('congratsMsg');
  if(totalScore >= 80){
    congrats.className = 'congrats visible';
    congrats.textContent = 'Congratulations! You have scored 80% or higher!';

  } else {
    congrats.className = 'congrats hidden';
    congrats.textContent = '';
  }
});

document.getElementById('quiz').addEventListener('reset', function () {
  
  let feedbackNodes = document.querySelectorAll('.feedback');
  for (let i = 0; i < feedbackNodes.length; i++) {
    feedbackNodes[i].textContent = '';
    feedbackNodes[i].className = 'feedback';
  }
 
  let cards = document.querySelectorAll('.card');
  for (let j = 0; j < cards.length; j++) {
    cards[j].style.borderColor = 'lightgray';
  }
  let scoreBox = document.getElementById('scoreBox');
  scoreBox.style.display = 'none';
  scoreBox.textContent = POINTS;
  let congrats= document.getElementById('congratsMsg');
  congrats.className = 'congrats';
  congrats.textContent = '';
});

