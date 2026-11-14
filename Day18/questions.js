// Day 18 — Event Delegation for Dynamic User Cards

// Q1. What is event bubbling?
// Q2. Why can one click listener on usersContainer handle clicks from
//     buttons that are created later?
// Q3. What is the difference between event.target and event.currentTarget?
// Q4. Why is closest("button.details-toggle") useful here?
// Q5. What type of value does button.dataset.userId return?
// Q6. Why do we convert dataset.userId with Number()?
// Q7. What does the hidden property do?
// Q8. Why should aria-expanded be updated when the details are toggled?
// Q9. Write a function that finds a user by numeric ID.
// Q10. What is one advantage of event delegation over attaching a listener
//      to every dynamically created button?

// ---------------- SOLUTIONS ----------------

// A1. Event bubbling means an event that starts on an element can travel
//     upward through its ancestors.
// A2. The click event bubbles from the dynamically created button to the
//     already-existing usersContainer, where the single listener receives it.
// A3. event.target is the element where the event originated.
//     event.currentTarget is the element whose listener is currently running.
// A4. closest() finds the nearest matching button, including the target
//     itself. It also works if the click starts on a nested child element.
// A5. dataset values are strings.
// A6. The API user.id is numeric, so Number() makes the types comparable.
// A7. hidden = true hides the element; hidden = false makes it visible.
// A8. aria-expanded exposes the current open/closed state to assistive
//     technology. It should match the actual visibility of the details.
// A9. Example:
function findUserById(users, id) {
  return users.find((user) => user.id === Number(id));
}

// A10. One parent listener handles all current and future matching buttons.
//      This avoids creating and managing a separate listener for every card.

// Extra practice: predict the result before running this snippet.
const demoUsers = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Riya" }
];

console.log(findUserById(demoUsers, "2")); // { id: 2, name: "Riya" }
