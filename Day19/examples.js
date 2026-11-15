// Day 19 — Debouncing Search Input
// Browser example. Use the HTML shown in README.md and load this file
// with the defer attribute.

const statusElement = document.getElementById("status");
const searchInput = document.getElementById("search-input");
const usersContainer = document.getElementById("users-container");

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
  usersContainer.replaceChildren();

  users.forEach((user) => {
    usersContainer.appendChild(createUserCard(user));
  });
}

// Returns a function that waits until calls have stopped for delay ms.
function debounce(callback, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Always filter the original array, not the previous filtered results.
  const filteredUsers = allUsers.filter((user) => {
    const name = typeof user.name === "string"
      ? user.name.toLowerCase()
      : "";

    return name.includes(searchTerm);
  });

  renderUsers(filteredUsers);

  statusElement.textContent = filteredUsers.length === 0
    ? "No users match your search."
    : "Showing " + filteredUsers.length + " of " + allUsers.length + " users.";
}

const debouncedSearch = debounce(handleSearch, 300);

async function getUsers() {
  statusElement.textContent = "Loading users...";
  searchInput.disabled = true;
  usersContainer.replaceChildren();

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Expected an array of users.");
    }

    allUsers = data;
    renderUsers(allUsers);
    searchInput.disabled = false;
    statusElement.textContent = "Loaded " + allUsers.length + " users.";
  } catch (error) {
    statusElement.textContent = "Could not load users. Please try again.";
    console.error("Could not load users:", error);
  }
}

if (!statusElement || !searchInput || !usersContainer) {
  console.error("A required HTML element was not found.");
} else {
  searchInput.addEventListener("input", debouncedSearch);
  getUsers();
}
