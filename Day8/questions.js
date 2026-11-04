// Day 8 — Array Iteration Methods & Callback Functions
// Questions are written first; solutions follow each question.
// Run: node Day8/questions.js

// QUESTION 1:
// Use forEach() to print every city with its index.
// Expected format:
// 0 Lucknow
// 1 Kanpur
// 2 Pune

const citiesQ1 = ["Lucknow", "Kanpur", "Pune"];

// SOLUTION 1:
citiesQ1.forEach((city, index) => {
  console.log(index, city);
});


// QUESTION 2:
// Use map() to create a new array containing the double of each number.
// Input: [2, 4, 6]
// Expected: [4, 8, 12]

const numbersQ2 = [2, 4, 6];

// SOLUTION 2:
const doubledQ2 = numbersQ2.map(number => number * 2);
console.log(doubledQ2);


// QUESTION 3:
// Use filter() to get only the even numbers.
// Input: [1, 2, 3, 4, 5, 6]
// Expected: [2, 4, 6]

const numbersQ3 = [1, 2, 3, 4, 5, 6];

// SOLUTION 3:
const evenNumbersQ3 = numbersQ3.filter(number => number % 2 === 0);
console.log(evenNumbersQ3);


// QUESTION 4:
// Use find() to get the first movie whose rating is at least 8.
// If no movie matches, find() should return undefined.

const moviesQ4 = [
  { title: "Film A", rating: 7.5 },
  { title: "Film B", rating: 8.2 },
  { title: "Film C", rating: 9.0 }
];

// SOLUTION 4:
const firstHighlyRatedMovieQ4 = moviesQ4.find(movie => movie.rating >= 8);
console.log(firstHighlyRatedMovieQ4);


// QUESTION 5:
// Use some() to check whether at least one number is negative.

const numbersQ5 = [4, 8, -3, 10];

// SOLUTION 5:
const hasNegativeQ5 = numbersQ5.some(number => number < 0);
console.log(hasNegativeQ5); // true


// QUESTION 6:
// Use every() to check whether all students have passed (marks >= 40).

const marksQ6 = [55, 72, 40, 89];

// SOLUTION 6:
const allPassedQ6 = marksQ6.every(mark => mark >= 40);
console.log(allPassedQ6); // true


// QUESTION 7:
// Use reduce() to calculate the sum of all values.
// Input: [5, 10, 15]
// Expected: 30

const numbersQ7 = [5, 10, 15];

// SOLUTION 7:
const sumQ7 = numbersQ7.reduce((total, current) => total + current, 0);
console.log(sumQ7);


// QUESTION 8:
// What does forEach() return? Store its return value and print it.

const numbersQ8 = [1, 2, 3];

// SOLUTION 8:
const resultQ8 = numbersQ8.forEach(number => number * 2);
console.log(resultQ8); // undefined


// QUESTION 9:
// Use map() to create an array of movie titles from the objects below.
// Expected: ["Kahaani", "Maharaja"]

const moviesQ9 = [
  { title: "Kahaani", year: 2012 },
  { title: "Maharaja", year: 2024 }
];

// SOLUTION 9:
const movieTitlesQ9 = moviesQ9.map(movie => movie.title);
console.log(movieTitlesQ9);


// QUESTION 10:
// Use filter() and reduce() to calculate the total price of products
// that are in stock.
// Expected: 170

const productsQ10 = [
  { name: "Book", price: 100, inStock: true },
  { name: "Pen", price: 20, inStock: false },
  { name: "Bottle", price: 70, inStock: true }
];

// SOLUTION 10:
const inStockTotalQ10 = productsQ10
  .filter(product => product.inStock)
  .reduce((total, product) => total + product.price, 0);

console.log(inStockTotalQ10);
