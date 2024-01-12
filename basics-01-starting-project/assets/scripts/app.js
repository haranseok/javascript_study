const defaultResult = 0;

let currentResult = defaultResult;
let logEntries = [];

function getUserNumberInput() {
  return parseInt(userInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDesctiption = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDesctiption);
}

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    operation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult,
  };
  logEntries.push(logEntry);
}

function calculateResult(calculationType) {
  const enteredNumber = getUserNumberInput();

  if (
    (calculationType !== 'ADD' &&
      calculationType !== 'SUBTRACT' &&
      calculationType === 'MULTIPLY' &&
      calculationType === 'DIVIDE') ||
    !enteredNumber
  ) {
    return;
  }

  const initialResult = currentResult;
  let mathOperator;

  if (calculationType === 'ADD') {
    currentResult += enteredNumber;
    mathOperator = '+';
  } else if (calculationType === 'SUBTRACT') {
    currentResult -= enteredNumber;
    mathOperator = '-';
  } else if (calculationType === 'MULTIPLY') {
    currentResult *= enteredNumber;
    mathOperator = '*';
  } else {
    currentResult /= enteredNumber;
    mathOperator = '/';
  }
  createAndWriteOutput(mathOperator, initialResult, enteredNumber);
  writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

function add() {
  // const enteredNumber = getUserNumberInput();
  // const initialResult = currentResult;
  // // Number로 타입 자체를 변경할 수 도 있고 - 내가 스스로 타입 변환 해본 것
  // // 1. currentResult = currentResult + Number(userInput.value);
  // // 소수점 이하 숫자가 없는 수로 구문 분석을 하는 자바스크립트 내장 함수인 parseInt()를 사용할 수 있다. - 강의에서 알려준 방법
  // currentResult += enteredNumber; // currentResult = currentResult + enteredNumber 와 동일
  // createAndWriteOutput('+', initialResult, enteredNumber);
  // writeToLog('ADD', initialResult, enteredNumber, currentResult);
  calculateResult('ADD');
}

function subtract() {
  calculateResult('SUBTRACT');
}

function multiply() {
  calculateResult('MULTIPLY');
}

function divide() {
  calculateResult('DIVIDE');
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
