// Day 5 — Functions in JavaScript
// Run from the repository root: node Day5/examples.js

console.log("--- 1. Function declaration and function call ---");

function sayHello() {
  console.log("Hello, JavaScript!");
}

sayHello();
sayHello(); // A function can be called more than once.

console.log("--- 2. Parameters and arguments ---");

function greet(name) {
  console.log("Hello, " + name);
}

greet("Pranjal"); // "Pranjal" is the argument.

function add(a, b) {
  console.log("Sum:", a + b);
}

add(10, 20);

console.log("--- 3. Returning a value ---");

function multiply(a, b) {
  return a * b;
}

const product = multiply(4, 5);
console.log("Product:", product); // 20

console.log("--- 4. console.log is not the same as return ---");

function printDifference(a, b) {
  console.log("Difference:", a - b);
  // No return statement: JavaScript returns undefined automatically.
}

const result = printDifference(9, 4);
console.log("Stored result:", result); // undefined

console.log("--- 5. Default parameter ---");

function welcome(name = "Guest") {
  return "Welcome, " + name;
}

console.log(welcome()); // Welcome, Guest
console.log(welcome("Aman")); // Welcome, Aman

console.log("--- 6. Function expression ---");

const getSquare = function (number) {
  return number * number;
};

console.log("Square:", getSquare(6)); // 36

console.log("--- 7. Arrow function ---");

const subtract = (a, b) => {
  return a - b;
};

const isEven = number => number % 2 === 0;

console.log("Subtraction:", subtract(15, 7)); // 8
console.log("Is 12 even?", isEven(12)); // true
console.log("Is 9 even?", isEven(9)); // false

console.log("--- 8. Implicit return in an arrow function ---");

const double = number => number * 2;

console.log("Double:", double(11)); // 22

console.log("--- 9. Early return ---");

function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero";
  }

  return a / b;
}

console.log(divide(20, 4)); // 5
console.log(divide(20, 0)); // Cannot divide by zero
