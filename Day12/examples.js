// Day 12 — DOM Selection & Dynamic User Cards
// Browser example: include the HTML below before loading this file:
//
// <p id="status"></p>
// <div id="users-container"></div>
// <script src="examples.js" defer></script>
//
// Open the page in a browser. This file is not intended to run directly in Node.js.

const statusElement = document.getElementById("status");
const usersContainer = document.getElementById("users-container");

console.log("Status element found:", Boolean(statusElement));
console.log("Users container found:", Boolean(usersContainer));

function createUserCard(user) {
  // 1. Create a new element. It is not on the page yet.
  const card = document.createElement("article");
  card.className = "user-card";

  // 2. Create child elements and safely add text.
  const nameHeading = document.createElement("h2");
  nameHeading.textContent = user.name;

  const emailParagraph = document.createElement("p");
  emailParagraph.textContent = `Email: ${user.email}`;

  const cityParagraph = document.createElement("p");
  const city = user.address?.city ?? "Not available";
  cityParagraph.textContent = `City: ${city}`;

  // 3. Add the children to the card.
  card.append(nameHeading, emailParagraph, cityParagraph);

  // 4. Return the completed card. The caller will insert it.
  return card;
}

function renderUsers(users) {
  // Remove cards from a previous render.
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
  usersContainer.replaceChildren();
  usersContainer.classList.add("loading");

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

    if (!Array.isArray(users)) {
      throw new Error("Expected the API to return an array.");
    }

    renderUsers(users);
    statusElement.textContent = `Loaded ${users.length} users.`;
  } catch (error) {
    statusElement.textContent = "Could not load users.";
    console.error("Request failed:", error.message);
  } finally {
    usersContainer.classList.remove("loading");
  }
}

getUsers();

// Optional local experiment (no API request):
// const sampleUser = {
//   name: "Aman Sharma",
//   email: "aman@example.com",
//   address: { city: "Lucknow" }
// };
// usersContainer.appendChild(createUserCard(sampleUser));
