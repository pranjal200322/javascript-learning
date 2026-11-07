// Day 11 — JSON, HTTP & Fetch API Basics
// Run with Node.js 18+ (global fetch is available) and an internet connection.

console.log("----- 1. JavaScript object to JSON text -----");

const user = {
  name: "Pranjal",
  age: 23,
  skills: ["JavaScript", "Node.js"],
  active: true
};

const jsonText = JSON.stringify(user);
console.log(jsonText);
console.log("Type:", typeof jsonText); // string

console.log("\n----- 2. JSON text to JavaScript object -----");

const receivedText = '{"name":"Aman","city":"Lucknow"}';
const parsedUser = JSON.parse(receivedText);

console.log(parsedUser.name);
console.log(parsedUser.city);
console.log("Type:", typeof parsedUser); // object

console.log("\n----- 3. Safely parse JSON -----");

try {
  const validData = JSON.parse('{"course":"JavaScript"}');
  console.log(validData.course);
} catch (error) {
  console.error("Could not parse JSON:", error.message);
}

// fetch() returns a Promise. response.json() also returns a Promise.
// response.ok is true only for HTTP status codes from 200 to 299.
async function getUsers() {
  console.log("\n----- 4. GET request with fetch() -----");

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    console.log("HTTP status:", response.status);
    console.log("Request successful:", response.ok);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();

    console.log("Number of users:", users.length);
    console.log("First user:", users[0].name);
    console.log("First user's city:", users[0].address.city);
  } catch (error) {
    // This catches network errors, our thrown HTTP error,
    // and JSON parsing errors.
    console.error("Could not get users:", error.message);
  }
}

async function createPost() {
  console.log("\n----- 5. POST request with a JSON body -----");

  const postData = {
    title: "Learning JavaScript",
    body: "Practising JSON and HTTP APIs",
    userId: 1
  };

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      }
    );

    console.log("HTTP status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const result = await response.json();
    console.log("API response:", result);
  } catch (error) {
    console.error("Could not create post:", error.message);
  }
}

async function main() {
  await getUsers();
  await createPost();
}

main();
