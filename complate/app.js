// Library land

const uid = Symbol("uid");
console.log(uid);

const user = {
  //   id: "p1",
  [uid]: "p1",
  name: "Max",
  age: 30,
  [Symbol.toStringTag]: "user object",
};

// 라이브러리를 구축한다고 가정하면 다른 개발자가 사용할 때, 변화되면 안되는 값이 있을 수 있는 데, 그 값을 Symbol로 설정한다.

// app land => Using the library

user.id = "p2";

console.log(user[Symbol("uid")]); // undefined
console.log(Symbol("uid") === Symbol("uid")); // false
/**Symbol
 * 실수로 재정의 될 수 없는 유일한 식별자를 가지고, 정확히 같은 심볼을 사용할 경우에만 라이브러리 내부에서 심볼에 액세스하면 변경할 수 있다.
 * **/

user[uid] = "p3"; // 동일한 심볼이라서 변경하능
console.log(user.toString()); // 변경된 값이 출력
