function randomIntBetween(min, max) {
  // min: 5, max: 10
  return Math.floor(Math.random() * (max - min + 1) + min); // 10.999999999999 => 10
}

console.log(randomIntBetween(1, 10));

function productDescription(strings, productName, productPrice) {
  console.log(strings);
  console.log(productName);
  console.log(productPrice);
  let priceCategory = 'pretty cheep regarding its price';
  if (productPrice > 20) {
    priceCategory = 'fairly priced';
  }
  // 완전한 동적 문자열을 출력해 주는 데 동적으로 생성된 문자열이 포함된 논리와 교환하는 작업이라고 할 수 있다.
  return `${strings[0]}${productName}${strings[1]}${priceCategory}${strings[2]}`;
  // return { name: productName, price: productPrice };
}

const prodName = 'JavaScript Course';
const prodPrice = 29.99;

// 함수 뒤에 바로 템플릿 리터럴을 입력할 수 있다.
const productOutput = productDescription`This product (${prodName}) is ${prodPrice}.`;
console.log(productOutput);

/** 태그드 템플릿
 *  1. 템플릿 리터럴과 함께 사용하는 함수
 *  2. 함수를 생성 > 일반 인자로는 3개의 인자를 갖는다.
 *  3. productOutput 값으로 출력된 결과물을 보면 정상적으로 함수가 출력되었다는 것을 알 수 있는 데,
 *     productDescription 함수에서 return으로 반환한 값을 productOutput 상수에 저장한다.
 *  4. 위와 같이 작성을 할 경우 입력한 내용 그대로 객체로 반환을 해주고, This product (JavaScript Course) is fairly priced.값으로 전달 리터럴 형식으로 전달 받은 내용 그대로 출력되기도 한다.
 *  5. 예를 들어 숫자인 price를 category로 인코딩할 때에 사용한 것과 같이 복잡한 논리가 있을 때에는 삼항식을 사용하는 것 보다 태그드 템플릿 함수를 이용하는 것이 더 유용하다.
 *  6. 꼭 태그드 템플릿은 문자열로만 출력하지 않고, 객체의 형태로 출력해도 오류없이 정상적으로 작동한다.
 */
