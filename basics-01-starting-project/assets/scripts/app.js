const defaultResult = 0;

let currentResult = defaultResult;

function getUserNumberInput() {
  return parseInt(userInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDesctiption = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDesctiption);
}

function add() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  // Number로 타입 자체를 변경할 수 도 있고 - 내가 스스로 타입 변환 해본 것
  // 1. currentResult = currentResult + Number(userInput.value);
  // 소수점 이하 숫자가 없는 수로 구문 분석을 하는 자바스크립트 내장 함수인 parseInt()를 사용할 수 있다. - 강의에서 알려준 방법
  currentResult = currentResult + enteredNumber;
  createAndWriteOutput("+", initialResult, enteredNumber);
}

function subtract() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult = currentResult - enteredNumber;
  createAndWriteOutput("-", initialResult, enteredNumber);
}

function multiply() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult = currentResult * enteredNumber;
  createAndWriteOutput("*", initialResult, enteredNumber);
}

function divide() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult = currentResult / enteredNumber;
  createAndWriteOutput("/", initialResult, enteredNumber);
}

addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
