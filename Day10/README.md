# Day 10 — Asynchronous JavaScript, Callbacks, Promises & async/await

**Status: revision/practice material.** This entry is a structured practice guide for asynchronous JavaScript. It explains the ideas behind delayed callbacks, Promises, and the `async`/`await` syntax. It does not claim that the learner has completed or mastered every section.

## Learning goals

By working through this entry, you should be able to:

- Distinguish synchronous code from asynchronous work.
- Explain the basic role of the call stack and event loop.
- Recognize an asynchronous callback.
- Describe the three states of a Promise.
- Handle Promise results with `.then()`, `.catch()`, and `.finally()`.
- Explain why `async` functions always return Promises.
- Use `await` and `try...catch` to write readable asynchronous code.
- Recognize a common mistake: expecting `forEach()` to wait for asynchronous callbacks.

## 1. Synchronous vs asynchronous JavaScript

**Synchronous code** runs one statement at a time in order. A later statement waits until the current statement finishes.

```js
console.log("First");
console.log("Second");
console.log("Third");
```

Output:

```text
First
Second
Third
```

Some operations take time: timers, network requests, file operations, and user interactions. If JavaScript had to wait synchronously for all of them, the application could become unresponsive.

**Asynchronous code** lets the runtime handle an operation and continue executing other available code. When the operation is ready, its callback or Promise reaction can be scheduled.

Important: JavaScript does not make every operation asynchronous. Normal calculations and ordinary function calls still run synchronously.

## 2. A beginner-friendly event loop model

Use this simplified model:

1. **Call stack:** JavaScript executes the current synchronous function calls here.
2. **Runtime/host APIs:** The browser or Node.js runtime handles supported asynchronous operations, such as timers and network I/O.
3. **Task queue:** Some callbacks, such as timer callbacks, are scheduled as tasks.
4. **Microtask queue:** Promise reactions such as `.then()`, `.catch()`, and code after an awaited Promise are scheduled as microtasks.
5. **Event loop:** When the current stack is clear, the runtime processes queued work. Microtasks are processed before the next ordinary task in the usual browser event-loop model.

Example:

```js
console.log("A");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("B");
```

Typical output:

```text
A
B
Promise
Timer
```

Why?

- `A` and `B` are synchronous, so they run first.
- The Promise callback is queued as a microtask.
- The timer callback is queued as a task.
- After the current synchronous code finishes, the Promise microtask runs before the timer task.

A delay of `0` does **not** mean that a timer callback runs immediately. It means the callback becomes eligible to run after the current work and scheduling rules allow it.

This is a simplified model. Browsers and Node.js have runtime-specific event-loop details.

## 3. Callback-based asynchronous code

A **callback** is a function passed to another function so it can be called later or at a chosen point.

```js
function greetLater(name, callback) {
  setTimeout(() => {
    callback("Hello, " + name);
  }, 500);
}

greetLater("Pranjal", (message) => {
  console.log(message);
});

console.log("This runs before the timer callback");
```

The callback is not executed at the moment it is passed. The timer callback invokes it later.

Callbacks are still useful, but deeply nested callbacks can become difficult to read and maintain. Promises provide a standard way to represent the eventual result or failure of asynchronous work.

## 4. Promises

A **Promise** is an object representing the eventual result of an asynchronous operation.

A Promise has three states:

| State | Meaning |
|---|---|
| `pending` | The operation has not settled yet. |
| `fulfilled` | The operation completed successfully with a value. |
| `rejected` | The operation failed with a reason/error. |

A Promise settles only once: it becomes fulfilled or rejected. It cannot go back to pending or switch to the other settled state.

### Creating a Promise

```js
const task = new Promise((resolve, reject) => {
  const isSuccessful = true;

  if (isSuccessful) {
    resolve("Task completed");
  } else {
    reject(new Error("Task failed"));
  }
});
```

- `resolve(value)` fulfills the Promise.
- `reject(error)` rejects the Promise.
- The Promise executor function runs synchronously when the Promise is constructed. Any asynchronous work inside it may finish later.

