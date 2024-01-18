const addListenerBtn = document.getElementById("add-listener-btn");
const clickableBtn = document.getElementById("clickable-btn");
const messageInput = document.getElementById("click-message-input");

let person = { name: "Max" };

person = null;
// person 변수에 새로운 값을 할당하면 처음 변수에 담긴 객체가 더이상 참조하고 있지 않는 지 확안하고 가비지 컬렉터가 힙에서 객체를 제거한다.

// 즉각적으로 실행되는 것이 아니고 알고리즘과 논리를 실행해 자체 스케쥴에 따라 참조하지 않는 객체를 발견하고 메모리에서 제거할 것이다.

function printMessage() {
  const value = messageInput.value;
  console.log(value || "Clicked me!");
}

function addListener() {
  clickableBtn.addEventListener("click", printMessage);
}

addListenerBtn.addEventListener("click", addListener);
