// Day 7 — Objects: Questions and Solutions
// Run: node Day7/questions.js

// Q1. Create a book object with title, author, and year.
//     Print the book title.
const book = {
  title: "The Alchemist",
  author: "Paulo Coelho",
  year: 1988
};
console.log("Q1:", book.title);

// Q2. Given the product below, update its price to 799 and add
//     an inStock property with the value true.
const product = {
  name: "Keyboard",
  price: 999
};

product.price = 799;
product.inStock = true;
console.log("Q2:", product);

// Q3. Read the city from this nested object.
const employee = {
  name: "Neha",
  office: {
    city: "Bengaluru",
    floor: 4
  }
};

console.log("Q3:", employee.office.city);

// Q4. Use object destructuring to extract the movie title and year.
const movie = {
  title: "Maharaja",
  year: 2024,
  rating: 8.3
};

const { title, year } = movie;
console.log("Q4:", title, year);

// Q5. Add a method called getDetails() to the person object.
//     It should return: "Aman is 22 years old."
const person = {
  name: "Aman",
  age: 22,
  getDetails() {
    return `${this.name} is ${this.age} years old.`;
  }
};

console.log("Q5:", person.getDetails());

// Q6. Create a new object from settings using spread syntax.
//     Override theme with "dark" and add notifications: true.
const settings = {
  theme: "light",
  language: "English"
};

const updatedSettings = {
  ...settings,
  theme: "dark",
  notifications: true
};

console.log("Q6 original:", settings);
console.log("Q6 updated:", updatedSettings);

// Q7. Print all keys and all values of the student object.
const student = {
  name: "Riya",
  course: "B.Tech",
  semester: 8
};

console.log("Q7 keys:", Object.keys(student));
console.log("Q7 values:", Object.values(student));

// Q8. Check safely whether account.profile.email exists.
//     The profile property is missing, so the result should be undefined.
const account = {
  username: "coder01"
};

console.log("Q8:", account.profile?.email);
