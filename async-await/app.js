const button = document.querySelector('button');
const p = document.querySelector('p');

// Promise > async , await

const getPosition = option => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      success => {
        resolve(success);
      },
      error => {
        reject(error);
      },
      option
    );
  });
  return promise;
};

const setTimer = duration => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};

// async - 함수의 모든 내용을 하나의 큰 프로미스로 묶는다. Promise로 작성했던 것들을 async await으로 리팩토링하면서 더 간결하게 사용할 수 있다. 실행이 완료될 때까지 대기하는 것으로 보이나, 실제로는 js에서 await부분에서 then처리되어 작동되고 있다.
async function trackUserHandler() {
  //   let positionData;
  // 오류 처리
  let posData;
  let timerData;
  try {
    posData = await getPosition();
    timerData = await setTimer(2000);
  } catch (error) {
    error;
  }
  console.log(timerData, posData);

  // promise로 작성했을 때는 아래의 로직이 출력된 다음에 위에 로직이 실행되었는 데, async, await 구문은 위에 로직이 실행된 다음에 아래의 로직이 실행된다. 그 이유는 await 때문이다.
  // await은 코드 실행을 일시 중지하는 것이 아니라 내부적으로 위에 모든 단계들을 자체 then 블록으로 감싼다. 그래서 아래 코드 부분도 자체 then 블록을 가지게 되고, 위에 코드 부분이 완료되어야 실행된다.
  // 그래서 async, await 부분은 동시에 여러 작업을 실행하거나, 시작해야 하는 함수가 있거나 차례로 실행하고 싶지 않은 경우에는 좋지 않다.
  setTimer(1000).then(() => {
    console.log('Timer done!');
  });
  console.log('Getting position...');
}
button.addEventListener('click', trackUserHandler);

// race 메서드는 프로미스 배열을 받는다. 그리고 race는 가장 빠른 프로미스만 고려하기 때문에 배열로 들어간 promise 중에서 제일 빠른 값만 반환하고 다른 값은 catch로 반환된다.
// Promise.race([getPosition(), setTimer(1000)])
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// // 몇가지 promise가 완료된 후에만 실행되어야 하는 코드
// // 순서대로 각 프로미스에 의해 반환된 데이터를 가지는 배열, 하나가 취소되면 다 취소된다.
// Promise.all([getPosition(), setTimer(1000)]).then(data => {
//   console.log(data);
// });

// Promise가 한 일을 설명하는 객체
// Promise 중 하나가 실패해도 멈추지 않고 다음 작업도 진행을 한다.
// 모든 Promise가 끝날 때까지 기다리고 자세한 보고서를 얻을 수 있음.
Promise.allSettled([getPosition(), setTimer(1000)]).then(data => {
  console.log(data);
});
