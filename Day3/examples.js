// Day 3 — Conditional statements
// Run from the repository root: node Day3/examples.js

console.log("--- 1. if ---");
const age = 20;

if (age >= 18) {
  console.log("You are eligible to vote.");
}

console.log("--- 2. if...else ---");
const temperature = 14;

if (temperature >= 25) {
  console.log("It is warm.");
} else {
  console.log("It is not warm.");
}

console.log("--- 3. if...else if...else ---");
const marks = 76;

if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 75) {
  console.log("Grade B");
} else if (marks >= 60) {
  console.log("Grade C");
} else if (marks >= 40) {
  console.log("Pass");
} else {
  console.log("Fail");
}

console.log("--- 4. Logical AND, OR, NOT ---");
const hasID = true;
const isLoggedIn = false;
const isAdmin = true;

console.log(age >= 18 && hasID); // true: both conditions are truthy
console.log(isLoggedIn || isAdmin); // true: at least one is truthy
console.log(!isLoggedIn); // true: NOT reverses the Boolean

if (age >= 18 && hasID) {
  console.log("Entry allowed.");
}

console.log("--- 5. Truthy and falsy conditions ---");
const username = "";

if (username) {
  console.log("Username provided");
} else {
  console.log("Username is empty");
}

if ([]) {
  console.log("An empty array is truthy.");
}

if ({}) {
  console.log("An empty object is truthy.");
}

console.log("--- 6. Nested if ---");
const loggedIn = true;
const admin = false;

if (loggedIn) {
  if (admin) {
    console.log("Show admin panel");
  } else {
    console.log("Show user dashboard");
  }
} else {
  console.log("Please log in");
}

console.log("--- 7. Ternary operator ---");
const studentAge = 17;
const ageLabel = studentAge >= 18 ? "Adult" : "Minor";
console.log(ageLabel); // Minor

console.log("--- 8. switch ---");
const dayNumber = 2;

switch (dayNumber) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Unknown day");
}

console.log("--- 9. Multiple switch cases ---");
const role = "editor";

switch (role) {
  case "admin":
  case "editor":
    console.log("Can manage content");
    break;
  case "viewer":
    console.log("Can only view content");
    break;
  default:
    console.log("Unknown role");
}

// Note: switch uses strict equality. For example, case 2 does not match "2".
