// DAY 01 — VARIABLES, DECLARATION, ASSIGNMENT, DATA TYPES, typeof
// Date: 2026-10-26 (consolidated revision date)
// ============================================================================

// Example: declaration + initialization, reassignment
let studentName = "Pranjal";
let studentAge = 22;
studentAge = 23;
console.log(studentName, studentAge); // Pranjal 23

// var can be redeclared; let/const cannot be redeclared in the same scope.
var score = 10;
var score = 20;
console.log(score); // 20

let points = 5;
points = 8; // reassignment is allowed
console.log(points); // 8

const course = "JavaScript";
console.log(course);
// const course = "Node.js"; // SyntaxError: redeclaration
// course = "Node.js";       // TypeError: reassignment

// Primitive data types
const textValue = "hello";
const numberValue = 42;
const booleanValue = true;
let missingValue;
const emptyValue = null;
const bigValue = 123n;
const uniqueValue = Symbol("id");
console.log(typeof textValue);     // string
console.log(typeof numberValue);   // number
console.log(typeof booleanValue);  // boolean
console.log(typeof missingValue);  // undefined
console.log(typeof emptyValue);    // object (historical JavaScript quirk)
console.log(typeof bigValue);      // bigint
console.log(typeof uniqueValue);   // symbol
console.log(typeof []);            // object
console.log(typeof {});            // object
console.log(typeof function () {});// function

// Primitive assignment copies the value.
let a = 10;
let b = a;
b = 20;
console.log(a); // 10
console.log(b); // 20

// Object/array assignment copies the reference, not the object itself.
let firstArray = [1, 2];
let secondArray = firstArray;
secondArray.push(3);
console.log(firstArray); // [1, 2, 3]
console.log(secondArray); // [1, 2, 3]

// QUESTION 1: Predict the output.
// let x = 10; let y = x; y = 25; console.log(x, y);
// Answer: 10 25

// QUESTION 2: What is the output of typeof null?
// console.log(typeof null);
// Answer: object

// QUESTION 3: Is this valid? Why?
// let isStudent = yes;
// Answer: No, unless a variable named yes exists. Use true or "yes".
