// 순수 함수
function add(num1, num2) {
  return num1 + num2;
}

console.log(add(1, 5)); // 6
console.log(add(10, 15)); // 25

// 비순수 함수 / 부수 효과
/**
 * 함수의 외부를 바꿔놓는 것을 의미하는 용어로 HTTP 요청일 수 도 있고, 데이터 베이스에 저장된 데이터일 수 도 있다. 또는 계속 변하는 변수처럼 더 사소한 것 일 수 있다.
 */

function addRandom(num1) {
  return num1 + Math.random();
}

console.log(addRandom(5));

let previousResult = 0;

// 아래 함수는 비순수 함수 = 부수 효과를 만들어 내기 때문.
function addMoreNumbers(num1, num2) {
  //부수 효과는 덧셈에 포함되지않는다. 왜냐하면 함수의 일부인 상수에 저장됐기 때문이다.
  const sum = num1 + num2;
  previousResult = sum; // 부수 효과가 일어난 지점 - 외부에서 변수를 설정하고 안에서 처리
  return sum;
}

console.log(addMoreNumbers(1, 5));

// 함수의 또 다른 부수 효과인 함수에 들어가는 객체나 배열을 바꾸는 것

const hobbies = ["Sports", "Cooking"];

function printHobbies(h) {
  // 배열은 객체이고 객체는 참조 값이라서 이 배열을 바꾸면 기존의 배열도 바뀐다. 왜냐하면 매개변수로 전달받는 값이 배열의 복사본이 아니고 배열의 주소 복사본이기 때문이다.
  // 함수의 내부를 바꾸면 외부도 바꿔야 한다. 이것이 부수 효과
  h.push("NEW HOBBY");
  console.log(h);
}

printHobbies(hobbies);

// 비순수 vs 순수 함수
// 부수 효과가 있는 함수라는 것은 함수 명을 통해서 명확하게 작성하는 것이 좋다.
//function sendDataToServer(){} //  부수 효과로서 http 요청을 한다는 것을 알 수 있다.

/** 팩토리 함수
 * 기본적으로 또 다른 함수를 제공하는 함수
 * 여러번 호출되는 함수가 있을 때, 어떤 방식으로 사전에 설정하여 쉽게 호출할 수 있다. 계속해서 반복적으로 작성할 필요 없이..두번째 인자는 항상 같을 거기 때문이다.
 *
 */

function createTaxCalculator(tax) {
  function calculateTax(amount) {
    return amount * tax;
  }

  return calculateTax; // 함수의 포인터 - 사전 설정된 내부 함수
}

const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

console.log(calculateIncomeTaxAmount(100));
console.log(calculateIncomeTaxAmount(200));
