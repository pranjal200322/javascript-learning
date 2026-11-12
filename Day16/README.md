# Day 16 — Search Users with DOM Events and Array.filter()

**Status: forward practice material.** The current User Directory exercise is still being built step by step. First finish adding the city to each card, and work through the loading/success/error handling from Day 15. This entry is a next extension; it does not assume those tasks are already complete.

## Learning goals

By working through this entry, you will learn to:

- Read text from an HTML input using `value`.
- React to typing with the `input` event and `addEventListener()`.
- Keep the original API data in an array.
- Use `Array.filter()` to create a matching subset.
- Search without worrying about uppercase/lowercase differences.
- Re-render cards without leaving old results on the page.

## 1. Add a search input in HTML

Place the input above the users container:

```html
<div id="status">Users will appear here...</div>

<label for="search-input">Search users by name</label>
<input
  id="search-input"
  type="search"
  placeholder="Type a name..."
  disabled
/>

<section id="users-container" class="users-grid"></section>

<script src="app.js" defer></script>
```

The input starts as disabled. JavaScript will enable it after the users have loaded successfully.

## 2. Keep the original users array

After the API response has been converted to JSON, save the array in a variable outside the fetch function:

```js
let allUsers = [];
```

After fetching and validating the response:

```js
allUsers = data;
```

Why keep this array? Search should always work against the complete list. If you replace `allUsers` with the filtered results after every keystroke, deleting the search text may not bring back users that were filtered out earlier.

## 3. Listen for typing

Select the input:

```js
const searchInput = document.getElementById("search-input");
```

Listen for the `input` event:

```js
searchInput.addEventListener("input", () => {
  console.log(searchInput.value);
});
```

The `input` event runs whenever the user changes the input value. It is a better fit for live search than waiting for a button click.

## 4. Filter names

Read the typed text, remove extra whitespace from its beginning/end, and convert it to lowercase:

```js
const searchTerm = searchInput.value.trim().toLowerCase();
```

Use `filter()` to create a new array containing matching users:

```js
const filteredUsers = allUsers.filter((user) => {
  const name = typeof user.name === "string"
    ? user.name.toLowerCase()
    : "";

  return name.includes(searchTerm);
});
```

Important points:

- `filter()` checks every array item and returns a **new array** containing items for which the callback returns `true`.
- `includes()` checks whether a string contains the search text.
- `toLowerCase()` makes the comparison case-insensitive.
- `trim()` removes whitespace from the beginning and end of the query.
- An empty search term matches every string name, so clearing the input shows the full list again.

## 5. Separate card creation from rendering

A helper function makes the code easier to reuse:

```js
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
```

This function creates and returns one card. It does not insert the card into the page.

Now make a rendering function:

```js
function renderUsers(users) {
  user_container.replaceChildren();

  users.forEach((user) => {
    user_container.appendChild(createUserCard(user));
  });
}
```

`replaceChildren()` clears old cards. Then the loop inserts only the cards for the array passed to `renderUsers()`.

## 6. Connect the input to filtering and rendering

```js
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredUsers = allUsers.filter((user) => {
    const name = typeof user.name === "string"
      ? user.name.toLowerCase()
      : "";

    return name.includes(searchTerm);
  });

  renderUsers(filteredUsers);

  status.textContent = filteredUsers.length === 0
    ? "No users match your search."
    : `Showing ${filteredUsers.length} of ${allUsers.length} users.`;
});
```

Each time the user types:

1. Read and normalise the search text.
2. Filter the original `allUsers` array.
3. Clear the previous cards and render the matching users.
4. Update the status message.

## 7. Complete browser example

The complete runnable version is in [`examples.js`](examples.js). It expects the HTML from section 1 and the existing `.user-card` / `.users-grid` CSS. Load the script with `defer` and open the page with an internet connection.

## 8. Common mistakes

1. **Filtering the already-filtered array:** always filter `allUsers`, the original API result.
2. **Forgetting to clear the container:** old cards remain and new results get added below them. Call `replaceChildren()` before rendering.
3. **Using `change` for live search:** `change` may wait until the input is committed or loses focus; use `input` for immediate updates.
4. **Comparing different letter cases:** normalise both the query and the name with `toLowerCase()`.
5. **Using `innerHTML` for API values:** use `textContent` so API data is inserted as text, not parsed as HTML.
6. **Overwriting `allUsers` with filtered results:** keep the original array unchanged so clearing the search restores every user.

## Self-check

- Does typing `lea` find a name containing those letters, regardless of case?
- Does clearing the search show every user again?
- Does a query with no matches clear the cards and show a no-results message?
- Does each result still display its name, email, and city?
