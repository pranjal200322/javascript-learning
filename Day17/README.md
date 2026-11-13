# Day 17 — Sort Users by Name with Array.sort()

**Status: forward practice material.** The User Directory is still being built step by step. This entry is an extension to attempt after the basic user cards (name, email, and city) are rendering. It does not claim that the earlier card, loading/error, or search tasks are already complete.

## Learning goals

By the end of this practice, you should understand:

- What `Array.prototype.sort()` does.
- Why a comparator function is needed for reliable string sorting.
- How `localeCompare()` compares names alphabetically.
- Why sorting an array directly changes the original array.
- How to sort a copy with the spread operator.
- How a `change` event on a `select` element can update the displayed order.

## 1. Add a sort control

Place this select element above the users container:

```html
<label for="sort-order">Sort users:</label>
<select id="sort-order">
  <option value="asc">Name: A to Z</option>
  <option value="desc">Name: Z to A</option>
</select>

<section id="users-container" class="users-grid"></section>
```

The select's `value` will be either `"asc"` or `"desc"`.

## 2. Understand sort()

`sort()` rearranges the elements of the array on which it is called. It changes that array in place.

For strings, use a comparator instead of relying on the default sort:

```js
const names = ["Ravi", "Aman", "Zoya"];

names.sort((a, b) => a.localeCompare(b));

console.log(names); // ["Aman", "Ravi", "Zoya"]
```

A comparator returns a negative number when `a` should come before `b`, a positive number when `a` should come after `b`, or zero when they are equivalent for the comparison.

## 3. Avoid changing the original API array

This changes the original array:

```js
allUsers.sort((a, b) => a.name.localeCompare(b.name));
```

If you need to preserve the original API order, make a shallow copy first:

```js
const sortedUsers = [...allUsers];

sortedUsers.sort((a, b) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
);
```

The spread operator creates a new array. The user objects inside it are still the same objects, but sorting the new array does not rearrange `allUsers`.

## 4. Create a reusable sorting function

```js
function sortUsers(users, order) {
  const sortedUsers = [...users];

  sortedUsers.sort((a, b) => {
    const nameA = (a.name ?? "").trim();
    const nameB = (b.name ?? "").trim();

    const result = nameA.localeCompare(nameB, undefined, {
      sensitivity: "base"
    });

    return order === "desc" ? -result : result;
  });

  return sortedUsers;
}
```

- `?? ""` gives a safe empty-string fallback if a name is missing.
- `trim()` removes extra whitespace at the start and end.
- `sensitivity: "base"` makes the comparison ignore case and basic accent differences.
- Negating the comparison result reverses the order for Z to A.
- The function returns a new sorted array and leaves the input array's order unchanged.

## 5. React to the select control

Select the element:

```js
const sortSelect = document.getElementById("sort-order");
```

Listen for changes:

```js
sortSelect.addEventListener("change", () => {
  const sortedUsers = sortUsers(allUsers, sortSelect.value);
  renderUsers(sortedUsers);
});
```

The `change` event runs when the selected option changes. `renderUsers()` should clear the old cards before adding the newly ordered cards.

## 6. Complete browser example

The complete version is in [examples.js](examples.js). It:

1. Fetches the users.
2. Checks `response.ok`.
3. Creates cards with name, email, and city.
4. Stores the fetched array in `allUsers`.
5. Sorts a copy when the selected order changes.
6. Re-renders the cards in the selected order.

Use this HTML with the existing `.user-card` and `.users-grid` CSS:

```html
<div id="status">Users will appear here...</div>

<label for="sort-order">Sort users:</label>
<select id="sort-order">
  <option value="asc">Name: A to Z</option>
  <option value="desc">Name: Z to A</option>
</select>

<section id="users-container" class="users-grid"></section>

<script src="examples.js" defer></script>
```

Open the page in a browser with an internet connection. This example uses browser APIs, so it is not intended to run directly with Node.js.

## 7. Common mistakes

1. **Calling `sort()` on `allUsers` directly:** it mutates the original array. Sort a copy when the original order should be preserved.
2. **Forgetting the comparator:** default sorting converts values to strings and compares them by UTF-16 code units; it is not the best choice for human names.
3. **Returning only `true` or `false` from the comparator:** a comparator should return a negative number, zero, or a positive number.
4. **Forgetting to re-render:** sorting data alone does not change the order of cards already on the page.
5. **Appending without clearing:** old cards remain. Clear the container before rendering the new order.
6. **Using the wrong select value:** read `sortSelect.value`, not the visible label text.

## Practice checklist

- [ ] Add the A to Z / Z to A select control.
- [ ] Write `sortUsers()` using a copied array.
- [ ] Use `localeCompare()` in the comparator.
- [ ] Re-render when the selected option changes.
- [ ] Confirm that A to Z and Z to A both work.
- [ ] Confirm that changing the order does not mutate `allUsers`.

These are checkpoints for practice, not a claim that the project is already complete.
