// Day 13 — Questions: Completing API User Cards
//
// These questions use the browser DOM. Add this HTML before loading the file:
// <div id="users-container"></div>
// <script src="questions.js" defer></script>
//
// QUESTIONS (try answering before reading the solutions)
//
// 1. Which method creates a paragraph element?
// 2. How do you place the email paragraph inside the card?
// 3. In the JSONPlaceholder user object, where is the city stored?
// 4. What does user.address?.city ?? "Not available" protect against?
// 5. Does document.createElement("div") automatically display the div?
// 6. What is the difference between createUserCard(user) and
//    usersContainer.appendChild(createUserCard(user))?
// 7. Why is textContent preferred for API-provided text?
// 8. Which method removes all existing child nodes before rendering again?
//
// SOLUTIONS
//
// 1. document.createElement("p")
// 2. card.appendChild(email) or card.append(email)
// 3. user.address.city
// 4. It handles a missing/null address or city and supplies a fallback
//    when the result is null or undefined.
// 5. No. It creates the node in memory; it must be inserted into the DOM.
// 6. createUserCard builds and returns a node. appendChild inserts that
//    returned node into the selected container.
// 7. textContent treats the value as text instead of parsing it as HTML.
// 8. usersContainer.replaceChildren()

const usersContainer = document.getElementById("users-container");

function createUserCard(user) {
  const card = document.createElement("article");
  card.className = "user-card";

  const name = document.createElement("h2");
  name.textContent = user.name;

  const email = document.createElement("p");
  email.textContent = `Email: ${user.email}`;

  const city = document.createElement("p");
  city.textContent = `City: ${user.address?.city ?? "Not available"}`;

  card.appendChild(name);
  card.appendChild(email);
  card.appendChild(city);

  return card;
}

const sampleUsers = [
  {
    name: "Aman Sharma",
    email: "aman@example.com",
    address: { city: "Lucknow" }
  },
  {
    name: "Riya Verma",
    email: "riya@example.com",
    address: {}
  }
];

usersContainer.replaceChildren();

sampleUsers.forEach((user) => {
  usersContainer.appendChild(createUserCard(user));
});

// Expected result:
// - Two cards are inserted.
// - The first card shows Lucknow.
// - The second card shows Not available because city is missing.
