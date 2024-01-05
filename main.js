/* 텍스트 내용에 따라 timeline의 div의 높이가 달라지니 텍스트의 양이 제일 많은 div 높이로 height 설정
 * css로 하나하나 작성해주지 않아도 높이를 동적으로 일정하게 유지할 수 있다.
 **/
const target = document.querySelectorAll(".timeline li div");

// 페이지가 로드되면 바로 함수를 실행

window.addEventListener("load", init);

function init() {
  setEqualHeight(target);
}

function setEqualHeight(el) {
  let initHeight = 0;
  for (let i = 0; i < target.length; i++) {
    // 높이 구하기 - target 변수를 for문으로 돌면서 offsetHeight로 해당 el의 높이를 구하고, 제일 height가 높은 div의 height 기준에 높이를 맞춘다.
    let tallestHeight = el[i].offsetHeight;
    if (initHeight < tallestHeight) {
      initHeight = tallestHeight;
    }
  }
  // target array 안을 반복적으로 돌면서 target 변수에 담긴 select 모두에게 높이를 설정해준다.
  for (let item of target) {
    item.style.height = `${initHeight}px`;
  }
}
