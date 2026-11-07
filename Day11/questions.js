// Day 11 — JSON, HTTP & Fetch API Basics
// Read each question first, predict the output, then check the solution.

// ------------------------------------------------------------
// Q1. Convert this JavaScript object into JSON text.
// ------------------------------------------------------------
// const movie = { title: "Dangal", year: 2016 };
// What method should you use? What is the type of the result?

// Solution:
const movie = { title: "Dangal", year: 2016 };
const movieJson = JSON.stringify(movie);
console.log("Q1:", movieJson);
console.log("Q1 type:", typeof movieJson); // string

// ------------------------------------------------------------
// Q2. Parse this JSON text and print the user's name.
// ------------------------------------------------------------
// const text = '{"name":"Riya","active":true}';

// Solution:
const text = '{"name":"Riya","active":true}';
const parsed = JSON.parse(text);
console.log("Q2:", parsed.name); // Riya

// ------------------------------------------------------------
// Q3. Is this valid JSON? If not, identify the problem.
// ------------------------------------------------------------
// { name: 'Aman', age: 22, }

// Solution:
// It is not valid JSON. Property names and string values need
// double quotes, and JSON does not allow a trailing comma.
// Valid JSON:
// {"name":"Aman","age":22}

// ------------------------------------------------------------
// Q4. What does response.ok mean?
// ------------------------------------------------------------
// A server responds with status 201. What is response.ok?
// A server responds with status 404. What is response.ok?

// Solution:
console.log("Q4 status 201:", 201 >= 200 && 201 < 300); // true
console.log("Q4 status 404:", 404 >= 200 && 404 < 300); // false

// ------------------------------------------------------------
// Q5. Why is this check needed after fetch()?
// ------------------------------------------------------------
// const response = await fetch(url);
// const data = await response.json();
//
// Why should we check response.ok before treating the response
// as a successful API result?

// Solution:
// fetch() normally fulfills even when the server returns an HTTP
// error such as 404 or 500. response.ok tells us whether the status
// is in the 200–299 range. We should handle unsuccessful statuses.

// ------------------------------------------------------------
// Q6. Complete the POST request options for JSON data.
// ------------------------------------------------------------
// const data = { title: "My post" };
// fetch(url, {
//   method: "...",
//   headers: { "Content-Type": "..." },
//   body: ...
// });

// Solution:
const data = { title: "My post" };
const postOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
};
console.log("Q6:", postOptions);

// ------------------------------------------------------------
// Q7. What is the difference between response and data?
// ------------------------------------------------------------
// const response = await fetch(url);
// const data = await response.json();

// Solution:
// response is the HTTP Response object. It contains status,
// headers, and methods for reading the body.
// data is the parsed JavaScript value obtained from the JSON body.

// ------------------------------------------------------------
// Q8. Name the usual HTTP method for each action:
// Read users, create a post, partially update a profile, delete a user.

// Solution:
const methods = {
  readUsers: "GET",
  createPost: "POST",
  partiallyUpdateProfile: "PATCH",
  deleteUser: "DELETE"
};
console.log("Q8:", methods);
