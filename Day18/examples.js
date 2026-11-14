// Day 18 — Event Delegation for Dynamic User Cards
// Browser example. Use the HTML shown in README.md and load this file
// with the defer attribute.

const statusElement = document.getElementById("status");
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

  const button = document.createElement("button");
  button.type = "button";
  button.className = "details-toggle";
  button.textContent = "Show details";
  button.dataset.userId = String(user.id);
  button.setAttribute("aria-expanded", "false");

  const details = document.createElement("p");
  details.className = "user-details";
  details.hidden = true;

  card.append(name, email, city, button, details);
  return card;
}

function renderUsers(users) {
  usersContainer.replaceChildren();

  users.forEach((user) => {
    usersContainer.appendChild(createUserCard(user));
  });
}

async function getUsers() {
  statusElement.textContent = "Loading users...";
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
    statusElement.textContent = "Loaded " + allUsers.length + " users.";
  } catch (error) {
    statusElement.textContent = "Could not load users. Please try again.";
    console.error("Could not load users:", error);
  }
}

if (!statusElement || !usersContainer) {
  console.error("A required HTML element was not found.");
} else {
  // One delegated listener handles clicks from every current or future card.
  usersContainer.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const button = event.target.closest("button.details-toggle");

    if (!button || !usersContainer.contains(button)) {
      return;
    }

    const userId = Number(button.dataset.userId);
    const selectedUser = allUsers.find((user) => user.id === userId);
    const details = button.nextElementSibling;

    if (!selectedUser || !details) {
      return;
    }

    const willOpen = details.hidden;

    if (willOpen) {
      details.textContent =
        "Company: " + (selectedUser.company?.name ?? "Not available") +
        " | Phone: " + (selectedUser.phone ?? "Not available");
    }

    details.hidden = !willOpen;
    button.textContent = willOpen ? "Hide details" : "Show details";
    button.setAttribute("aria-expanded", String(willOpen));
  });

  getUsers();
}
