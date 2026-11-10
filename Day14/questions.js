// Day 14 — Questions and Solutions
// These examples use browser DOM APIs. Run them in a browser page,
// not directly with Node.js.

// ------------------------------------------------------------
// QUESTIONS
// ------------------------------------------------------------

// Q1. Create a paragraph element and store it in a variable named email.

// Q2. Set the paragraph's text to the current user's email.

// Q3. Append the email paragraph inside the current card.

// Q4. The user's city is nested inside user.address. Create a paragraph
//     that displays the city.

// Q5. Make the city expression safe when address or city is missing.
//     Display "Not available" as the fallback.

// Q6. Why does document.createElement("p") not make the paragraph
//     visible on the webpage by itself?

// Q7. Which is the safer choice for displaying plain API text:
//     textContent or innerHTML? Explain briefly.

// Q8. What is the difference between user.address.city and user.city
//     for the JSONPlaceholder user object?

// ------------------------------------------------------------
// SOLUTIONS
// ------------------------------------------------------------

// Solution 1
const email = document.createElement("p");

// Solution 2
// Assume user is the current object inside data.forEach().
email.textContent = "Email: " + (user.email ?? "Not available");

// Solution 3
// Assume card is the current user's card.
card.appendChild(email);

// Solution 4
const city = document.createElement("p");
city.textContent = "City: " + user.address.city;
card.appendChild(city);

// Solution 5
const safeCity = document.createElement("p");
safeCity.textContent =
  "City: " + (user.address?.city ?? "Not available");
card.appendChild(safeCity);

// Solution 6
// createElement() creates a DOM node in memory. It must be inserted into
// an existing node (for example with appendChild()) to become part of the page.

// Solution 7
// textContent is preferred for plain API text because it treats the value
// as text. innerHTML parses the value as markup and can create an XSS risk
// when untrusted data is inserted.

// Solution 8
// In this API, city is nested inside the address object:
// user.address.city
// user.city is not the correct property path for this response.

// ------------------------------------------------------------
// INTEGRATED PRACTICE SOLUTION
// ------------------------------------------------------------

// Put this callback inside a data.forEach((user) => { ... }) loop:
//
// const card = document.createElement("div");
// card.className = "user-card";
//
// const name = document.createElement("h2");
// name.textContent = user.name ?? "Name not available";
//
// const email = document.createElement("p");
// email.textContent = "Email: " + (user.email ?? "Not available");
//
// const city = document.createElement("p");
// city.textContent = "City: " + (user.address?.city ?? "Not available");
//
// card.append(name, email, city);
// user_container.appendChild(card);
