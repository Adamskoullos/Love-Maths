// add event listener to prevent the game from being active until the DOM has loaded.
// Add event listeners to the buttons

document.addEventListener('DOMContentLoaded', function(){
    // grab buttons
    let buttons = document.getElementsByTagName('button');
    // add event listener to each  button
    for (let button of buttons){
        button.addEventListener('click', function(){
            if (this.dataset.type === 'submit'){
                checkAnswer();
            } else {
                let gameType = this.dataset.type;
                runGame(gameType);
            }
        });
    }
    runGame('addition');
})

// define functions

// generate two random numbers between 1-25
function runGame(gameType){
// floor rounds down to nearest int
// random gives number between 0-1
  let num1 = Math.floor(Math.random()*25)+1;
  let num2 = Math.floor(Math.random()*25)+1;
  if (gameType === 'addition'){
      displayAdditionQuestion(num1, num2);
  } else if (gameType === 'subtract'){
      displaySubtractionQuestion(num1, num2);  
  } else if (gameType === 'multiply'){
      displayMultiplyQuestion(num1, num2);  
  } else if (gameType === 'division'){
      displayDivisionQuestion(num1, num2);  
  } else {
      alert(`Unkown game type ${gameType}`);
      throw `Unkown game type ${gameType}, aborting!`;
  }
}

function checkAnswer(){
    // Grab user answer input value
    let userAnswer = parseInt(document.querySelector('#answer-box').value);
    // Grab the returned answer from the calculateAnswer function (returns an array)
    let answer = calculateAnswer();
    // Create true or false variable to use in the if statement (can just use the condition)
    let isCorrect = userAnswer === answer[0];
    if (isCorrect){
        alert('Hey! You got it right!');
        incrementScore();
    } else {
        alert(`You answered ${userAnswer}. The correct answer is ${answer[0]}.`);
        incrementWrongAnswer();
    }
    // run new game, the [1] gives a value of the game type in this case 'addition'
    runGame(answer[1]);
}

function calculateAnswer(){
    // Grabs operands and operator from DOM
    let operand1 = parseInt(document.querySelector('#operand1').innerText);
    let operand2 = parseInt(document.querySelector('#operand2').innerText);
    let operator = document.querySelector('#operator').innerText;

    if (operator === '+'){
        return [operand1 + operand2, 'addition'];
    } else if (operator === '-'){
        return [operand1 - operand2, 'subtract'];
    } else if (operator === '*'){
        return [operand1 * operand2, 'multiply'];
    } else if (operator === '/'){
        return [operand1 / operand2, 'division'];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}, aborting!`;
    }
}

function incrementScore(){
    // Grab score and turn into integer 
    let score = parseInt(document.querySelector('#score').innerText);
    // set the score value in the SPAN tag within the DOM 
    document.querySelector('#score').innerText = ++score;
}

function incrementWrongAnswer(){
    // Grab incorrect score and turn into integer 
    let incorrectScore = parseInt(document.querySelector('#incorrect').innerText);
    // set the incorrect score value in the SPAN tag within the DOM 
    document.querySelector('#incorrect').innerText = ++incorrectScore;
}

function displayAdditionQuestion(operand1, operand2){
    document.querySelector('#operand1').textContent = operand1;
    document.querySelector('#operand2').textContent = operand2;
    document.querySelector('#operator').textContent = '+';
}

function displaySubtractionQuestion(operand1, operand2){
    document.querySelector('#operand1').textContent = operand1;
    document.querySelector('#operand2').textContent = operand2;
    document.querySelector('#operator').textContent = '-';
}


function displayMultiplyQuestion(operand1, operand2){
    document.querySelector('#operand1').textContent = operand1;
    document.querySelector('#operand2').textContent = operand2;
    document.querySelector('#operator').textContent = '*';
}

function displayDivisionQuestion(operand1, operand2){
    document.querySelector('#operand1').textContent = operand1;
    document.querySelector('#operand2').textContent = operand2;
    document.querySelector('#operator').textContent = '/';
}