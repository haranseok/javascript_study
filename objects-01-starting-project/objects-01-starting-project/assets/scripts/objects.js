let person = {
  name: "Max",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  greet: function () {
    alert("Hi there");
  },
};

person.isAdmin = true;

delete person.age; // 객체 속성 지우기

console.log(person);

// person.age = null; // 지금 당장은 없지만 나중에 age에 또 다른 값을 설정한다는 의미
// delete person.age; // age라는 프로퍼티 자체가 불필요하다는 것을 의미

//undefined는 개발자가 직접 할당해서는 안되는 존재
// null은 리셋할 때 사용할 수 있다.

//특수 키 이름 & 대괄호 프로퍼티 엑세스
// 키는 변수보다 유연한 특성을 갖는다. 즉, 변수에 사용할 수 있는 이름을 키로 사용할 수 있으나, 키의 이름은 모두 다 변수에 사용할 수 있는 것은 아니다.

let person2 = {
  "first-name": "Max", // javascript에서 이런 방식은 사용할 수 없지만 이 값이 키 값이고 문자열에 불과하다고 알려주면 사용 가능한데 따옴표로 묶어주면 된다. 객체에 한해서 가능
  age: 30,
  hobbies: ["Sports", "Cooking"],
  greet: function () {
    alert("Hi there");
  },
};

// 호충하는 방법

console.log(person2["first name"]); // 객체에도 배열처럼 대괄호를 사용해서 안에 있는 값을 가지고 올 수 있는 데, index 형태로 가지고 올 수 있는 것은 아니도 문자열로 사용해야 가능하다.
