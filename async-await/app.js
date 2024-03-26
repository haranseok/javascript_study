const button = document.querySelector('button');
const p = document.querySelector('p');

function trackUserHandler() {
  console.log('clicked!');
  navigator.geolocation.getCurrentPosition(
    posData => {
      setTimeout(() => {
        console.log(posData);
      }, 2000);
    },
    error => {
      console.log(error);
    }
  ); // 사용자의 위치 추적 - 허용여부 확인하는 팝업창이 뜸.
  setTimeout(() => {
    console.log('Done');
  }, 0);
  // 타이머를 0으로 설정해도 Getting position이 콘솔창에 먼저 출력된다.
  // 왜냐하면 타이머를 브라우저에 넘긴 후 콜백 함수를 실행하기 위애서는 매번 메세지 대기열과 이벤트 루프에 대한 경로를 찾기 때문이다. setTimeout에 설정된 시간 0은 0초로 바로 실행된다는 보장된 시간이 아닌 최소 시간이라는 것을 인지해야 한다.
  console.log('Getting position...');
  // clicked > Getting... > Done > posData 순으로 콘솔창에 출력
}
button.addEventListener('click', trackUserHandler); // 비동기 테스크

// 이벤트가 발생할 때까지 다음 코드의 실행을 차단하지 않고, 아래 for문을 동작시킨다. 그리고 버튼을 클릭해도 console.log에 result가 실행되고 난 이후에 clicked라는 값이 출력된다.

// let result = 0;
// for (let i = 0; i < 10000000; i++) {
//   result += i;
// }

// console.log(result);
