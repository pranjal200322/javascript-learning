// Day 14 — Add Email and City to DOM User Cards
// Browser example: include this file with:
// <script src="examples.js" defer></script>
// and provide <div id="user_container"></div> in the HTML.

const user_container = document.getElementById("user_container");

async function loadUsers() {
  if (!user_container) {
    console.error('Element with id="user_container" was not found.');
    return;
  }

  // Remove cards from a previous render, if any.
  user_container.replaceChildren();

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    // fetch() does not reject just because the server returned 404 or 500.
    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Expected an array of users.");
    }

    data.forEach((user) => {
      // Create one card for the current user.
      const card = document.createElement("div");
      card.className = "user-card";

      // Create the name heading.
      const name = document.createElement("h2");
      name.textContent = user.name ?? "Name not available";

      // Create the email paragraph.
      const email = document.createElement("p");
      email.textContent = "Email: " + (user.email ?? "Not available");

      // Create the city paragraph. City is nested inside address.
      const city = document.createElement("p");
      city.textContent = "City: " + (user.address?.city ?? "Not available");

      // Put all three child elements inside this user's card.
      card.append(name, email, city);

      // Put the completed card inside the main container.
      user_container.appendChild(card);
    });
  } catch (error) {
    console.error("Could not load users:", error.message);
    user_container.textContent = "Could not load users.";
  }
}

loadUsers();

// Optional CSS to place in your separate stylesheet:
//
// #user_container {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//   gap: 16px;
// }
//
// .user-card {
//   padding: 16px;
//   border: 1px solid #ccc;
//   border-radius: 10px;
// }
