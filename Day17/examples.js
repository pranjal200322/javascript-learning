// Day 17 — Sort Users by Name with Array.sort()
// Browser example. Add the matching HTML from README.md and load this
// script with the defer attribute.

const status = document.getElementById("status");
const userContainer = document.getElementById("users-container");
const sortSelect = document.getElementById("sort-order");

let allUsers = [];

function createUserCard(user) {
  const card = document.createElement("div");
  card.className = "user-card";

  const name = document.createElement("h2");
  name.textContent = user.name ?? "Name not available";

  const email = document.createElement("p");
  email.textContent = "Email: " + (user.email ?? "Not available");

  const city = document.createElement("p");
  city.textContent = "City: " + (user.address?.city ?? "Not available");

  card.append(name, email, city);
  return card;
}

function renderUsers(users) {
  // Remove the previous cards before rendering the new order.
  userContainer.replaceChildren();

  users.forEach((user) => {
    userContainer.appendChild(createUserCard(user));
  });
}

function sortUsers(users, order) {
  // sort() mutates its array, so sort a copy to preserve the input array.
  const sortedUsers = [...users];

  sortedUsers.sort((a, b) => {
    const nameA = (a.name ?? "").trim();
    const nameB = (b.name ?? "").trim();

    const result = nameA.localeCompare(nameB, undefined, {
      sensitivity: "base"
    });

    return order === "desc" ? -result : result;
  });

  return sortedUsers;
}

async function getUsers() {
  if (!status || !userContainer || !sortSelect) {
    console.error("A required HTML element was not found.");
    return;
  }

  status.textContent = "Loading users...";
  userContainer.replaceChildren();

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

    const sortedUsers = sortUsers(allUsers, sortSelect.value);
    renderUsers(sortedUsers);

    status.textContent = `Loaded ${allUsers.length} users.`;
  } catch (error) {
    status.textContent = "Could not load users. Please try again.";
    console.error("Could not load users:", error);
  }
}

sortSelect.addEventListener("change", () => {
  const sortedUsers = sortUsers(allUsers, sortSelect.value);
  renderUsers(sortedUsers);
});

getUsers();
