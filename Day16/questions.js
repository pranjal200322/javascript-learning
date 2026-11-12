// Day 16 — Questions and Solutions
// Topic: Live User Search with input events and Array.filter()
// These questions refer to the User Directory browser example in examples.js.

// ------------------------------------------------------------
// QUESTIONS
// ------------------------------------------------------------

// Q1. Which DOM property gives you the current text inside an input element?

// Q2. Which event should you listen for when you want search results to
//     update as the user types?

// Q3. Write an addEventListener() call that runs searchUsers when the
//     search input changes.

// Q4. What does Array.filter() return? Does it change the original array?

// Q5. Why should every search filter allUsers instead of filtering the
//     results from the previous search?

// Q6. Write an expression that reads the input, removes whitespace from
//     its beginning/end, and converts it to lowercase.

// Q7. Complete the filter callback so it keeps users whose name contains
//     searchTerm, without case sensitivity.

// Q8. Why do we call user_container.replaceChildren() before adding cards?

// Q9. What should happen when the search input is cleared?

// Q10. Why is textContent preferred over innerHTML for displaying API data?

// Q11. What should the page display if the filtered array has zero items?

// Q12. Why is the search input disabled while the initial API request is
//      still loading?

// ------------------------------------------------------------
// SOLUTIONS
// ------------------------------------------------------------

// Solution 1
// inputElement.value

// Solution 2
// The "input" event. It fires when the user edits the value.

// Solution 3
// searchInput.addEventListener("input", searchUsers);

// Solution 4
// filter() returns a new array containing the items whose callback
// returned true. It does not modify the original array.

// Solution 5
// Filtering the original allUsers array means every search starts with
// the complete data. If we keep filtering only the previous results,
// users removed by an earlier search cannot reappear when the query changes.

// Solution 6
// const searchTerm = searchInput.value.trim().toLowerCase();

// Solution 7
// const filteredUsers = allUsers.filter((user) => {
//   const name = typeof user.name === "string"
//     ? user.name.toLowerCase()
//     : "";
//
//   return name.includes(searchTerm);
// });

// Solution 8
// It removes cards from the previous render. Without clearing the
// container, each search would add more cards instead of replacing them.

// Solution 9
// trim() and toLowerCase() produce an empty search term. Every string
// includes an empty string, so the full list of users is shown again.

// Solution 10
// textContent inserts the API value as plain text. innerHTML parses a
// string as markup, which can create an injection/XSS risk with untrusted data.

// Solution 11
// Clear the old cards and show a message such as:
// statusElement.textContent = "No users match your search.";

// Solution 12
// It prevents the user from searching before the API data is available.
// Enable it after the request succeeds and allUsers has been populated.

// ------------------------------------------------------------
// INTEGRATED PRACTICE CHECK
// ------------------------------------------------------------

// Build the live search flow:
//
// 1. Store the complete API result in allUsers.
// 2. Listen for the "input" event on searchInput.
// 3. Read searchInput.value, then call trim() and toLowerCase().
// 4. Use allUsers.filter() and name.includes(searchTerm).
// 5. Pass the filtered array to renderUsers().
// 6. In renderUsers(), clear user_container with replaceChildren().
// 7. Create and append one card for every matching user.
// 8. Show a no-results message when the filtered array is empty.
//
// The complete browser implementation is in examples.js.
//