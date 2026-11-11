// Day 15 — Loading, Success & Error States in the User Directory
// Browser example:
// 1. Provide elements with IDs "status" and "users-container" in your HTML.
// 2. Load this file with: <script src="examples.js" defer></script>
// 3. Open the HTML page in a browser with an internet connection.

const status = document.getElementById("status");
const user_container = document.getElementById("users-container");

async function getUsers() {
  // Check that the required HTML elements exist.
  if (!status || !user_container) {
    console.error("Required HTML elements were not found.");
    return;
  }

  // Show feedback before the network request starts.
  status.textContent = "Loading users...";

  // Remove cards left by an earlier call.
  user_container.replaceChildren();

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    // fetch() does not reject just because the server returns 404 or 500.
    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Expected an array of users.");
    }

    data.forEach((user) => {
      const card = document.createElement("div");
      card.className = "user-card";
      card.textContent = user.name ?? "Name not available";

      const para = document.createElement("p");
      para.textContent = "Email: " + (user.email ?? "Not available");
      card.appendChild(para);

      const city = document.createElement("p");
      city.textContent =
        "City: " + (user.address?.city ?? "Not available");
      card.appendChild(city);

      user_container.appendChild(card);
    });

    // Show success only after all cards have been added.
    status.textContent = `Loaded ${data.length} users.`;
  } catch (error) {
    // Keep the page message simple; log details for debugging.
    status.textContent = "Could not load users. Please try again.";
    console.error("Could not load users:", error);
  }
}

getUsers();
