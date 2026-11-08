// Day 12 — DOM Selection & Dynamic User Cards
// Browser practice: add <p id="status"></p> and
// <div id="users-container"></div> to the HTML before loading this file.
//
// Read each question first. Try to write the answer yourself, then
// inspect the solution below it.

// ------------------------------------------------------------
// Q1. Select the element whose id is "users-container".
// Which method should you use?
// ------------------------------------------------------------

// Solution:
const usersContainer = document.getElementById("users-container");
console.log("Q1: Container found:", Boolean(usersContainer));

// ------------------------------------------------------------
// Q2. Create a new paragraph element and store it in a variable
// named emailParagraph.
// ------------------------------------------------------------

// Solution:
const emailParagraph = document.createElement("p");
console.log("Q2: Created element:", emailParagraph.tagName);

// ------------------------------------------------------------
// Q3. Set the text of emailParagraph to "Email: aman@example.com".
// ------------------------------------------------------------

// Solution:
emailParagraph.textContent = "Email: aman@example.com";
console.log("Q3:", emailParagraph.textContent);

// ------------------------------------------------------------
// Q4. Give a card the CSS class "user-card".
// Show one solution with className and one with classList.
// ------------------------------------------------------------

// Solution:
const firstCard = document.createElement("div");
firstCard.className = "user-card";

const secondCard = document.createElement("div");
secondCard.classList.add("user-card");

console.log("Q4:", firstCard.className, secondCard.className);

// ------------------------------------------------------------
// Q5. Append emailParagraph to firstCard.
// ------------------------------------------------------------

// Solution:
firstCard.appendChild(emailParagraph);
console.log("Q5: Email paragraph appended:", firstCard.contains(emailParagraph));

// ------------------------------------------------------------
// Q6. A user object has name, email, and address.city.
// Create a card with a heading for the name and paragraphs for
// email and city. Use textContent for all API values.
// ------------------------------------------------------------

// Solution:
function makeUserCard(user) {
  const card = document.createElement("article");
  card.className = "user-card";

  const heading = document.createElement("h2");
  heading.textContent = user.name;

  const email = document.createElement("p");
  email.textContent = `Email: ${user.email}`;

  const city = document.createElement("p");
  city.textContent = `City: ${user.address?.city ?? "Not available"}`;

  card.append(heading, email, city);
  return card;
}

const sampleUser = {
  name: "Riya Verma",
  email: "riya@example.com",
  address: { city: "Kanpur" }
};

const sampleCard = makeUserCard(sampleUser);
console.log("Q6: Card created:", sampleCard.outerHTML);

// ------------------------------------------------------------
// Q7. The container already has old cards. Which method can
// remove all of its existing child nodes before rendering again?
// ------------------------------------------------------------

// Solution:
// usersContainer.replaceChildren();

// ------------------------------------------------------------
// Q8. Why is textContent preferred over assigning API values
// through innerHTML?
// ------------------------------------------------------------

// Solution:
// textContent treats the API value as plain text. innerHTML parses
// the value as markup, which can create an injection/XSS risk when
// the value is untrusted.

// ------------------------------------------------------------
// Q9. What is the difference between createElement() and
// appendChild()?
// ------------------------------------------------------------

// Solution:
// createElement() creates a DOM element in memory.
// appendChild() inserts a node into a parent element in the DOM.

// ------------------------------------------------------------
// Q10. Select all elements with the class "user-card".
// Which selector method returns a NodeList?
// ------------------------------------------------------------

// Solution:
const allCards = document.querySelectorAll(".user-card");
console.log("Q10: Number of cards currently in the document:", allCards.length);
