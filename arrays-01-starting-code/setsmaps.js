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
const person1 = { name: 'Max' };
const person2 = { name: 'Manuel' };

const personData = new Map([[person1, [{ date: 'yesterday', price: 10 }]]]); // 배열의 배열

personData.set(person2, [{ date: 'two weeks ago', price: 100 }]);

console.log(personData);
console.log(personData.get(person1));

// 모든 key와 value에 접근
for (const [key, value] of personData.entries()) {
  console.log(key, value);
}

// key에만 접근

for (const key of personData.keys()) {
  console.log(key);
}

// value에만 접근

for (const value of personData.values()) {
  console.log(value);
}
