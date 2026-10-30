// Day 3 — Conditional statements: questions and solutions
// Run from the repository root: node Day3/questions.js
// Try to predict each answer before reading/running its solution.

// Q1. What is printed when score is 35?
// if (score >= 40) print "Pass"; otherwise print "Fail".
// Solution: "Fail", because 35 is less than 40.
const scoreQ1 = 35;
if (scoreQ1 >= 40) {
  console.log("Q1:", "Pass");
} else {
  console.log("Q1:", "Fail");
}

// Q2. What is printed for marks = 82 using the grade conditions below?
// Solution: "Grade B". The first true branch is marks >= 75.
const marksQ2 = 82;
if (marksQ2 >= 90) {
  console.log("Q2:", "Grade A");
} else if (marksQ2 >= 75) {
  console.log("Q2:", "Grade B");
} else if (marksQ2 >= 60) {
  console.log("Q2:", "Grade C");
} else {
  console.log("Q2:", "Below C");
}

// Q3. What is the result of (true && false) || true?
// Solution: true. true && false is false; false || true is true.
console.log("Q3:", (true && false) || true);

// Q4. Is an empty array truthy or falsy?
// Solution: Truthy. Boolean([]) returns true.
console.log("Q4:", Boolean([]));

// Q5. What is printed? Explain why.
// const name = "";
// if (name) print "Hello"; else print "Name missing".
// Solution: "Name missing", because an empty string is falsy.
const nameQ5 = "";
if (nameQ5) {
  console.log("Q5:", "Hello");
} else {
  console.log("Q5:", "Name missing");
}

// Q6. What is the output of this ternary expression?
// const number = 9;
// number % 2 === 0 ? "Even" : "Odd"
// Solution: "Odd", because 9 % 2 is 1.
const numberQ6 = 9;
console.log("Q6:", numberQ6 % 2 === 0 ? "Even" : "Odd");

// Q7. What is printed by the switch when value = "2" and the only case is case 2?
// Solution: "No match". switch uses strict equality, so "2" !== 2.
const valueQ7 = "2";
switch (valueQ7) {
  case 2:
    console.log("Q7:", "Matched number 2");
    break;
  default:
    console.log("Q7:", "No match");
}

// Q8. What happens if break is removed after a matching switch case?
// Solution: Execution can fall through into following cases until a break or the
// end of the switch is reached. This is called fall-through.

// Q9. Fix the condition: if (userAge = 18) { ... } when the intention is to
// check whether userAge is exactly 18.
// Solution: if (userAge === 18) { ... }
const userAgeQ9 = 18;
if (userAgeQ9 === 18) {
  console.log("Q9:", "Age is exactly 18");
}

// Q10. What is printed, and why?
// const isMember = true; const total = 1200;
// if (isMember && total >= 1000) print "Discount"; else print "No discount".
// Solution: "Discount", because both sides of && are true.
const isMemberQ10 = true;
const totalQ10 = 1200;
if (isMemberQ10 && totalQ10 >= 1000) {
  console.log("Q10:", "Discount");
} else {
  console.log("Q10:", "No discount");
}
