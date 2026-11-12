// Day 16 — Live Search in the User Directory
// Browser example. This file expects:
// - #status
// - #search-input (an <input type="search">)
// - #users-container
// Load this file with <script src="examples.js" defer></script>.
// The page also needs the existing .user-card and .users-grid CSS.

const statusElement = document.getElementById("status");
const searchInput = document.getElementById("search-input");
const user_container = document.getElementById("users-container");

// Keep the complete API result here. Every search filters this original array.
let allUsers = [];

function createUserCard(user) {
  const card = document.createElement("div");
  card.className = "user-card";

  const name = document.createElement("h2");
  name.textContent = user.name ?? "Name not available";

  const email = document.createElement("p");
  email.textContent = "Email: " + (user.email ?? "Not available");

  const city = document.createElement("p");
  city.textContent =
    "City: " + (user.address?.city ?? "Not available");

  card.append(name, email, city);
  return card;
}

function renderUsers(users) {
  // Remove results from the previous render before adding the new results.
  user_container.replaceChildren();

  users.forEach((user) => {
    const card = createUserCard(user);
    user_container.appendChild(card);
  });
}

function searchUsers() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Filter the original list, not the results from the previous search.
  const filteredUsers = allUsers.filter((user) => {
    const name = typeof user.name === "string"
      ? user.name.toLowerCase()
      : "";

    return name.includes(searchTerm);
  });

  renderUsers(filteredUsers);

  if (filteredUsers.length === 0) {
    statusElement.textContent = "No users match your search.";
  } else {
    statusElement.textContent =
      `Showing ${filteredUsers.length} of ${allUsers.length} users.`;
  }
}

async function getUsers() {
  statusElement.textContent = "Loading users...";
  user_container.replaceChildren();
  searchInput.disabled = true;

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    // fetch() does not reject just because the server returns HTTP 404 or 500.
    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Expected the API to return an array of users.");
    }

    allUsers = data;
    renderUsers(allUsers);
    searchInput.disabled = false;

    statusElement.textContent = `Loaded ${allUsers.length} users.`;
  } catch (error) {
    statusElement.textContent = "Could not load users. Please try again.";
    console.error("Could not load users:", error);
  }
}

if (!statusElement || !searchInput || !user_container) {
  console.error(
    'Required HTML elements (#status, #search-input, #users-container) were not found.'
  );
} else {
  // The input event runs whenever the user edits the search field.
  searchInput.addEventListener("input", searchUsers);
  getUsers();
}
