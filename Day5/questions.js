// Day 5 — Functions in JavaScript
// Run from the repository root: node Day5/questions.js
//
// Try predicting or solving each question before reading its solution.

console.log("--- Question 1 ---");

// Q1. Create a function greet(name) that returns "Hello, <name>!".
//     Call it with "Riya" and print the returned value.

// Solution:
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Riya"));

console.log("--- Question 2 ---");

// Q2. Create a function add(a, b) that returns the sum of two numbers.
//     Store add(12, 8) in a variable and print it.

// Solution:
function add(a, b) {
  return a + b;
}

const sum = add(12, 8);
console.log(sum); // 20

console.log("--- Question 3 ---");

// Q3. Create a function isEven(number) that returns true for an even
//     number and false for an odd number.

// Solution:
function isEven(number) {
  return number % 2 === 0;
}

console.log(isEven(14)); // true
console.log(isEven(9)); // false

console.log("--- Question 4 ---");

// Q4. Create getDiscountedPrice(price, discountPercent = 10).
//     It should return the price after applying the percentage discount.
//     Test it with getDiscountedPrice(500) and getDiscountedPrice(500, 20).

// Solution:
function getDiscountedPrice(price, discountPercent = 10) {
  return price - (price * discountPercent) / 100;
}

console.log(getDiscountedPrice(500)); // 450
console.log(getDiscountedPrice(500, 20)); // 400

console.log("--- Question 5 ---");

// Q5. Write an arrow function celsiusToFahrenheit(celsius).
//     Formula: (celsius * 9 / 5) + 32.

// Solution:
const celsiusToFahrenheit = celsius => (celsius * 9) / 5 + 32;

console.log(celsiusToFahrenheit(0)); // 32
console.log(celsiusToFahrenheit(25)); // 77

console.log("--- Question 6 ---");

// Q6. Create a function expression named getRectangleArea.
//     It should accept length and width and return their product.

// Solution:
const getRectangleArea = function (length, width) {
  return length * width;
};

console.log(getRectangleArea(8, 3)); // 24

console.log("--- Question 7 ---");

// Q7. Create a function getLarger(a, b) that returns the larger number.
//     If both numbers are equal, returning either one is acceptable.

// Solution:
function getLarger(a, b) {
  if (a > b) {
    return a;
  }

  return b;
}

console.log(getLarger(15, 9)); // 15
console.log(getLarger(4, 11)); // 11
console.log(getLarger(7, 7)); // 7

console.log("--- Question 8 ---");

// Q8. Create a function getFullName(firstName, lastName = "Unknown").
//     It should return both names joined with a space.

// Solution:
function getFullName(firstName, lastName = "Unknown") {
  return firstName + " " + lastName;
}

console.log(getFullName("Asha", "Verma")); // Asha Verma
console.log(getFullName("Asha")); // Asha Unknown
