# Day 11 — JSON, HTTP & Fetch API Basics

**Status: revision/practice material.** This entry covers the data format and HTTP/API concepts that connect asynchronous JavaScript to real API responses. It is written as practice material and does not claim that every section has already been completed or mastered.

## Learning goals

By working through this entry, you should be able to:

- Explain what JSON is and how it differs from a JavaScript object.
- Convert JavaScript data to JSON with `JSON.stringify()`.
- Convert JSON text to JavaScript data with `JSON.parse()`.
- Understand the basic request/response cycle of an HTTP API.
- Recognize common HTTP methods and status-code groups.
- Make a GET request using `fetch()`.
- Read a JSON response using `response.json()`.
- Check `response.ok` and `response.status`.
- Handle network errors and unsuccessful HTTP responses separately.
- Send JSON data in a POST request.

---

## 1. What is JSON?

**JSON** stands for **JavaScript Object Notation**. It is a text format used to store and exchange structured data. APIs commonly send and receive JSON.

A JavaScript object:

```js
const user = {
  name: "Pranjal",
  age: 23,
  isLearning: true
};
```

Equivalent JSON text:

```json
{
  "name": "Pranjal",
  "age": 23,
  "isLearning": true
}
```

JSON looks similar to JavaScript object syntax, but JSON is text and follows stricter rules:

- Property names and string values must use double quotes.
- JSON supports strings, numbers, booleans, `null`, arrays, and objects.
- JSON does not support functions, `undefined`, comments, or trailing commas.
- JSON is not itself a JavaScript object. It must be parsed before you access its properties as JavaScript data.

## 2. Convert JavaScript data to JSON: JSON.stringify()

Use `JSON.stringify()` when you need to turn JavaScript data into JSON text.

```js
const user = {
  name: "Pranjal",
  skills: ["JavaScript", "Node.js"],
  active: true
};

const jsonText = JSON.stringify(user);

console.log(jsonText);
console.log(typeof jsonText); // string
```

This is commonly needed when sending a JSON request body to an API.

You can format JSON text for readability:

```js
const readableJson = JSON.stringify(user, null, 2);
console.log(readableJson);
```

The second argument is a replacer; `null` means no custom filtering. The third argument controls indentation.

## 3. Convert JSON text to JavaScript data: JSON.parse()

Use `JSON.parse()` when you receive valid JSON text and need to work with it in JavaScript.

```js
const jsonText = '{"name":"Pranjal","age":23}';

const user = JSON.parse(jsonText);

console.log(user.name); // Pranjal
console.log(user.age);  // 23
```

Important: `JSON.parse()` expects valid JSON text. Invalid JSON throws a `SyntaxError`, so parsing untrusted or uncertain text may need `try...catch`.

```js
try {
  const data = JSON.parse('{"name":"Aman"}');
  console.log(data.name);
} catch (error) {
  console.error("Invalid JSON:", error.message);
}
```

## 4. What is an API?

**API** stands for **Application Programming Interface**. In web development, an API often lets one application request data or services from another application.

For example:

- Your frontend asks an API for a list of users.
- The server receives the request.
- The server sends an HTTP response, often containing JSON.
- Your JavaScript reads the response and uses the returned data.

An **endpoint** is a URL that identifies a particular API resource. For example:

```text
https://jsonplaceholder.typicode.com/users
```

This endpoint provides sample user data for practice.

## 5. HTTP request and response

HTTP is a protocol used for communication between clients and servers.

A simplified request/response cycle:

1. The client sends an HTTP request to an endpoint.
2. The request may include a method, headers, and a body.
3. The server processes the request.
4. The server returns a response with a status code, headers, and possibly a body.

### Common HTTP methods

| Method | Typical purpose |
|---|---|
| `GET` | Read or retrieve data |
| `POST` | Send data or create a resource |
| `PUT` | Replace a resource |
| `PATCH` | Partially update a resource |
| `DELETE` | Delete a resource |

The exact behavior depends on the API, but these are the common conventions.

### Common status-code groups

| Status | Meaning |
|---|---|
| `2xx` | Request succeeded |
| `3xx` | Redirection |
| `4xx` | Client-side/request problem |
| `5xx` | Server-side problem |

Examples:

- `200 OK`: request succeeded.
- `201 Created`: a resource was created.
- `400 Bad Request`: the request was invalid.
- `401 Unauthorized`: authentication is missing or invalid.
- `404 Not Found`: requested resource was not found.
- `500 Internal Server Error`: server encountered an error.

## 6. Fetch API — make an HTTP request

`fetch()` is a browser API (also available globally in modern Node.js versions) for making network requests. It returns a Promise that fulfills with a `Response` object when a response is received.

Basic GET request:

```js
async function getUsers() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  console.log(response.status);
  console.log(response.ok);

  const data = await response.json();
  console.log(data);
}

getUsers();
```

Understand each line:

- `fetch(url)`: starts the request and returns a Promise.
- `await`: waits for that Promise inside the async function.
- `response`: the HTTP `Response` object.
- `response.status`: numeric HTTP status, such as `200`.
- `response.ok`: `true` when the status is in the 200–299 range; otherwise `false`.
- `response.json()`: reads the response body and parses JSON. It also returns a Promise, so use `await`.

### Important: fetch does not reject for every HTTP error

A `404` or `500` response normally still fulfills the Promise returned by `fetch()`. Therefore, checking only `try...catch` is not enough to detect unsuccessful HTTP statuses.

Check `response.ok` yourself:

```js
async function getUsers() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.error("Request failed:", error.message);
  }
}

getUsers();
```

This separates two kinds of problems:

- **HTTP error response:** The server responded, but the status was unsuccessful. Check `response.ok`.
- **Network/request error:** The request could not complete, for example due to a connection failure. The Promise rejects and control goes to `catch`.

JSON parsing can also fail if the response body is not valid JSON.

## 7. Sending JSON with a POST request

When an API expects JSON data, commonly send:

- `method: "POST"`
- `Content-Type: "application/json"` header
- A JSON string created with `JSON.stringify()` as the body

```js
async function createPost() {
  const newPost = {
    title: "Learning JavaScript",
    body: "Practising HTTP requests",
    userId: 1
  };

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const createdPost = await response.json();
  console.log(createdPost);
}

createPost().catch(error => {
  console.error(error.message);
});
```

JSONPlaceholder is a testing API. It simulates creating a post and returns a response, but it does not permanently save the new post.

## 8. Common mistakes

1. **Treating JSON text as an object:** Parse it with `JSON.parse()` before accessing properties.
2. **Using single quotes in JSON:** JSON strings and property names require double quotes.
3. **Forgetting `JSON.stringify()` in a JSON request body:** The body should be JSON text, not a plain JavaScript object.
4. **Forgetting `await response.json()`:** Parsing the response body is asynchronous and returns a Promise.
5. **Assuming `fetch()` rejects on 404 or 500:** Check `response.ok` or `response.status`.
6. **Confusing `response` with response data:** `response` is a Response object; parsed data comes from `response.json()`.
7. **Assuming every API response is JSON:** Some endpoints return text, images, files, or an empty body. Use the appropriate response-reading method.
8. **Assuming a successful POST to a test API permanently stores data:** Read the API documentation to understand what the service actually does.

## Run the files

The examples use modern Node.js with global `fetch` (Node.js 18 or later) and require an internet connection for the API requests.

From the repository root:

```bash
node Day11/examples.js
node Day11/questions.js
```

Pehle output predict karo, phir Node.js se run karke verify karo. Questions ke solutions self-check ke liye comments ke baad diye gaye hain.
