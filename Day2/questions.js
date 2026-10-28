// Day 2 — Practice questions with solutions
// First predict each answer yourself. Solutions are directly below each question.

// Q1. What is the result of 17 % 5?
// Solution: 2 (17 divided by 5 leaves remainder 2).
console.log("Q1:", 17 % 5);

// Q2. What gets printed?
// let price = 10; price += 4; console.log(price);
// Solution: 14. `+=` adds the right-hand value to the existing value.
let price = 10;
price += 4;
console.log("Q2:", price);

// Q3. What are the results, and why are they different?
// console.log(5 == "5"); console.log(5 === "5");
// Solution: true, then false. Loose equality can coerce types; strict equality does not.
console.log("Q3a:", 5 == "5");
console.log("Q3b:", 5 === "5");

// Q4. What does Number("abc") return? How can you test for it?
// Solution: NaN. Use Number.isNaN(Number("abc")).
const converted = Number("abc");
console.log("Q4:", converted, Number.isNaN(converted));

// Q5. Predict the output: console.log("7" + 2, "7" - 2);
// Solution: "72" and 5. `+` concatenates when a string is involved; `-` converts to numbers.
console.log("Q5:", "7" + 2, "7" - 2);

// Q6. Which is truthy: 0, "", [], null?
// Solution: [] is truthy. 0, empty string, and null are falsy.
console.log("Q6:", Boolean(0), Boolean(""), Boolean([]), Boolean(null));

// Q7. What are the outputs?
// console.log(2 + 3 * 4); console.log((2 + 3) * 4);
// Solution: 14 and 20 because parentheses change the evaluation order.
console.log("Q7:", 2 + 3 * 4, (2 + 3) * 4);

// Q8. What is the type of NaN, and what is the reliable NaN check?
// Solution: typeof NaN is "number"; use Number.isNaN(value).
console.log("Q8:", typeof NaN, Number.isNaN(NaN));
