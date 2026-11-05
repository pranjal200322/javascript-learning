// Day 9 — Questions followed by solutions
// Run: node Day9/questions.js

// Q1. What will this print? Explain why the inner variable is accessible
// only inside the block.
//
// const subject = "JavaScript";
// if (true) {
//   const chapter = "Scope";
//   console.log(subject, chapter);
// }
// console.log(subject);


// Solution 1
const subject = "JavaScript";

if (true) {
  const chapter = "Scope";
  console.log(subject, chapter); // JavaScript Scope
}

console.log(subject); // JavaScript
// console.log(chapter); // ReferenceError: chapter is block-scoped.


// Q2. What will this print, and why can message be accessed after the if block?
//
// if (true) {
//   var message = "Hello";
// }
// console.log(message);


// Solution 2
if (true) {
  var message = "Hello";
}

console.log(message); // Hello
// var is function-scoped (or module/global scoped outside a function),
// not block-scoped.


// Q3. Predict both outputs. Which role is printed inside showRole()?
//
// const role = "viewer";
// function showRole() {
//   const role = "editor";
//   console.log(role);
// }
// showRole();
// console.log(role);


// Solution 3
const role = "viewer";

function showRole() {
  const role = "editor";
  console.log(role); // editor
}

showRole();
console.log(role); // viewer
// The inner role shadows the outer role only inside showRole().


// Q4. What is the value printed before the assignment?
//
// console.log(total);
// var total = 25;


// Solution 4
console.log(total); // undefined
var total = 25;
// The var declaration is hoisted and initialized as undefined.
// The assignment happens at its original position.


// Q5. Why does the following code throw a ReferenceError if the first
// console.log is uncommented?
//
// console.log(points);
// let points = 40;


// Solution 5
// let and const declarations are in the Temporal Dead Zone until
// execution reaches their declaration. Keep the failing line commented.
// console.log(points); // ReferenceError if executed before declaration.
let points = 40;
console.log(points); // 40


// Q6. Complete createCounter() so each call increases and returns
// the same private count. What are the next three outputs?
//
// const counter = createCounter();
// console.log(counter());
// console.log(counter());
// console.log(counter());


// Solution 6
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// The returned function closes over the count variable.


// Q7. What does this refer to when person.greet() is called?
//
// const person = {
//   name: "Neha",
//   greet() {
//     return this.name;
//   }
// };
// console.log(person.greet());


// Solution 7
const person = {
  name: "Neha",
  greet() {
    return this.name;
  }
};

console.log(person.greet()); // Neha
// The regular function is called as person.greet(), so this is person.


// Q8. Why does the arrow callback below print the team's name correctly?
//
// const team = {
//   name: "Readers",
//   members: ["Ira", "Dev"],
//   show() {
//     this.members.forEach((member) => {
//       console.log(member, this.name);
//     });
//   }
// };
// team.show();


// Solution 8
const team = {
  name: "Readers",
  members: ["Ira", "Dev"],

  show() {
    this.members.forEach((member) => {
      console.log(member, this.name);
    });
  }
};

team.show();
// The arrow callback has no own this. It inherits this from show(),
// where the method call team.show() makes this refer to team.


// Q9. Create a function makeGreeter(greeting) that returns a function.
// The returned function should accept a name and return a greeting.


// Solution 9
function makeGreeter(greeting) {
  return function (name) {
    return greeting + ", " + name + "!";
  };
}

const sayWelcome = makeGreeter("Welcome");
console.log(sayWelcome("Aarav")); // Welcome, Aarav!
