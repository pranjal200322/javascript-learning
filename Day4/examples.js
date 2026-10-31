// Day 4 — Loops in JavaScript
// Run from the repository root: node Day4/examples.js

console.log("--- 1. for loop: print 1 to 5 ---");
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

console.log("--- 2. for loop: sum 1 to 5 ---");
let sum = 0;

for (let number = 1; number <= 5; number++) {
  sum += number;
}
console.log("Sum:", sum); // 15

console.log("--- 3. while loop ---");
let count = 1;

while (count <= 3) {
  console.log("Count:", count);
  count++; // Update is necessary to eventually make the condition false.
}

console.log("--- 4. do...while runs at least once ---");
let value = 10;

do {
  console.log("Value:", value);
  value++;
} while (value < 10); // Condition is false, but the body already ran once.

console.log("--- 5. break ---");
for (let i = 1; i <= 6; i++) {
  if (i === 4) {
    break; // Exit the loop completely.
  }
  console.log(i); // 1, 2, 3
}

console.log("--- 6. continue ---");
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue; // Skip only this iteration.
  }
  console.log(i); // 1, 2, 4, 5
}

console.log("--- 7. nested loops ---");
for (let row = 1; row <= 3; row++) {
  for (let column = 1; column <= 2; column++) {
    console.log("row:", row, "column:", column);
  }
}

console.log("--- 8. multiplication table ---");
const tableNumber = 4;

for (let multiplier = 1; multiplier <= 5; multiplier++) {
  console.log(tableNumber + " x " + multiplier + " = " + (tableNumber * multiplier));
}

console.log("--- 9. reverse counting ---");
for (let i = 5; i >= 1; i--) {
  console.log(i);
}
console.log("Finished");
