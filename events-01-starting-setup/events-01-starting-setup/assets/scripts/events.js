const eventBtns = document.querySelector("button");

// eventBtn.onclick = function () {
//   alert("test");
// };

const onButtonClickHandler = (event) => {
  //   event.target.disabled = true;
  console.log(event);
};

const anotherButtonClickHandler = () => {
  console.log("This was clicked");
};

// eventBtn.onclick = onButtonClickHandler;

const boundFn = onButtonClickHandler.bind(this);

// eventBtn.addEventListener("click", onButtonClickHandler);

// setTimeout(() => {
//   eventBtn.removeEventListener("click", onButtonClickHandler);
// }, 2000);

// eventBtns.forEach((btn) => {
//   btn.addEventListener("mouseenter", onButtonClickHandler);
// });

// 무한 스크롤

// let curElementNumber = 0;

// function scrollHandler() {
//   const distanceToBottom = document.body.getBoundingClientRect().bottom;

//   if (distanceToBottom > document.documentElement.clientHeight + 150) {
//     const newDataElement = document.createElement("div");
//     curElementNumber++;
//     newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
//     document.body.append(newDataElement);
//   }
// }

// window.addEventListener("scroll", scrollHandler);

const form = document.querySelector("form");

// submit 이벤트는 form 태그에만 존재
// submit 버튼은 클릭하면 바로 서버로 전송한다.

form.addEventListener("submit", (event) => {
  // preventDefault() 기본 동작을 제어한다.
  event.preventDefault();
  console.log(event);
});

const div = document.querySelector("div");
div.addEventListener("mouseenter", (event) => {
  console.log("CLIKCED DIV");
  console.log(event);
});

eventBtns.addEventListener("click", function (event) {
  event.stopPropagation();
  console.log("CLIKCED BUTTON");
  console.log(event);
  console.log(this);
});

const listItems = document.querySelectorAll("li");
const list = document.querySelector("ul");

// listItems.forEach((listItem) => {
//   listItem.addEventListener("click", (event) => {
//     event.target.classList.toggle("highlight");
//   });
// });

list.addEventListener("click", function (event) {
  //   console.log(event.currentTarget);
  // event.target.classList.toggle("highlight");
  event.target.closest("li").classList.toggle("highlight");
  // closest은 모든 DOM 객체에 존재하고 조상 트리를 위쪽으로 탐색

  // 이벤트를 프로그래밍을 통해 트리거하면 submit 이벤트 리스너를 건너뛰게 된다.
  //   form.submit();

  // 이 부분은 이벤트 리스너가 정상적으로 작동
  eventBtns.click();
  console.log(this); // ul : 이벤트 리스너가 등록된 태그를 가리킴.
});

// drag & drop
/**
 * dragenter는 선택, dragover는 필수
 * dragenter는 기본적으로 요소를 추가한 곳의 하위 요소들까지 크리거하고 dragenter는 히위 요소는 트리거하지 않는다. 그래서 dragover 이벤트에는 preventDefault()를 호출해야한다.
 *
 * 왜냐하면 기본 값은 드롭 작업을 취소하기 때문에 요소해 대해 drag, drop이 불가능하다.
 * 페이지의 대부분에서는 브라우저의 기본 값에선 허용되지 않기 때문에 기본 값에서 드롭 작업을 허용하도록 preventDefault를 해야한다.
 *
 *
 * dragover된 요소로부터 아이템이 드래그될 때 ui나 스타일을 업데이트하기를 원하는 경우에 dragleave를 활용한다.
 *
 * drop에서는 데이터 ui를 업데이트하거나 ui 위에서 요소를 이동하는 등의 모든 것이 가능하다.
 *
 * 드래그 앤 드롭을 하는 경우 실제 DOM은 업데이트되지 않으나 DOM도 업데이트하고 싶다면 프로그래밍으로 자바스크립트에서 작업해야하는 부분이다.
 *
 * dragend
 * 드롭된 곳에서가 아니라 드래그된 요소 자체에서 가능하며 UI나 데이터 업데이트등의 원하는 작업을 할 수 있다. 드롭이 취소되어도 늘 작동하기 때문에 요소가 유효하지 않은 곳에서도 활용 가능하다.
 */
