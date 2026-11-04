// Day 8 — Array Iteration Methods & Callback Functions
// Run: node Day8/examples.js

console.log("\n1. A callback function");

function processUser(name, callback) {
  callback(name);
}

function greetUser(userName) {
  console.log("Hello, " + userName);
}

processUser("Pranjal", greetUser);


console.log("\n2. for...of");

const fruitsForOf = ["apple", "mango", "orange"];

for (const fruit of fruitsForOf) {
  console.log(fruit);
}


console.log("\n3. forEach()");

const fruitsForEach = ["apple", "mango", "orange"];

const forEachReturn = fruitsForEach.forEach((fruit, index, originalArray) => {
  console.log(index, fruit, "array length:", originalArray.length);
});

console.log("forEach return value:", forEachReturn); // undefined


console.log("\n4. map()");

const prices = [100, 200, 300];

const pricesWithTax = prices.map((price) => {
  return price * 1.18;
});

console.log("Original prices:", prices);
console.log("Prices with tax:", pricesWithTax);

const numbersForMap = [1, 2, 3, 4];
const squares = numbersForMap.map(number => number * number);

console.log("Squares:", squares);


console.log("\n5. filter()");

const ages = [15, 22, 17, 30, 19];

const adults = ages.filter(age => age >= 18);

console.log("Adults:", adults);


console.log("\n6. find()");

const users = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Riya" },
  { id: 3, name: "Kabir" }
];

const selectedUser = users.find(user => user.id === 2);
const missingUser = users.find(user => user.id === 99);

console.log("Selected user:", selectedUser);
console.log("Missing user:", missingUser); // undefined


console.log("\n7. some() and every()");

const marks = [35, 42, 28, 60];
const scores = [65, 72, 81];

console.log("Any score >= 50?", marks.some(mark => mark >= 50));
console.log("All scores >= 40?", scores.every(score => score >= 40));


console.log("\n8. reduce()");

const numbersForReduce = [10, 20, 30];

const total = numbersForReduce.reduce((accumulator, currentValue) => {
  console.log("Accumulator:", accumulator, "| Current:", currentValue);
  return accumulator + currentValue;
}, 0);

console.log("Total:", total);


console.log("\n9. A practical combination");

const products = [
  { name: "Notebook", price: 50, inStock: true },
  { name: "Pen", price: 10, inStock: false },
  { name: "Bag", price: 700, inStock: true },
  { name: "Bottle", price: 120, inStock: true }
];

const availableProductNames = products
  .filter(product => product.inStock)
  .map(product => product.name);

const inventoryValue = products
  .filter(product => product.inStock)
  .reduce((totalValue, product) => totalValue + product.price, 0);

console.log("Available products:", availableProductNames);
console.log("Total value of available stock:", inventoryValue);
