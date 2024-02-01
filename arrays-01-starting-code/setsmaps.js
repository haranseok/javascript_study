// // Sets - 이미 사용하고 있는 아이디 값을 찾을 때 유용함
// // ID로 이뤄진 Sets
// const ids = new Set([1, 2, 3]); // 빈 set

// console.log(ids.has(1)); //true - boolean 값으로 반환

// // 값을 추가하려고 할 경우

// ids.add(2); // 이미 가지고 있는 값이기 때문에 더이상 값이 들어가지 않는 다. 왜냐하면 set 안에 있는 값은 고유한 것이 보장되기 때문이다.
// console.log(ids);
// ids.entries();

//Maps
// Maps를 사용하는 경우는 아래에 있는 각 사람의 정보에 몇 가지 정보를 더 추가하고 싶지만, 정보를 객체와 병합하고 싶지않은 경우에 사용한다.
// const person1 = { name: 'Max' };
// const person2 = { name: 'Manuel' };

// const personData = new Map([[person1, [{ date: 'yesterday', price: 10 }]]]); // 배열의 배열

// personData.set(person2, [{ date: 'two weeks ago', price: 100 }]);

// console.log(personData);
// console.log(personData.get(person1));

// // 모든 key와 value에 접근
// for (const [key, value] of personData.entries()) {
//   console.log(key, value);
// }

// // key에만 접근

// for (const key of personData.keys()) {
//   console.log(key);
// }

// // value에만 접근

// for (const value of personData.values()) {
//   console.log(value);
// }

//WeakSet
// 객체인 배열을 저장할 수 있지만, 숫자나 문자열은 저장할 수 없다.
// weakSet의 메서드를 살펴보면 add, delete, has는 있지만 모든 엔트리를 가지고 올 수 있는 메서드는 없다. 그 이유는 weakset 을 이용했을 때 내부적으로만 객체를 저장할 수 있으므로 실제로는 해당 객체를 지우는 거다. > 가비지 컬렉션으로 내보내는 거라고 할 수 있다. 특정 데이터를 더 이상 이용하지 않는 경우에 사용한다. 이 기능이 필요한 이유는 Set 이나 다른 배열에 객체 데이터를 저장하는 경우 데이터를 더이상 사용하지 않을 때 해당 변수에 null을 넣어주면 이 객체는 더이상 아무런 의미를 가지지 않게 된다. 주소를 저장한 person 변수가 null로 설정되어 해당 주소가 해제되고 자바스크립트 엔진이 null이라는 사실을 인식해서 힙으로 부터 객체를 삭제한다. 이게 메모리에서 데이터를 삭제하는 가비지 컬렉션의 일이다. 일반적인 Set을 사용할 수 있지만 null로 지정해서 없는 셈 치더라도 자바스크립트 엔진은 객체를 지우지 않고 둔다. 사용자가 이 변수를 다시 사용할 것 이라고 판단하고 지우지 않는 것이다. 불필요한 데이터가 남게 되는 것..

let person = { name: 'Max' };
const persons = new WeakSet(); // 빈 set
// person = null
persons.add(person);

// WeakMap

let personData = new Map();
