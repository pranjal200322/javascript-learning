# Day 18 — Event Delegation for Dynamic User Cards

**Status: forward practice material.** The User Directory is being built incrementally. First finish the basic cards (name, email, and city), then practise the loading/error, search, and sorting extensions from the earlier entries. This lesson adds a small interactive feature to each card; it does not claim those earlier tasks are complete.

## Learning goals

By working through this entry, you will learn:

- What an event listener does.
- What event bubbling means.
- Why dynamically created buttons can be handled with event delegation.
- How to use \`event.target\` and \`closest()\`.
- How to store an ID in a \`data-*\` attribute and read it through \`dataset\`.
- How to show and hide extra details with the \`hidden\` property.
- How \`aria-expanded\` communicates the expanded state to assistive technology.

## 1. Add a details button to every card

A user card can show basic information first and reveal extra information only when requested.

Inside your \`createUserCard(user)\` function, create a button and a paragraph for the extra details:

~~~js
const button = document.createElement("button");
button.type = "button";
button.className = "details-toggle";
button.textContent = "Show details";
button.dataset.userId = String(user.id);
button.setAttribute("aria-expanded", "false");

const details = document.createElement("p");
details.className = "user-details";
details.hidden = true;

card.append(button, details);
~~~

The \`data-user-id\` attribute stores the user's ID on the button. In JavaScript, \`button.dataset.userId\` reads that value as a string.

The details paragraph starts hidden. It will be filled when the button is clicked.

## 2. Understand event bubbling

When a button is clicked, the click event can travel upward through its ancestors. This is called **event bubbling**.

For a card inside the users section, the event path includes:

1. The clicked button.
2. Its card.
3. The users container.
4. Other ancestors in the document.

Because the click bubbles, you can listen once on the users container and handle clicks from all the buttons inside it.

## 3. Use event delegation

Instead of attaching a separate click listener to every button, attach one listener to the parent container:

~~~js
usersContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button.details-toggle");

  if (!button || !usersContainer.contains(button)) {
    return;
  }

  console.log("Clicked user ID:", button.dataset.userId);
});
~~~

Important details:

- \`event.target\` is the element where the event started.
- \`closest()\` searches that element and its ancestors for a matching selector.
- The \`contains()\` check ensures the matching button belongs to this users container.
- The listener is attached once, even though cards and buttons are created later.

The \`instanceof Element\` check in the complete example makes sure the event target supports DOM element methods before calling \`closest()\`.

## 4. Find the user and toggle the details

The complete handler uses the ID stored on the clicked button to find the matching object in \`allUsers\`:

~~~js
const userId = Number(button.dataset.userId);
const selectedUser = allUsers.find((user) => user.id === userId);
~~~

Dataset values are strings, while the API's \`id\` field is a number. Convert the dataset value with \`Number()\` before comparing.

Then reveal or hide the details:

~~~js
const details = button.nextElementSibling;

if (!selectedUser || !details) {
  return;
}

const willOpen = details.hidden;

if (willOpen) {
  details.textContent =
    "Company: " + (selectedUser.company?.name ?? "Not available") +
    " | Phone: " + (selectedUser.phone ?? "Not available");
}

details.hidden = !willOpen;
button.textContent = willOpen ? "Hide details" : "Show details";
button.setAttribute("aria-expanded", String(willOpen));
~~~

- If details are hidden, \`willOpen\` is \`true\`, so the code fills and reveals them.
- If details are visible, \`willOpen\` is \`false\`, so the code hides them.
- \`aria-expanded\` is updated to \`"true"\` or \`"false"\` to match the visible state.

## 5. Complete browser example

The complete version is in [examples.js](examples.js). Use this HTML:

~~~html
<div id="status">Users will appear here...</div>
<section id="users-container" class="users-grid"></section>
<script src="examples.js" defer></script>
~~~

Keep your existing \`.user-card\` and \`.users-grid\` CSS. You can style \`.details-toggle\` and \`.user-details\` later; the feature works without extra CSS.

Open the page in a browser with an internet connection. This example uses browser APIs and JSONPlaceholder, so it is not intended to run directly with Node.js.

## 6. Common mistakes

1. **Adding a listener to each button inside the render loop:** it works, but creates many listeners. Event delegation uses one listener on the parent.
2. **Listening on the container before it exists:** load the script with \`defer\` or place it after the HTML.
3. **Assuming \`event.target\` is always the button:** the click may start on a nested element. Use \`closest()\`.
4. **Forgetting that dataset values are strings:** convert the ID with \`Number()\` when comparing it with numeric API IDs.
5. **Using the wrong parent:** attach the delegated listener to the container that owns the dynamic cards.
6. **Not updating \`aria-expanded\`:** keep the accessibility state in sync with the visible details.
7. **Using \`innerHTML\` for API values:** use \`textContent\` to insert API data as text.

## Practice checklist

- [ ] Add a details button and hidden paragraph to each card.
- [ ] Store the user ID in \`button.dataset.userId\`.
- [ ] Add one click listener to the users container.
- [ ] Use \`closest()\` to identify the clicked details button.
- [ ] Find the matching user with \`Array.find()\`.
- [ ] Toggle the details paragraph and button label.
- [ ] Update \`aria-expanded\` whenever the details open or close.
- [ ] Confirm that buttons still work after the cards are re-rendered.

These are practice checkpoints, not a claim that the feature has already been completed.
