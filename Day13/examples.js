// Day 13 — Completing API User Cards (DOM Practice)
//
// Browser setup:
// <p id="status">Waiting...</p>
// <div id="users-container"></div>
// <script src="examples.js" defer></script>
//
// Open this file through an HTML page in a browser.
// It uses document and fetch, so it is not a Node.js-only example.

const statusElement = document.getElementById("status");
const usersContainer = document.getElementById("users-container");

// Build one card and return it. This function does not insert it into the page.
function createUserCard(user) {
  const card = document.createElement("div");
  card.className = "user-card";

  const name = document.createElement("h2");
  name.textContent = user.name;

  const email = document.createElement("p");
  email.textContent = `Email: ${user.email}`;

  const city = document.createElement("p");
  const cityName = user.address?.city ?? "Not available";
  city.textContent = `City: ${cityName}`;

  // Add all three child elements to the card.
  card.append(name, email, city);

  return card;
}

// Insert one card for every user in the array.
function renderUsers(users) {
  usersContainer.replaceChildren();

  users.forEach((user) => {
    const card = createUserCard(user);
    usersContainer.appendChild(card);
  });
}

async function getUsers() {
  if (!statusElement || !usersContainer) {
    console.error(
      'Add elements with id="status" and id="users-container" to the HTML.'
    );
    return;
  }

  statusElement.textContent = "Loading users...";

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    console.log("HTTP status:", response.status);
    console.log("Request successful:", response.ok);

    // fetch does not reject just because the server returned 404 or 500.
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();

    if (!Array.isArray(users)) {
      throw new Error("Expected an array of users.");
    }

    renderUsers(users);
    statusElement.textContent = `Loaded ${users.length} users.`;
  } catch (error) {
    usersContainer.replaceChildren();
    statusElement.textContent = "Could not load users.";
    console.error("Request failed:", error.message);
  }
}

getUsers();

// Local experiment: temporarily comment out getUsers() above and try:
// const sampleUser = {
//   name: "Aman Sharma",
//   email: "aman@example.com",
//   address: { city: "Lucknow" }
// };
// usersContainer.appendChild(createUserCard(sampleUser));
