// next 반복자

const company = {
  curEmployee: 0,
  employees: ["Max", "Manu", "Anna"],
  next() {
    // 꼭 next여야함.
    if (this.curEmployee >= this.employees.length) {
      return { value: this.curEmployee, done: true };
    }
    const returnValue = {
      value: this.employees[this.curEmployee],
      done: false, // 반복할 값이 더 남아있는 지 여부
    };
    this.curEmployee++;
    return returnValue;
  },

  // next의 내용을 사용하는 대신 제너레이터를 사용할
  [Symbol.iterator]: function* employeeGenerator() {
    // 루핑 논리 입력
    // let employee = company.next();

    // while (!employee.done) {
    //   yield employee.value;
    //   employee = company.next();
    // }
    let currentEmployee = 0;
    while (currentEmployee < this.employees.length) {
      yield this.employees[currentEmployee]; // yield는 return과 비슷
      currentEmployee++;
    }
  }, // next 메서드를 가진 객체여야 for of를 사용할 수 있다.
};

// 직접 생성한 반복자를 활용하는 방법

// let employee = company.next();

// while (!employee.done) {
//   console.log(employee.value);
//   employee = company.next();
// }

for (const employee of company) {
  console.log(employee);
}

// const it = company.getEmployee();

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
