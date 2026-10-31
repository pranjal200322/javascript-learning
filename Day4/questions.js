// Day 4 — Loop practice questions with solutions
// Run from the repository root: node Day4/questions.js
// Har question ka output pehle khud predict karo. Solution uske neeche hai.

console.log("--- Q1 ---");
// Q1. What numbers are printed by this loop?
// for (let i = 1; i <= 4; i++) console.log(i);
// Solution: 1, 2, 3, 4. The condition includes 4 because it uses <=.
for (let i = 1; i <= 4; i++) {
  console.log(i);
}

console.log("--- Q2 ---");
// Q2. How many times does this loop run?
// for (let i = 0; i < 5; i++) { ... }
// Solution: 5 times, with i values 0, 1, 2, 3, and 4.
let q2Count = 0;
for (let i = 0; i < 5; i++) {
  q2Count++;
}
console.log("Runs:", q2Count);

console.log("--- Q3 ---");
// Q3. What is the final value of total?
// let total = 0;
// for (let i = 1; i <= 3; i++) total += i;
// Solution: 6 (0 + 1 + 2 + 3).
let totalQ3 = 0;
for (let i = 1; i <= 3; i++) {
  totalQ3 += i;
}
console.log("Total:", totalQ3);

console.log("--- Q4 ---");
// Q4. What gets printed by this while loop?
// let n = 3; while (n > 0) { console.log(n); n--; }
// Solution: 3, 2, 1. Then n becomes 0 and the condition is false.
let nQ4 = 3;
while (nQ4 > 0) {
  console.log(nQ4);
  nQ4--;
}

console.log("--- Q5 ---");
// Q5. Does this do...while body execute?
// let ready = false; do { console.log("Run"); } while (ready);
// Solution: Yes, exactly once. do...while checks the condition after the body.
let readyQ5 = false;
do {
  console.log("Run");
} while (readyQ5);

console.log("--- Q6 ---");
// Q6. What is printed before break stops the loop?
// for (let i = 1; i <= 5; i++) { if (i === 3) break; console.log(i); }
// Solution: 1 and 2. When i is 3, break exits the loop.
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break;
  }
  console.log(i);
}

console.log("--- Q7 ---");
// Q7. Which value is skipped?
// for (let i = 1; i <= 4; i++) { if (i === 2) continue; console.log(i); }
// Solution: 2 is skipped; output is 1, 3, 4.
for (let i = 1; i <= 4; i++) {
  if (i === 2) {
    continue;
  }
  console.log(i);
}

console.log("--- Q8 ---");
// Q8. How many times does the inner console.log run?
// for (let row = 1; row <= 2; row++) {
//   for (let col = 1; col <= 3; col++) console.log(row, col);
// }
// Solution: 6 times (2 outer iterations × 3 inner iterations).
let q8Runs = 0;
for (let row = 1; row <= 2; row++) {
  for (let col = 1; col <= 3; col++) {
    q8Runs++;
  }
}
console.log("Inner runs:", q8Runs);

console.log("--- Q9 ---");
// Q9. Find the bug: while (x <= 3) { console.log(x); }
// Solution: x is never updated, so if x starts at 1 the loop never ends.
// Add x++ inside the body.
let xQ9 = 1;
while (xQ9 <= 3) {
  console.log(xQ9);
  xQ9++;
}

console.log("--- Q10 ---");
// Q10. What is printed by: for (let i = 5; i >= 1; i -= 2) console.log(i);
// Solution: 5, 3, 1. The counter decreases by 2 each time.
for (let i = 5; i >= 1; i -= 2) {
  console.log(i);
}
