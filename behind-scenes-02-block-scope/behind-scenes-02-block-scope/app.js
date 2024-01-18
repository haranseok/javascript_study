// let name = "Max";

// if (name === "Max") {
//   let hobbies = ["Sports", "Cooking"];
//   console.log(hobbies);
// }

// function greet() {
//   let age = 30;
//   let name = "Manuel";
//   console.log(name, age, hobbies);
// }

// console.log(name, hobbies)

// greet()

// 엄격 모드

// "use strict";
// // 스크립트 최상단에 use strict라고 작성하면 엄격 모드가 동작해 정상적으로 작동하던 아래의 var undefined = 5 가 작동되지 않는 것을 확인할 수 있다.

// const userName = "Max";
// var undefined = 5;
// console.log(userName);

function getName() {
  return prompt("Your name: ", "");
}

function greet() {
  const userName = getName();
  console.log("Hello " + userName);
}

greet();
