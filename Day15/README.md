# Day 15 — Loading, Success & Error States in the User Directory

**Status: practice/revision material.** This entry continues the JSONPlaceholder User Directory. The previous entries cover fetching users and building cards with name, email, and city. This entry focuses on showing the user what is happening while the request runs, and handling unsuccessful responses safely. It does not assume that these steps have already been completed.

## Learning goals

By working through this entry, you should be able to:

- Show a loading message before starting an API request.
- Use `try...catch` around asynchronous request code.
- Check `response.ok` before reading the response body.
- Throw an error for an unsuccessful HTTP status.
- Show a success message after users have been rendered.
- Show a friendly error message if the request or parsing fails.
- Distinguish an HTTP error response from a network error.

## 1. The status element

The HTML already contains a status element:

```html
<div id="status">Users will appear here...</div>
<section id="users-container" class="users-grid"></section>
```

Select it in JavaScript:

```js
const status = document.getElementById("status");
const user_container = document.getElementById("users-container");
```

The `status` variable refers to the HTML element. You can change the message displayed inside it with `textContent`.

For example:

```js
status.textContent = "Loading users...";
```

Set this message **before** calling `fetch()`. The user can then see that the request has started.

## 2. Put the request inside try...catch

A network request can fail. JSON parsing can also fail. Use `try...catch` so the program can handle those errors instead of stopping without a useful message.

```js
try {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

The code in `try` is attempted. If an awaited Promise rejects or an error is thrown, execution moves to `catch`.

## 3. Check response.ok

One important detail: **fetch normally does not reject just because the server responds with HTTP 404 or 500.**

For example, a 404 response is still an HTTP response. Therefore, `try...catch` alone does not identify every unsuccessful HTTP status.

Check `response.ok`:

```js
const response = await fetch(
  "https://jsonplaceholder.typicode.com/users"
);

if (!response.ok) {
  throw new Error("HTTP error: " + response.status);
}
```

- `response.ok` is `true` for status codes from 200 to 299.
- `response.status` gives the numeric HTTP status, such as `200` or `404`.
- `throw new Error(...)` creates an error and sends control to the nearest matching `catch`.

Check the response before calling `response.json()`.

## 4. Show loading, success, and error messages

The basic flow is:

1. Show `Loading users...`.
2. Clear cards from an earlier render.
3. Send the request.
4. Check `response.ok`.
5. Convert the response body to JSON.
6. Build and append the user cards.
7. Show the number of users loaded.
8. If an error occurs, show a friendly message and log the technical error.

The success message should be set **after** the cards have been created. Otherwise, the page could say that users loaded before rendering has finished.

## 5. Complete browser example

This example follows the current project structure and uses the same IDs and variable names.

```js
const status = document.getElementById("status");
const user_container = document.getElementById("users-container");

async function getUsers() {
  if (!status || !user_container) {
    console.error("Required HTML elements were not found.");
    return;
  }

  status.textContent = "Loading users...";
  user_container.replaceChildren();

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

    status.textContent = `Loaded ${data.length} users.`;
  } catch (error) {
    status.textContent = "Could not load users. Please try again.";
    console.error("Could not load users:", error);
  }
}

getUsers();
```

The matching HTML is:

```html
<div id="status">Users will appear here...</div>
<section id="users-container" class="users-grid"></section>
<script src="app.js" defer></script>
```

The `defer` attribute lets the browser parse the HTML before executing the external script. An internet connection is required for the API request.

## 6. HTTP errors vs network errors

These are different situations:

| Situation | What happens | How this example handles it |
|---|---|---|
| HTTP 404 or 500 | The server sends a response with an unsuccessful status | `response.ok` is false, so the code throws an error |
| Network failure | The request cannot receive a usable response | The rejected `fetch()` Promise is handled by `catch` |
| Invalid JSON body | The response body cannot be parsed as JSON | `response.json()` rejects and `catch` handles it |

A friendly message is useful for the person using the page. Logging the actual error is useful while debugging.

## 7. Common mistakes

1. **Setting the loading message after the request:** set it before `fetch()` so it appears while the request is pending.
2. **Assuming try...catch detects HTTP 404/500 automatically:** check `response.ok`.
3. **Checking response.ok after response.json():** check the HTTP status before parsing the body.
4. **Showing success before rendering:** set the success message after the loop finishes.
5. **Showing technical error details directly to users:** show a simple message in the page and log the error for debugging.
6. **Forgetting to clear old cards:** repeated calls can otherwise leave duplicate cards.
7. **Not checking selected elements:** `getElementById()` returns `null` if the HTML ID does not exist.

## Practice checklist

- [ ] Show `Loading users...` before the request.
- [ ] Put the request and rendering code inside `try`.
- [ ] Check `response.ok` and throw an error for an unsuccessful status.
- [ ] Parse the response with `await response.json()`.
- [ ] Render each user's name, email, and city.
- [ ] Show a success message after rendering.
- [ ] Show a friendly error message inside `catch`.
- [ ] Test the normal request and inspect the browser console.

These are practice checkpoints, not a claim that the work has already been completed.

## Run it

Open the project HTML page in a browser. This example uses browser DOM APIs, so do not run it directly with `node examples.js`. The API request requires an internet connection.
