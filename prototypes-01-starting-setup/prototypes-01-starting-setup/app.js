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

  greet = () => {
    console.log("btn");
    console.log(
      "Hi, I am " + this.name + " and I am " + this.age + " years old"
    );
  };
}

// function Person() {
//   this.age = 30;
//   this.name = "Max";
// }

// Person.prototype.greet = function () {
//   console.log("Hi, I am " + this.name + " and I am " + this.age + " years old");
// };

// Person.prototype = {
//   printAge() {
//     console.log(this.age);
//   },
// };

// const person = new Person();
// const person2 = new Person();
// // person.greet();
// console.log(person.prototype === person2.prototype);

// const button = document.getElementById("btn");
// button.addEventListener("click", person.greet());

/** 275
 * 객체 생성 이후 프로토타입을 변경할 경우 또는 어떤 이유에서든 constructor 함수 없이 새로운 객체를 생성한 뒤 다른 종류의 프로토타입을 설정하려면 어떻게 해야하나?
 *
 */

const course = {
  // new Object()
  title: "JavaSctipt - The Complete Guide",
  rating: 5,
};

// console.log(Object.getPrototypeOf(course));

// setPrototypeOf는 두 개의 매개변수를 받는다. 하나는 객체이고 하나는 사용할 프로토타입니다.
Object.setPrototypeOf(course, {
  //   ...Object.getPrototypeOf(course),
  printRating: function () {
    console.log(`${this.rating}/5`);
  },
});

const student = Object.create(
  {
    // 여기에 매개변수로 전달되는 객체는 이 초기 객체의 프로토타입으로 설정되게 된다.
    printProgress: function () {
      console.log(this.progress);
    },
  },
  {
    name: {
      configurable: true,
      enumerable: true,
      value: "Max",
      writable: false,
    },
  }
); // 객체를 초기화하는 것이 아닌 비어있는 객체를 생성

// student.name = "Max";
Object.defineProperties(student, "progress", {
  configurable: true,
  enumerator: true,
  value: 0,
  writable: false,
});

student.printProgress();
console.log(student); // 빈 객체이지만 prototype으로 printProgress는 출력된다.
course.printRating();