### Handling success and failure

```js
task
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    console.log("Task settled");
  });
```

- `.then()` handles fulfillment.
- `.catch()` handles rejection.
- `.finally()` runs after settlement whether fulfilled or rejected. It receives no fulfillment value or rejection reason as an argument.

### Promise chaining

Each call to `.then()` returns a new Promise. Return the next value from a handler to pass it down the chain.

```js
Promise.resolve(5)
  .then((number) => number * 2)
  .then((number) => number + 3)
  .then((result) => {
    console.log(result); // 13
  });
```

If a handler returns another Promise, the next step waits for that Promise to settle.

If a handler throws an error, the chain becomes rejected and the next rejection handler can catch it.

## 5. async and await

`async` and `await` are syntax built around Promises. They make asynchronous code easier to read; they do not turn asynchronous work into synchronous blocking work.

### async function

An `async` function always returns a Promise.

```js
async function getMessage() {
  return "Hello";
}

getMessage().then((message) => {
  console.log(message); // Hello
});
```

Even though the function returns a plain string, JavaScript wraps that result in a fulfilled Promise.

If an error is thrown inside an async function, the returned Promise is rejected.

### await

`await` waits for a Promise to settle and gives the fulfilled value back to the surrounding async function. It pauses that async function's progress; it does not block the entire JavaScript thread.

```js
function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function runTask() {
  console.log("Start");
  await wait(500);
  console.log("Half a second later");
}

runTask();
console.log("This can run while runTask is waiting");
```

Use `await` inside an `async` function in ordinary JavaScript scripts. Modern JavaScript modules also support top-level `await`.

### Error handling with try...catch

A rejected Promise awaited inside a `try` block throws at the `await` expression. Handle it with `catch`.

```js
async function loadData() {
  try {
    const result = await Promise.reject(new Error("Network unavailable"));
    console.log(result);
  } catch (error) {
    console.error("Could not load data:", error.message);
  } finally {
    console.log("Finished attempting the operation");
  }
}

loadData();
```

## 6. Promise.all() — wait for multiple Promises

`Promise.all()` fulfills when all supplied Promises fulfill. Its result is an array in the same order as the input Promises. It rejects as soon as one input rejects.

```js
const first = Promise.resolve("A");
const second = Promise.resolve("B");

Promise.all([first, second]).then((results) => {
  console.log(results); // ["A", "B"]
});
```

Use it when independent operations can run concurrently and you need all their results. It does not cancel the other operations if one rejects.

## 7. A common mistake: async callbacks inside forEach()

`forEach()` does not wait for Promises returned by its callback.

This code starts asynchronous callbacks, but the outer function does not wait for all of them:

```js
items.forEach(async (item) => {
  await processItem(item);
});

console.log("This may run before the items finish");
```

If you need to process items one after another, use `for...of`:

```js
for (const item of items) {
  await processItem(item);
}
```

If independent items can run concurrently, use `Promise.all()` with `map()`:

```js
await Promise.all(items.map((item) => processItem(item)));
```

Do not use `await items.forEach(...)`; `forEach()` returns `undefined`, not a Promise representing all callback work.

## 8. Common mistakes

1. Assuming `setTimeout(callback, 0)` runs before the remaining synchronous code.
2. Thinking a Promise executor itself runs later. The executor runs immediately; asynchronous work inside it may finish later.
3. Forgetting to return a value from a `.then()` handler when the next step needs it.
4. Forgetting that an `async` function always returns a Promise.
5. Assuming `await` blocks the entire JavaScript thread. It pauses only the current async function.
6. Leaving a rejected Promise unhandled.
7. Expecting `forEach()` to wait for async callbacks.
8. Using `Promise.all()` when operations actually depend on one another. In that case, sequence them with `await`.

## Run the files

From the repository root:

```bash
node Day10/examples.js
node Day10/questions.js
```

Pehle output predict karo, phir Node.js se run karke verify karo. Questions ke solutions self-check ke liye comments ke baad diye gaye hain.
