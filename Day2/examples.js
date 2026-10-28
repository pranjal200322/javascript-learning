// Day 2 — Operators, comparisons, and type conversion
// Run from the repository root: node Day2/examples.js

console.log("--- Arithmetic ---");
console.log(5 + 3);   // 8
console.log(5 - 3);   // 2
console.log(5 * 3);   // 15
console.log(10 / 2);  // 5
console.log(10 % 3);  // 1 (remainder)
console.log(2 ** 3);  // 8 (power)

console.log("--- Assignment operators ---");
let total = 10;
total += 5; // same as total = total + 5
total *= 2;
console.log(total); // 30

console.log("--- Comparisons ---");
console.log(7 > 3);        // true
console.log(7 <= 7);       // true
console.log(10 == "10");  // true: loose equality converts types
console.log(10 === "10"); // false: number vs string
console.log(10 !== "10"); // true

console.log("--- Explicit conversion ---");
console.log(Number("42"));       // 42
console.log(String(42));         // "42"
console.log(Boolean(1));         // true
console.log(Number("hello"));   // NaN
console.log(Number.isNaN(Number("hello"))); // true

console.log("--- Automatic type coercion ---");
console.log("10" + 5); // "105": string concatenation
console.log("10" - 5); // 5: numeric conversion

console.log("--- Truthy and falsy values ---");
console.log(Boolean(0));     // false
console.log(Boolean(""));   // false
console.log(Boolean(null)); // false
console.log(Boolean([]));   // true
console.log(Boolean({}));   // true

console.log("--- Operator precedence ---");
console.log(5 + 4 * 2);     // 13
console.log((5 + 4) * 2);   // 18
