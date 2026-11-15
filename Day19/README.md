# Day 19 — Debouncing Search Input

**Status: forward practice material.** This is an optional extension for the User Directory. First get the basic user cards working, including name, email, and city. Then practise the loading/error and search features from the earlier entries. This guide does not claim those tasks are already complete.

## Learning goals

By working through this entry, you will learn:

- Why an input event can run many times while someone types.
- What debouncing means.
- How setTimeout() and clearTimeout() work together.
- How a closure keeps the timer ID available between function calls.
- When debouncing is useful and when it is unnecessary.

## 1. The problem: too many calls

Suppose a user types pranjal into a search box. The browser can fire the input event after each character:

p → pr → pra → pran → pranj → pranja → pranjal

If the event handler filters a large dataset or sends a network request every time, it may do more work than needed.

## 2. What is debouncing?

**Debouncing** means: wait until calls have stopped for a chosen amount of time, then run the function once.

For example, with a 300 millisecond delay:

- A new keystroke clears the previous timer.
- A fresh 300 ms timer starts.
- If another keystroke arrives before the timer finishes, the timer is cleared and restarted.
- When the user pauses for 300 ms, the callback runs.

Debouncing is useful for expensive work such as remote search, autocomplete requests, or costly calculations.

## 3. Build a reusable debounce function

~~~js
function debounce(callback, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
~~~

Understand each part:

- timerId stores the ID returned by setTimeout().
- clearTimeout(timerId) cancels the previous pending timer, if one exists.
- setTimeout() schedules the callback after the delay.
- The returned function is called for every input event.
- The returned function remembers timerId between calls. This is a **closure**.
- ...args forwards any arguments supplied to the returned function.

## 4. Connect it to the User Directory search

Assume allUsers contains the original array returned by the API, and renderUsers(users) clears the old cards and displays the array it receives.

~~~js
function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredUsers = allUsers.filter((user) => {
    const name = typeof user.name === "string"
      ? user.name.toLowerCase()
      : "";

    return name.includes(searchTerm);
  });

  renderUsers(filteredUsers);

  statusElement.textContent = filteredUsers.length === 0
    ? "No users match your search."
    : "Showing " + filteredUsers.length + " users.";
}

const debouncedSearch = debounce(handleSearch, 300);

searchInput.addEventListener("input", debouncedSearch);
~~~

The search still uses the original allUsers array. Do not replace it with filtered results, otherwise clearing the input may not restore the complete list.

## 5. Important: do you always need debounce?

No. The JSONPlaceholder example has only a small number of users, so filtering that small local array on every keystroke is already inexpensive. Debouncing it is mainly a way to learn the technique.

Debouncing becomes more useful when the callback:
- Sends a request to a server.
- Searches a large dataset.
- Performs expensive calculations.
- Triggers other costly work.

For a remote search box, debounce the function that starts the request. If requests can overlap, also learn request cancellation with AbortController; debouncing alone does not cancel a request that has already started.

## 6. Complete browser example

The complete version is in [examples.js](examples.js).

Use this HTML:

~~~html
<div id="status">Users will appear here...</div>

<label for="search-input">Search users by name</label>
<input id="search-input" type="search" placeholder="Type a name..." disabled>

<section id="users-container" class="users-grid"></section>

<script src="examples.js" defer></script>
~~~

Keep the existing .user-card and .users-grid CSS. Open the page in a browser with an internet connection. The example uses Fetch and DOM APIs, so it is not intended to run directly in Node.js.

## 7. Common mistakes

1. **Not clearing the old timer:** without clearTimeout(), each keystroke can leave a separate callback scheduled.
2. **Declaring timerId inside the returned function:** it would be reset on every call, so previous timers could not be cancelled.
3. **Using a very long delay:** the search may feel unresponsive. A few hundred milliseconds is a common starting point, not a universal rule.
4. **Filtering the filtered array:** always search the original allUsers array.
5. **Assuming debounce cancels an active network request:** it only delays the next callback. Use AbortController when an already-started request must be cancelled.
6. **Debouncing every tiny operation:** simple local filtering of a handful of items usually does not need it.

## Practice checklist

- [ ] Write the debounce() function without copying.
- [ ] Explain why timerId must remain available between calls.
- [ ] Connect the debounced handler to the search input's input event.
- [ ] Test by typing several characters quickly.
- [ ] Confirm that clearing the search shows all users again.
- [ ] Compare the behaviour with a direct, non-debounced handler.

These are practice checkpoints, not a claim that the feature has already been completed.
