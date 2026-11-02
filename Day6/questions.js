// Day 6 — Arrays in JavaScript
// Run from the repository root: node Day6/questions.js
//
// Try to solve each question before reading its solution.
// The solutions are included below each question for self-checking.

console.log("--- Question 1 ---");

// Q1. Create an array containing three movie titles.
//     Print the first title, the third title, and the array length.

// Solution:
const movieTitles = ["Kahaani", "Badlapur", "Maharaja"];

console.log(movieTitles[0]); // Kahaani
console.log(movieTitles[2]); // Maharaja
console.log(movieTitles.length); // 3

console.log("--- Question 2 ---");

// Q2. Given [12, 24, 36], update the second element to 25.
//     Print the updated array.

// Solution:
const values = [12, 24, 36];
values[1] = 25;

console.log(values); // [12, 25, 36]

console.log("--- Question 3 ---");

// Q3. Start with ["HTML", "CSS"].
//     Add "JavaScript" to the end, then remove and print the last item.

// Solution:
const webSkills = ["HTML", "CSS"];

webSkills.push("JavaScript");
console.log(webSkills); // ["HTML", "CSS", "JavaScript"]

const removedSkill = webSkills.pop();
console.log("Removed:", removedSkill); // JavaScript
console.log(webSkills); // ["HTML", "CSS"]

console.log("--- Question 4 ---");

// Q4. Start with ["B", "C"].
//     Add "A" at the beginning, then remove and print the first item.

// Solution:
const letters = ["B", "C"];

letters.unshift("A");
console.log(letters); // ["A", "B", "C"]

const firstLetter = letters.shift();
console.log("Removed:", firstLetter); // A
console.log(letters); // ["B", "C"]

console.log("--- Question 5 ---");

// Q5. Given ["JavaScript", "C++", "Python"], check whether "C++"
//     exists. Also print the index of "Python" and the index of "Java".

// Solution:
const languages = ["JavaScript", "C++", "Python"];

console.log(languages.includes("C++")); // true
console.log(languages.indexOf("Python")); // 2
console.log(languages.indexOf("Java")); // -1

console.log("--- Question 6 ---");

// Q6. Given [5, 10, 15, 20, 25], use slice() to create
//     a new array containing [10, 15, 20].
//     Print both arrays to confirm the original is unchanged.

// Solution:
const original = [5, 10, 15, 20, 25];
const middleValues = original.slice(1, 4);

console.log(middleValues); // [10, 15, 20]
console.log(original); // [5, 10, 15, 20, 25]

console.log("--- Question 7 ---");

// Q7. Given ["red", "blue", "green"], use splice() to remove
//     "blue" and insert "yellow" at the same position.
//     Print the removed items and the updated array.

// Solution:
const colors = ["red", "blue", "green"];
const removedColors = colors.splice(1, 1, "yellow");

console.log(removedColors); // ["blue"]
console.log(colors); // ["red", "yellow", "green"]

console.log("--- Question 8 ---");

// Q8. Use a regular for loop to calculate the sum of
//     [10, 20, 30, 40]. Print the final sum.

// Solution:
const numbers = [10, 20, 30, 40];
let sum = 0;

for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

console.log(sum); // 100

console.log("--- Question 9 ---");

// Q9. Use for...of to print every item in ["HTML", "CSS", "JS"].

// Solution:
const technologies = ["HTML", "CSS", "JS"];

for (const technology of technologies) {
  console.log(technology);
}

console.log("--- Question 10 ---");

// Q10. What happens when an array is assigned to another const variable
//      and the second variable is used to push a new item?
//      Demonstrate the behavior, then show how spread creates a
//      separate shallow copy.

// Solution:
const firstArray = [1, 2];
const secondArray = firstArray;

secondArray.push(3);

console.log(firstArray); // [1, 2, 3] — same referenced array
console.log(secondArray); // [1, 2, 3]

const independentCopy = [...firstArray];
independentCopy.push(4);

console.log(firstArray); // [1, 2, 3]
console.log(independentCopy); // [1, 2, 3, 4]
