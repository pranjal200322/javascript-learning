# Day 12 — DOM Selection & Dynamic User Cards

**Status: practice material; current DOM work is in progress.** This entry follows Day 11 (JSON, HTTP, and Fetch API basics). It uses the same kind of API data you have been fetching and focuses on displaying that data in a webpage. It does not assume that every step below has already been completed.

## Learning goals

By working through this entry, you should be able to:

- Explain what the DOM is and how JavaScript uses `document` to work with a webpage.
- Select existing HTML elements with `getElementById()` and `querySelector()`.
- Create new elements with `document.createElement()`.
- Add text safely with `textContent`.
- Insert elements into the page with `appendChild()` or `append()`.
- Build one reusable card for each object returned by an API.
- Clear old content with `replaceChildren()`.
- Add and remove CSS classes with `classList`.
- Understand why untrusted API data should not be inserted through `innerHTML`.

---

## 1. What is the DOM?

DOM stands for **Document Object Model**. When the browser loads HTML, it creates a tree-like representation of the page. JavaScript can read and change that tree.

For example, this HTML:

```html
<body>
  <h1>Users</h1>
  <div id="users-container"></div>
</body>
```

is represented as objects/nodes that JavaScript can access through `document`.

Important distinction:

- `document` represents the current HTML document.
- `window` represents the browser window.
- `document.getElementById(...)` selects an existing element.
- `document.createElement(...)` creates a new element; it does **not** automatically put it on the page.

## 2. Select an existing HTML element

Suppose your HTML contains:

```html
<p id="status">Loading users...</p>
<div id="users-container"></div>
```

Select those elements:

```js
const statusElement = document.getElementById("status");
const usersContainer = document.getElementById("users-container");
```

Other useful selectors:

```js
const firstCard = document.querySelector(".user-card");
const allCards = document.querySelectorAll(".user-card");
```

- `getElementById()` returns the element with that ID (or `null` if it does not exist).
- `querySelector()` returns the first element matching a CSS selector (or `null`).
- `querySelectorAll()` returns a static NodeList of all matching elements.

Always check that a selected element exists before using it if the HTML structure is not guaranteed.

## 3. Create a new element

`document.createElement()` creates an element in memory:

```js
const card = document.createElement("div");
```

At this point, the card exists as a DOM element, but it is not visible in the document because it has not been inserted yet.

Give it a class:

```js
card.className = "user-card";
// Another option:
card.classList.add("user-card");
```

Use `className` when setting the complete class string. Use `classList.add()`, `remove()`, or `toggle()` when changing individual classes.

## 4. Add text with textContent

`textContent` sets or reads the text inside an element:

```js
const heading = document.createElement("h2");
heading.textContent = "Aman Sharma";
```

For API data:

```js
heading.textContent = user.name;
```

This treats the value as text, not HTML markup. That matters because API data may contain unexpected characters or malicious markup.

Avoid doing this with untrusted API values:

```js
// Avoid: user-controlled text is interpreted as HTML.
card.innerHTML = `<h2>${user.name}</h2>`;
```

Prefer creating elements and assigning their `textContent`.

## 5. Insert elements into the page

`appendChild()` inserts one node as the last child of a parent:

```js
card.appendChild(heading);
usersContainer.appendChild(card);
```

Modern `append()` can insert multiple nodes or text:

```js
card.append(heading, emailParagraph, cityParagraph);
```

A useful mental model:

1. Select the parent container.
2. Create a child element.
3. Add its class and content.
4. Append the child to its parent.

Creating an element and appending it are two separate operations.

## 6. Build a user card from API data

The API response from JSONPlaceholder is an array of user objects. Each object contains fields such as `name`, `email`, and `address.city`.

A reusable function can convert one user object into one card:

```js
function createUserCard(user) {
  const card = document.createElement("div");
  card.className = "user-card";

  const name = document.createElement("h2");
  name.textContent = user.name;

  const email = document.createElement("p");
  email.textContent = `Email: ${user.email}`;

  const city = document.createElement("p");
  city.textContent = `City: ${user.address?.city ?? "Not available"}`;

  card.append(name, email, city);
  return card;
}
```

Then render every user:

```js
users.forEach((user) => {
  const card = createUserCard(user);
  usersContainer.appendChild(card);
});
```

The `forEach()` callback runs once for each array item. Each iteration creates a separate card.

## 7. Clear old cards before rendering again

If the function runs more than once, old cards can remain and duplicate. Clear the container before adding the latest result:

```js
usersContainer.replaceChildren();
```

This removes all existing child nodes. Then append the newly created cards.

## 8. Combine Fetch API with DOM manipulation

This combines the concepts from Day 11 with today's DOM methods:

```js
const statusElement = document.getElementById("status");
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

  card.append(name, email, city);
  return card;
}

async function getUsers() {
  if (!statusElement || !usersContainer) {
    console.error("Required HTML elements were not found.");
    return;
  }

  statusElement.textContent = "Loading users...";
  usersContainer.replaceChildren();

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();

    users.forEach((user) => {
      usersContainer.appendChild(createUserCard(user));
    });

    statusElement.textContent = `Loaded ${users.length} users.`;
  } catch (error) {
    statusElement.textContent = "Could not load users.";
    console.error(error.message);
  }
}

getUsers();
```

The HTML page needs these elements before the script runs:

```html
<p id="status"></p>
<div id="users-container"></div>
<script src="app.js" defer></script>
```

The `defer` attribute makes the browser execute the external script after the HTML has been parsed. You can also place the script just before the closing `</body>` tag.

## 9. Basic CSS for the cards

The class added in JavaScript can be styled in your CSS file:

```css
#users-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.user-card {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.user-card h2 {
  margin-top: 0;
}
```

JavaScript creates and populates the elements; CSS controls how they look.

## 10. Common mistakes

1. **Creating an element but not appending it:** it exists in memory but is not displayed in the page.
2. **Using the wrong ID or selector:** selection returns `null`, so later property access can throw an error.
3. **Using `textContent` on the wrong element:** make sure you are setting text on the child you created.
4. **Appending the same node repeatedly:** a DOM node can exist in only one place at a time; appending it elsewhere moves it.
5. **Not clearing the container before re-rendering:** repeated API calls may create duplicate cards.
6. **Using `innerHTML` with API data:** untrusted strings can be interpreted as markup. Prefer `textContent`.
7. **Confusing API data with DOM elements:** `user` is a JavaScript object; `card` is a DOM element.
8. **Running the script before the HTML exists:** use `defer` or load the script after the relevant HTML.

## Run the example

This is browser-side code, so do not run it with `node examples.js`. Add the HTML skeleton shown above to your page, save the JavaScript as `app.js` (or update the script path), and open the page in a browser. An internet connection is required for the JSONPlaceholder request.

From the repository root, the files are available at:

- `Day12/README.md`
- `Day12/examples.js`
- `Day12/questions.js`

Pehle code ko line by line samjho, output predict karo, phir browser mein run karke verify karo.
