function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function multiply (a, b){
    return a * b;
}
function divide (a, b){
    if (b === 0){
        return '###'
    }
    return a / b;
}

function roundNumber(num, decimals) {
    return Number(num.toFixed(decimals));
}

let firstNumber = null;
let operator = null;
let waitSecondNumber = false;
let displayValue = '0';

function updateDisplay(value){
    const display = document.getElementById('display').querySelector('h1');
    display.textContent = value;
}

function handleNumber(number){
    if(waitSecondNumber){
        displayValue = number;
        waitSecondNumber = false;
    }
    else {
        if (displayValue === '0'){
            displayValue = number
        }
        else {
            displayValue += number;
        }
    }

    if (operator){
        updateDisplay(`${firstNumber} ${operator} ${displayValue}`);
    }
    else{
        updateDisplay(displayValue);
    }
}

function handleDecimal (){
    if(!displayValue.includes('.')){
        displayValue += '.';
        updateDisplay(displayValue);
    }
}



function handleOperator (op){
    if (operator && !waitSecondNumber){
        displayValue = operate(operator, firstNumber, parseFloat(displayValue)).toString();
        firstNumber = parseFloat(displayValue);
    }
    else {
        firstNumber = parseFloat(displayValue);
    }
    
    operator = op;
    waitSecondNumber = true;

    updateDisplay(`${firstNumber} ${operator}`);
}

function handleDelete(){
    displayValue = displayValue.slice(0, -1) || '0';
    updateDisplay(displayValue);
}

function handleClear (){
    firstNumber = null;
    operator = null;
    displayValue = '0';
    waitingForSecondNumber = false;
    updateDisplay(displayValue);
}

function handleEqual (){
    if (operator && firstNumber != null) {
        displayValue = operate(operator, firstNumber, parseFloat(displayValue)).toString();
        updateDisplay(displayValue);

        firstNumber = null;
        operator = null;
        waitSecondNumber = false;
    }
}

function operate (operator, firstNumber, secondNumber){
    let result;
    switch (operator){
        case '+':
            result = add(firstNumber, secondNumber);
            break;
        case '-':
            result = subtract(firstNumber,secondNumber);
            break;
        case '*':
            result = multiply(firstNumber,secondNumber);
            break;
        case '/':
            result = divide(firstNumber,secondNumber);
            break;
        default:
            result = secondNumber;
    }
    return roundNumber(result, 10);
}

function handleKeyPress(event) {
    const {key} = event;
    if (key >= '0' && key <= '9'){
        handleNumber(key);
    }
    else if (key === '.'){
        handleDecimal();
    }
    else if (key === '+' || key === '-' || key === '*' || key === '/'){
        handleOperator(key);        
    }
    else if (key === 'Enter'){
        handleEqual();
    }
    else if (key === 'Backspace'){
        handleDelete();
    }
    else if (key === 'Escape'){
        handleClear();
    }
}
window.addEventListener('keydown', handleKeyPress);
document.getElementById('decimal-button').addEventListener('click', handleDecimal);