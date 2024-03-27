// 0 ~ 1 사이의 난수가 출력된다.
Math.random();

// 10 ~ 20 사이의 난수가 필요할 수 있는 데 상한과 하한을 정해주면 된다.
// 부동 소수점으로 숫자가 나타나기 때문에 정확한 값을 위해서 아래와 같이 처리를 해줘야한다.

function randomIntBetween(min, max) {
  // min : 5, max: 10
  return Math.floor(Math.random() * (max - min + 1) + min); // 상한을 만족하는 수 10.9999999 => 10
  //   return Math.random() + min; // 하한을 만족하는 수
}

console.log(randomIntBetween(5, 10));
