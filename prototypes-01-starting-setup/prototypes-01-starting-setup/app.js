class AgedPerson {
  printAge() {
    console.log(this.age);
  }
}

class Person extends AgedPerson {
  name = "Max";

  // 생성자
  constructor() {
    super();
    this.age = 30;
  }

  greet() {
    console.log(
      "Hi, I am " + this.name + " and I am " + this.age + " years old"
    );
  }
}

// function Person() {
//   this.age = 30;
//   this.name = "Max";
//   this.greet = function () {
//     console.log(
//       "Hi, I am " + this.name + " and I am " + this.age + " years old"
//     );
//   };
// }

// Person.prototype = {
//   printAge() {
//     console.log(this.age);
//   },
// };

const person = new Person();

person.greet();
console.log(person.__proto__);
