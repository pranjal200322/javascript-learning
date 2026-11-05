// Day 9 — Scope, Hoisting, Closures & this
// Run: node Day9/examples.js

console.log("\n1. Block scope");

const course = "JavaScript";

if (true) {
  const topic = "Scope";
  let day = 9;
  console.log(course, topic, day);
}

console.log("Course outside the block:", course);
// topic and day are block-scoped and cannot be accessed here.


console.log("\n2. var is function-scoped");

function showVarScope() {
  if (true) {
    var message = "I can be read outside this block";
  }

  console.log(message);
}

showVarScope();


console.log("\n3. Lexical scope and shadowing");

const role = "user";

function showRoles() {
  const role = "admin"; // Shadows the outer role.
  const permission = "edit";

  console.log("Inner role:", role);
  console.log("Outer role is still:", permission);
}

showRoles();
console.log("Outer role:", role);


console.log("\n4. Hoisting with var");

console.log("score before assignment:", score); // undefined
var score = 90;
console.log("score after assignment:", score);

// Accessing a let/const variable before its declaration would throw
// a ReferenceError because it is in the Temporal Dead Zone.


console.log("\n5. Function declaration hoisting");

sayHello();

function sayHello() {
  console.log("Hello from a function declaration");
}


console.log("\n6. Closure: a private counter");

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const firstCounter = createCounter();
console.log(firstCounter()); // 1
console.log(firstCounter()); // 2
console.log(firstCounter()); // 3

const secondCounter = createCounter();
console.log(secondCounter()); // 1 (separate closure)


console.log("\n7. Closure: function factory");

function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15


console.log("\n8. this in an object method");

const person = {
  name: "Riya",

  greet() {
    console.log("Hello, " + this.name);
  }
};

person.greet(); // this refers to person for this method call.


console.log("\n9. Explicit this with call()");

function introduce(city) {
  return this.name + " lives in " + city;
}

const user = { name: "Aman" };
console.log(introduce.call(user, "Lucknow"));


console.log("\n10. Arrow callback inherits this");

const team = {
  name: "Film Club",
  members: ["Asha", "Kabir"],

  showMembers() {
    this.members.forEach((member) => {
      console.log(member + " is in " + this.name);
    });
  }
};

team.showMembers();
