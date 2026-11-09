# Day 13 — Completing API User Cards (DOM Practice)

**Status: practice material; DOM card-building is currently in progress.** This entry continues Day 12 and matches the current exercise: users are already fetched, and a card with the user's name is being created and appended. The next small step is to add email and city, then organise the card-building code so it is easier to maintain.

## Learning goals

By working through this entry, you should be able to:

- Create more than one child element inside a card.
- Read nested API data such as `user.address.city`.
- Use optional chaining (`?.`) and nullish coalescing (`??`) for missing data.
- Separate card creation from card insertion with a reusable function.
- Render an array of users without repeating DOM code.
- Show loading, success, and error messages.
- Use `textContent` for API data instead of inserting it as HTML.

---

## 1. Add an email paragraph

You already have a card:

```js
const card = document.createElement("div");
card.className = "user-card";

card.textContent = user.name;
```

Now create a paragraph for the email:

```js
const email = document.createElement("p");
email.textContent = user.email;
```

At this point, the paragraph exists in memory. It is not inside the card until you append it:

```js
card.appendChild(email);
```

**Yaad rakho:** `createElement()` creates a node; `appendChild()` places that node inside another node.

## 2. Add the city from nested data

The JSONPlaceholder user object contains an `address` object, and the city is inside it:

```js
user.address.city
```

Create another paragraph:

```js
const city = document.createElement("p");
city.textContent = user.address.city;
card.appendChild(city);
```

### What do `?.` and `??` do?

Sometimes a field may be missing. This expression safely handles a missing address or city:

```js
const cityName = user.address?.city ?? "Not available";
```

- `?.` stops property access and returns `undefined` if the value before it is `null` or `undefined`.
- `??` uses the fallback only when the left side is `null` or `undefined`.

This is useful with API data because not every API record is guaranteed to contain every optional field.

## 3. Add a heading and multiple paragraphs

A card should have a heading for the name and paragraphs for the email and city:

```js
const name = document.createElement("h2");
name.textContent = user.name;

const email = document.createElement("p");
email.textContent = `Email: ${user.email}`;

const city = document.createElement("p");
city.textContent = `City: ${user.address?.city ?? "Not available"}`;

card.append(name, email, city);
```

`append()` can insert multiple nodes in one call. You can also use separate `appendChild()` calls:

```js
card.appendChild(name);
card.appendChild(email);
card.appendChild(city);
```

Both approaches work here.

## 4. Put card creation in a function

If all DOM creation stays inside `getUsers()`, the function can become difficult to read. Create a separate function that builds one card and returns it:

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

Important distinction:

- `createUserCard(user)` creates and returns a DOM element.
- It does not put the card on the page by itself.
- The caller inserts the returned card into `usersContainer`.

## 5. Render every user

The API returns an array. Use `forEach()` to build and insert one card per user:

```js
data.forEach((user) => {
  const card = createUserCard(user);
  usersContainer.appendChild(card);
});
```

The callback runs once for each user object. Each call to `createUserCard()` creates a new card.

Before rendering fresh results, clear old cards:

```js
usersContainer.replaceChildren();
```

This prevents duplicate cards if you call the API function more than once.

## 6. Complete browser example

HTML required by the JavaScript:

```html
<p id="status">Waiting...</p>
<div id="users-container"></div>
<script src="app.js" defer></script>
```

JavaScript:

```js
const statusElement = document.getElementById("status");
const usersContainer = document.getElementById("users-container");

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

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Expected an array of users.");
    }

    data.forEach((user) => {
      usersContainer.appendChild(createUserCard(user));
    });

    statusElement.textContent = `Loaded ${data.length} users.`;
  } catch (error) {
    statusElement.textContent = "Could not load users.";
    console.error(error.message);
  }
}

getUsers();
```

Use the `defer` attribute on the script (as shown above), or place the script after the relevant HTML, so the elements exist before JavaScript selects them.

## 7. Why use textContent instead of innerHTML?

Prefer:

```js
name.textContent = user.name;
```

Avoid putting untrusted API data directly into an HTML string:

```js
// Avoid this for untrusted data:
card.innerHTML = `<h2>${user.name}</h2>`;
```

With `textContent`, the value is treated as text. With `innerHTML`, the browser parses the value as markup, which can create a cross-site scripting (XSS) risk when the value is untrusted.

## 8. Common mistakes

1. **Creating an email paragraph but not appending it:** it will not appear inside the card.
2. **Appending the card before adding its children:** this can work, but make sure the children are still added to the correct card.
3. **Using `user.city`:** in this API, city is nested at `user.address.city`.
4. **Assuming every nested field exists:** use a safe fallback when data may be missing.
5. **Appending the same card node more than once:** a DOM node is moved, not copied.
6. **Putting all card-building code inside the fetch loop:** a helper function makes the code easier to read and reuse.
7. **Using `innerHTML` with API values:** use `textContent` for plain text.
8. **Forgetting to clear the container before a new render:** old cards may remain.

## Run the example

This is browser-side code. Add the HTML skeleton above, save the JavaScript as `app.js`, and open the page in a browser. An internet connection is required for the JSONPlaceholder request. Do not run this DOM example directly with Node.js because it uses `document`.

From the repository root:

- `Day13/README.md`
- `Day13/examples.js`
- `Day13/questions.js`

Pehle har line ka purpose samjho, output predict karo, phir browser mein run karke verify karo. Yeh practice entry hai—completion assume nahi karti.
