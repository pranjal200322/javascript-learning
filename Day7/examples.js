// Day 7 — Objects in JavaScript
// Run: node Day7/examples.js

console.log("1. Object literal and property access");

const movie = {
  title: "Kahaani",
  year: 2012,
  rating: 8.1,
  genres: ["Thriller", "Mystery"],
  watched: true
};

console.log(movie.title);       // Dot notation
console.log(movie["year"]);    // Bracket notation
console.log(movie.genres[0]);

console.log("\n2. Add, update, and delete properties");

const user = {
  name: "Aman",
  age: 22
};

user.city = "Lucknow"; // Add
user.age = 23;         // Update
delete user.city;      // Delete

console.log(user);

console.log("\n3. Nested objects");

const student = {
  name: "Riya",
  address: {
    city: "Kanpur",
    state: "Uttar Pradesh"
  }
};

console.log(student.address.city);
console.log(student.contact?.email); // undefined; no crash

console.log("\n4. Object method and this");

const person = {
  name: "Pranjal",
  greet() {
    return `Hello, ${this.name}!`;
  }
};

console.log(person.greet());

console.log("\n5. Object.keys, values, entries, and hasOwn");

const course = {
  name: "JavaScript",
  duration: "30 days",
  level: "beginner"
};

console.log(Object.keys(course));
console.log(Object.values(course));
console.log(Object.entries(course));
console.log(Object.hasOwn(course, "name"));
console.log(Object.hasOwn(course, "price"));

console.log("\n6. Object destructuring");

const film = {
  title: "Maharaja",
  year: 2024,
  rating: 8.3
};

const { title, rating: filmRating } = film;

console.log(title);
console.log(filmRating);

console.log("\n7. Spread syntax creates a shallow copy");

const original = {
  name: "Aman",
  address: {
    city: "Lucknow"
  }
};

const copy = { ...original };
copy.name = "Rohan";

console.log(original.name); // Aman
console.log(copy.name);     // Rohan

// Nested objects are still shared in a shallow copy.
copy.address.city = "Kanpur";

console.log(original.address.city); // Kanpur
console.log(copy.address.city);     // Kanpur

console.log("\n8. Reference assignment");

const first = { score: 10 };
const second = first;

second.score = 20;

console.log(first.score); // 20: both variables refer to the same object
