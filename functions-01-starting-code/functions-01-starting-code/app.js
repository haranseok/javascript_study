const startGameBtn = document.getElementById("start-game-btn");

// 조건문을 걸기 위해 오타가 있으면 안된다. 그래서 상수로 설정을 해주는 것이 좋고, 개발자가 임의로 설정한 변하지 않는 값인 경우엔 대문자로 작성하는 것이 일반적이다.

const ROCK = "바위";
const PAPER = "보";
const SCISSORS = "가위";
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";

let gameIsRunning = false;

const getPlayerChoice = function () {
  const selection = prompt(
    `${PAPER}, ${ROCK}, ${SCISSORS} 중 선택할 것은?`,
    ""
  );
  if (selection !== SCISSORS && selection !== ROCK && selection !== PAPER) {
    alert(
      `유효하지 않은 답변으로 기본 값인 ${DEFAULT_USER_CHOICE}가 입력됩니다.`
    );
    return DEFAULT_USER_CHOICE;
  }
  return selection;
};

const getComputerChoice = function () {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = (cChoice, pChoice) => {
  return cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoise === PAPER) ||
      (cChoice === SCISSORS && pChoice === ROCK) ||
      (cChoice === PAPER && pChoice === SCISSORS)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;

  //   if (cChoice === pChoice) {
  //     return RESULT_DRAW;
  //   } else if (
  //     (cChoice === ROCK && pChoise === PAPER) ||
  //     (cChoice === SCISSORS && pChoice === ROCK) ||
  //     (cChoice === PAPER && pChoice === SCISSORS)
  //   ) {
  //     return RESULT_PLAYER_WINS;
  //   } else {
  //     return RESULT_COMPUTER_WINS;
  //   }
};

startGameBtn.addEventListener("click", function () {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log("Game is starting...");
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  const winner = getWinner(computerChoice, playerChoice);
  let message = `You Picked ${playerChoice}, computer picked ${computerChoice}, therefore you `;
  if (winner === RESULT_DRAW) {
    message = message + "had a draw.";
  } else if (winner === RESULT_PLAYER_WINS) {
    message = message + "won.";
  } else {
    message = message + "lost.";
  }
  alert(message);
  gameIsRunning = false;
});

// not related to game

const combine = (resultHandler, operation, ...numbers) => {
  const validationNumber = (number) => {
    return isNaN(number) ? 0 : number;
  };
  let sum = 0;
  for (const num of numbers) {
    if (operation === "ADD") {
      sum += validationNumber(num);
    } else {
      sum -= validationNumber(num);
    }
  }
  resultHandler(sum);
};

// const subtractUp = function (resultHandler, ...numbers) {
//   let sum = 0;
//   for (const num of numbers) {
//     sum -= num;
//   }
//   resultHandler(sum, "The result after adding all numbers is");
// };

const showResult = (messageText, result) => {
  alert(messageText + " " + result);
};

// bind는 새로운 함수를 생성해준다. 즉시 실행되지 않는 함수를 생성
combine(
  showResult.bind(this, "The result after adding all numbers is"),
  "ADD",
  1,
  5,
  10,
  -3,
  6,
  10
);
combine(
  showResult.bind(this, "The result after subracting all numbers is"),
  "SUBTRACK",
  1,
  5,
  10,
  -3,
  6,
  10,
  55
);

// bind()
