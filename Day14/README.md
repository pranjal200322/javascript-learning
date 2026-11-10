# Day 14 — Add Email and City to DOM User Cards

**Status: in-progress practice material.** This entry continues the user-card exercise from Day 13. The page already fetches users and displays one card per user. The immediate task is to add an email paragraph inside each card; this practice then adds the user's city.

This entry does **not** assume that the email or city steps have already been completed.

## Learning goals

By working through this entry, you should be able to:

- Create a paragraph element with document.createElement("p").
- Put API data inside it with textContent.
- Insert the paragraph inside the correct card with appendChild().
- Read a nested field such as user.address.city.
- Provide a safe fallback when API data is missing.
- Understand the difference between a JavaScript object and a DOM element.

## 1. Where we are starting

Your loop is similar to this:

~~~js
data.forEach((user) => {
  const card = document.createElement("div");
  card.className = "user-card";
  card.textContent = user.name;

  user_container.appendChild(card);
});
~~~

This creates one card for each user and displays the name. Keep the email and city code **inside this same loop**, because each iteration is working with one particular user.

## 2. Create an email paragraph

First create a paragraph element:

~~~js
const email = document.createElement("p");
~~~

At this moment, the paragraph exists as a DOM node in memory. It is not yet inside the card or visible on the page.

Next, set its text:

~~~js
email.textContent = user.email;
~~~

You can add a label so the value is easier to understand:

~~~js
email.textContent = "Email: " + user.email;
~~~

Finally, put that paragraph inside the current card:

~~~js
card.appendChild(email);
~~~

The three operations have separate jobs:

1. createElement("p") creates the paragraph.
2. textContent sets the paragraph's text.
3. appendChild() inserts the paragraph into the card.

## 3. Add the city paragraph

In the JSONPlaceholder user data, city is nested inside the address object. It is not stored directly as user.city.

The normal property path is:

~~~js
user.address.city
~~~

Create and populate another paragraph:

~~~js
const city = document.createElement("p");
city.textContent = "City: " + user.address.city;
card.appendChild(city);
~~~

### Handle missing values safely

An API may omit a field. Optional chaining and nullish coalescing provide a fallback:

~~~js
const cityName = user.address?.city ?? "Not available";
city.textContent = "City: " + cityName;
~~~

- ?. avoids trying to read city if address is null or undefined.
- ?? uses the fallback only when the left side is null or undefined.

## 4. Put the card code together

This version stays close to the code you are currently writing:

~~~js
data.forEach((user) => {
  const card = document.createElement("div");
  card.className = "user-card";
  card.textContent = user.name;

  const email = document.createElement("p");
  email.textContent = "Email: " + (user.email ?? "Not available");
  card.appendChild(email);

  const city = document.createElement("p");
  city.textContent = "City: " + (user.address?.city ?? "Not available");
  card.appendChild(city);

  user_container.appendChild(card);
});
~~~

For a more semantic structure, you can later replace the name text with a heading:

~~~js
const name = document.createElement("h2");
name.textContent = user.name ?? "Name not available";
card.appendChild(name);
~~~

If you use the heading version, append the name before the email and city paragraphs.

## 5. Complete browser example

The following example is self-contained and fetches the users before creating their cards.

HTML:

~~~html
<div id="user_container"></div>
<script src="examples.js" defer></script>
~~~

JavaScript (also available in examples.js):

~~~js
const user_container = document.getElementById("user_container");

async function loadUsers() {
  if (!user_container) {
    console.error('Element with id="user_container" was not found.');
    return;
  }

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
      throw new Error("Expected the API to return an array.");
    }

    data.forEach((user) => {
      const card = document.createElement("div");
      card.className = "user-card";

      const name = document.createElement("h2");
      name.textContent = user.name ?? "Name not available";

      const email = document.createElement("p");
      email.textContent = "Email: " + (user.email ?? "Not available");

      const city = document.createElement("p");
      city.textContent = "City: " + (user.address?.city ?? "Not available");

      card.append(name, email, city);
      user_container.appendChild(card);
    });
  } catch (error) {
    console.error("Could not load users:", error.message);
    user_container.textContent = "Could not load users.";
  }
}

loadUsers();
~~~

Use defer on the script, as shown, so the browser parses the HTML element before the JavaScript selects it. This example needs an internet connection for the API request.

## 6. Why use textContent?

Use:

~~~js
email.textContent = user.email;
~~~

Avoid inserting untrusted API data through an HTML string:

~~~js
// Avoid this with untrusted API data:
card.innerHTML = "<p>" + user.email + "</p>";
~~~

textContent treats the value as text. innerHTML parses it as markup and can introduce cross-site scripting (XSS) risks when the data is untrusted.

## 7. Common mistakes

1. **Creating the paragraph outside the loop:** then it is not naturally tied to each user's data.
2. **Forgetting appendChild(email):** creating a paragraph does not insert it into the card.
3. **Using user.city:** this API stores city at user.address.city.
4. **Appending to the container instead of the card:** the email should be a child of its user's card.
5. **Using the wrong variable:** user is the current API object; card, email, and city are DOM elements.
6. **Assuming every field exists:** use a fallback for optional data.
7. **Using innerHTML for API values:** use textContent for plain text.
8. **Running the script before the HTML exists:** use defer or place the script after the container.

## Practice checklist

- [ ] Create the email paragraph.
- [ ] Set its text using user.email.
- [ ] Append it to the current card.
- [ ] Create the city paragraph.
- [ ] Read city from user.address.city.
- [ ] Add a fallback for missing city data.
- [ ] Refresh the page and confirm each card shows its own name, email, and city.

These are practice checkpoints, not a claim that the steps have already been completed.

## Run it

Open the HTML page in a browser. Do not run this file directly with Node.js: it uses browser APIs such as document. The API request requires an internet connection.
