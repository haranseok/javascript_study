// // const moreNumbers = new Array(); // []
// // const moreNumbers2 = new Array(1,2); // [1,2]

// // const moreNumber3 = Array();

// // Array.form() 은 이터러블 객체나 유사 배열 객체를 진짜 배열로 변환하기 좋다.
// // 알파벳으로 분리하고 싶은 문자열이 있다면 유용하다.

// const sttings = Array.from('hi!'); // ['h','i','!']

// // 예시

// const itemsList = document.querySelectorAll('li');

// const arrayList = Array.from(itemsList);
// console.log(arrayList); // ['li','li','li']

// // unshift() 배열의 첫 번째로 추가하고 싶은 경우

// const hobbies = ['Sports', 'Cooking'];
// hobbies.push('Reading');

// hobbies.unshift('Codding');
// // pop() 배열의 마지막에 있는 모든 항목 삭제,
// hobbies.pop();
// console.log(hobbies); // ['Codding','Sports', 'Cooking']

// // shift() 배열의 마지막에 있는 항목 삭제

// hobbies.shift();

// /**  unshift() - 배열 항목 추가 , shift() - 배열 마지막 항목 삭제
//  *  unshift()와 shift()는 push()와 pop()과 동일한 기능을 해주지만
//  */

// // splice() 배열 사아에 요소 추가.

// hobbies.splice(1, 0, 'Splice');
// // 1 : 해당 인덱스틑 포함해 확인해야하는 인덱스가 1
// // 0 : 0 위치에 지정한 만큼의 요소를 삭제한 뒤 확안히는 요소 위치에 추가 - 0이라서 아무것도 삭제하지 않음.
// //'Splice' : 배열에 추가하는 내용
// console.log(hobbies); // ['Sports','Splice', 'Cooking']

// // splice() 배열 요소 삭제
// hobbies.splice(0, 1);
// // 0 : 해당 인덱스를 포함해 확인해야 하는 인덱스가 0
// // 1 : 해당 인덱스 삭제
// // 첫번째 요소를 포함해 1개의 요소를 삭제한다.
// console.log(hobbies); // ['Splice', 'Cooking']

// hobbies.splice(0); // 배열의 모든 요소 삭제
// hobbies.splice(1); // 첫번째 배열을 제외한 모든 요소 삭제
// hobbies.splice(-1, 1); // 배열의 마지막 요소에서 시작해 1개의 요소를 삭제

//slice() - 새로운 배열을 반환하는 것으로 배열을 복사하는 가장 좋은 방법이다.

const testResults = [1, 1.5, 5.3, 1.5, 10.99, -5, 10];
// const storedResults = testResults.slice();
const storedResults = testResults.concat([3, 3.5]);

console.log(storedResults);
// concat 1개나 그 이상의 배열을 취해 storedResults 배열을 testResults 배열과 연결합니다. 새로운 중첩 배열로 추가하는 것은 아니다. concat은 배열의 데이터를 기존의 배열과 합칠 때 매우 유용하다.

testResults.push(100);

console.log(testResults, storedResults);

testResults.splice(0, 2);
// 0 : 0번 인덱스 요소 부터 ( 0번 요소 포함 )
// 2 : 2번 인덱스 전까지 요소 ( 2번 요소 미포함 )

testResults.splice(-3, -2);

// 음수 인덱스를 사용할 수 있지만, 그러면 모두 음수 인덱스 여야 한다.

console.log(testResults.indexOf(1.5));

console.log(testResults.includes(10.99)); // true

// indexOf() - 해당 값과 일치하는 인덱스를 찾게 되면 뒤에 일치하는 다른 값이 있어고 첫 번째 요소만 찾고 종료된다.

// lastIndexOf() - 오른쪽에서부터 인덱스를 찾을 때 사용

//indexOf()와 lastIndexOf()의 중요한 점은 원시 값에 관해서는 실행이 되지만 참조 값에 관해서는 실행이 안된다.
const personData = [{ name: "Max" }, { name: "Manuel" }];

console.log(personData.indexOf({ name: "Manuel" })); // -1 === false

//객체는 참조 값이므로 새 객체를 indexOf()로 보내면 indexOf의 모든 값과 personData의 모든 값을 비교하지만 두 객체는 비슷해보여도 절대 비슷하지 않다. indexOf는 객체가 있으면 실행되지 않는다.

// indexOf()가 실행되지 않는 배열에서 객체 찾기
// find() - 인수를 취하지만 다른 함수를 취하는 인수이다. / find 안에 익명 함수가 들어가는 데, 최대 3개의 인수를 넣을 수 있다. 첫 번째 인수는 배열의 단일 객체, 두 번째 인수는 단일 요소의 인덱스, 세 번째 인수는 언제나 전체 배열이 들어간다.

// find()는 객체가 있는 배열에만 국한되지 않고, 모든 배열에서 사용가능하다.
// find()는 찾으려고 하는 요소에 관해 true가 그렇지 않으면 fasle를 반환한다.
const manuel = personData.find((person, idx, persons) => {
  return person.name === "Max";
});

console.log(manuel); // { name: 'Max' }

manuel.name = "Anna";

// manuel.name = Anna로 변경 , personData에서도 Anna로 값이 변경된 것을 확인할 수 있다.
// 동일한 객체의 동일한 참조 값으로 작업하고 있기 때문에 find()는 복사를 생성하지 않는 다.
console.log(manuel, personData); // { name: 'Max' }

// findIndex() 찾고자 하는 값의 index를 반환한다.
const maxIndex = personData.findIndex((person, idx, persons) => {
  return person.name === "Max";
});

console.log(maxIndex); // 0

// includes() - 배열의 일부인지 아닌지를 확인하는 유용한 메서드로 원시값에 관해 가장 유용한 메서드이다. indexOf() 처럼 값을 확인하기 때문. true / false 표시한다.

// forEach()
// find()와 finedIndex() 처럼 함수를 취한다. 최대 3개의 인수를 취합니다.
// index에 쉽게 엑세스할 수 있는 for of 반목문의 대안으로

// const prices = [10.99, 5.99, 3.99, 6.59];
// const tax = 0.19;
// const taxAdustedPrices = [];

// prices.forEach((price, idx, prices) => {
//   const priceObj = { index: idx, taxAdustedPrice: price * (1 + tax) };
//   taxAdustedPrices.push(priceObj);
// });

// console.log(taxAdustedPrices);

// map() - forEach() 대신 배열에서 사용 가능한 특별한 메서드
// map은 배열을 취하고 모든 항목에 함수를 실행한다.
const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;

const taxAdustedPrices = prices.map((price, idx, prices) => {
  const priceObj = { index: idx, taxAdustedPrice: price * (1 + tax) };
  return priceObj;
});

console.log(taxAdustedPrices);
