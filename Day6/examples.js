// Day 6 — Arrays in JavaScript
// Run from the repository root: node Day6/examples.js

console.log("--- 1. Creating arrays and accessing elements ---");

const movies = ["Kahaani", "Badlapur", "Maharaja"];

console.log("All movies:", movies);
console.log("First movie:", movies[0]);
console.log("Third movie:", movies[2]);
console.log("Array length:", movies.length);
console.log("Last movie:", movies[movies.length - 1]);
console.log("Missing index:", movies[10]); // undefined

console.log("--- 2. Updating an element ---");

const scores = [70, 80, 90];
scores[1] = 85;
console.log(scores); // [70, 85, 90]

console.log("--- 3. push and pop ---");

const tasks = ["study", "exercise"];
const newLength = tasks.push("read");

console.log("After push:", tasks);
console.log("New length:", newLength);

const removedLast = tasks.pop();
console.log("Removed by pop:", removedLast);
console.log("After pop:", tasks);

console.log("--- 4. unshift and shift ---");

const queue = ["second", "third"];

queue.unshift("first");
console.log("After unshift:", queue);

const removedFirst = queue.shift();
console.log("Removed by shift:", removedFirst);
console.log("After shift:", queue);

console.log("--- 5. includes and indexOf ---");

const tools = ["VS Code", "Git", "Node.js"];

console.log("Has Git?", tools.includes("Git")); // true
console.log("Has Docker?", tools.includes("Docker")); // false
console.log("Node.js index:", tools.indexOf("Node.js")); // 2
console.log("Docker index:", tools.indexOf("Docker")); // -1

console.log("--- 6. slice does not mutate the original ---");

const originalNumbers = [10, 20, 30, 40, 50];
const selectedNumbers = originalNumbers.slice(1, 4);

console.log("Selected:", selectedNumbers); // [20, 30, 40]
console.log("Original:", originalNumbers); // unchanged

console.log("--- 7. splice mutates the original ---");

const editableNumbers = [10, 20, 30, 40];
const removedNumbers = editableNumbers.splice(1, 2, 99);

console.log("Removed:", removedNumbers); // [20, 30]
console.log("Updated original:", editableNumbers); // [10, 99, 40]

console.log("--- 8. Traversing with a for loop ---");

const languages = ["JavaScript", "C++", "Python"];

for (let i = 0; i < languages.length; i++) {
  console.log(i, languages[i]);
}

console.log("--- 9. Traversing with for...of ---");

for (const language of languages) {
  console.log(language);
}

console.log("--- 10. Arrays are reference values ---");

const firstReference = ["red", "blue"];
const secondReference = firstReference;

secondReference.push("green");

console.log("First variable:", firstReference); // ["red", "blue", "green"]
console.log("Second variable:", secondReference); // same array
console.log("Is an array?", Array.isArray(firstReference)); // true
console.log("typeof array:", typeof firstReference); // "object"

console.log("--- 11. Making a shallow copy with spread ---");

const source = [1, 2, 3];
const copied = [...source];

copied.push(4);

console.log("Source:", source); // [1, 2, 3]
console.log("Copy:", copied); // [1, 2, 3, 4]
