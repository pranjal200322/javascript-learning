// Day 15 — Questions and Solutions
// Topic: Loading, Success & Error States in the User Directory
//
// These questions refer to the browser project with:
// const status = document.getElementById("status");
// const user_container = document.getElementById("users-container");

// ------------------------------------------------------------
// QUESTIONS
// ------------------------------------------------------------

// Q1. Write the line that displays "Loading users..." in the status element.

// Q2. Why should the loading message be set before calling fetch()?

// Q3. Write an if statement that checks response.ok. If it is false,
//     throw a new Error containing response.status.

// Q4. Does fetch() normally reject its Promise when the server responds
//     with HTTP 404 or 500? Explain.

// Q5. What is the purpose of the catch block in getUsers()?

// Q6. Write a success message that displays the number of users after
//     the data.forEach() loop has finished.

// Q7. What is the difference between an HTTP error response and a
//     network error?

// Q8. Why is it useful to clear user_container before rendering new cards?

// Q9. Where should the success message be set: before or after rendering
//     the cards? Explain.

// Q10. Why should the page show a simple error message while the browser
//      console logs the actual error?

// ------------------------------------------------------------
// SOLUTIONS
// ------------------------------------------------------------

// Solution 1
// status.textContent = "Loading users...";

// Solution 2
// The message should appear while the request is pending. If it is set
// after fetch(), the user may not see feedback during the request.

// Solution 3
// if (!response.ok) {
//   throw new Error("HTTP error: " + response.status);
// }

// Solution 4
// No. fetch() normally fulfills with a Response object for HTTP 404 or 500.
// Check response.ok or response.status to detect an unsuccessful status.

// Solution 5
// catch handles errors thrown in the try block and rejected Promises
// awaited there, such as network failures or JSON parsing failures.

// Solution 6
// status.textContent = `Loaded ${data.length} users.`;

// Solution 7
// An HTTP error means the server returned a response with an unsuccessful
// status code. A network error means the request could not complete and
// fetch() rejected instead of providing a usable response.

// Solution 8
// Clearing the container prevents cards from an earlier render from
// remaining on the page and appearing alongside the new cards.

// Solution 9
// After rendering. That way the success message is not displayed before
// the user cards have actually been added to the page.

// Solution 10
// A simple message is understandable to the person using the page.
// The console error gives the developer technical details for debugging.

// ------------------------------------------------------------
// INTEGRATED PRACTICE CHECK
// ------------------------------------------------------------

// Complete the following flow inside an async function:
//
// 1. Set status.textContent to "Loading users...".
// 2. Clear user_container with replaceChildren().
// 3. Start fetch() inside try.
// 4. Check response.ok and throw an Error when it is false.
// 5. Read the body with await response.json().
// 6. Render the user cards.
// 7. Set the success message using data.length.
// 8. In catch, show a friendly error message and log the error.
//
// The complete browser implementation is in examples.js.
//