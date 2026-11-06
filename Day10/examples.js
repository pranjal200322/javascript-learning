// Day 10 — Asynchronous JavaScript, Callbacks, Promises & async/await
// Run: node Day10/examples.js

console.log("\n1. Synchronous execution");

console.log("First");
console.log("Second");
console.log("Third");


console.log("\n2. Timer callback");

setTimeout(() => {
  console.log("Timer callback runs later");
}, 0);

console.log("Synchronous code continues");


console.log("\n3. Promise microtask vs timer task");

console.log("A");

setTimeout(() => {
  console.log("Timer task");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise microtask");
});

console.log("B");
// Typical output order:
// A
// B
// Promise microtask
// Timer task


console.log("\n4. Callback example");

function greetLater(name, callback) {
  setTimeout(() => {
    callback("Hello, " + name);
  }, 100);
}

greetLater("Pranjal", (message) => {
  console.log(message);
});


console.log("\n5. Promise: fulfilled");

const successfulTask = new Promise((resolve) => {
  setTimeout(() => {
    resolve("The task succeeded");
  }, 150);
});

successfulTask
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    console.log("Successful task settled");
  });


console.log("\n6. Promise: rejected");

const failedTask = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("The task failed"));
  }, 200);
});

failedTask
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log("Caught:", error.message);
  })
  .finally(() => {
    console.log("Failed task settled");
  });


console.log("\n7. Promise chaining");

Promise.resolve(5)
  .then((number) => number * 2)
  .then((number) => number + 3)
  .then((result) => {
    console.log("Chained result:", result); // 13
  });


console.log("\n8. async function returns a Promise");

async function getMessage() {
  return "Hello from an async function";
}

getMessage().then((message) => {
  console.log(message);
});


console.log("\n9. await with a delay");

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function runSequentially() {
  console.log("Step 1");

  await wait(250);

  console.log("Step 2 after waiting");

  await wait(250);

  console.log("Step 3 after another wait");
}

runSequentially();
console.log("This line runs while runSequentially is waiting");


console.log("\n10. Error handling with async/await");

async function handleFailure() {
  try {
    await Promise.reject(new Error("Example rejection"));
    console.log("This line will not run");
  } catch (error) {
    console.log("Handled error:", error.message);
  } finally {
    console.log("Cleanup can happen here");
  }
}

handleFailure();


console.log("\n11. Promise.all");

const promiseA = wait(100).then(() => "A finished");
const promiseB = wait(50).then(() => "B finished");

Promise.all([promiseA, promiseB]).then((results) => {
  // Result order matches input order, not completion order.
  console.log("Promise.all results:", results);
});


console.log("\n12. Sequential vs concurrent work");

async function runSequential() {
  const first = await wait(100).then(() => "First");
  const second = await wait(100).then(() => "Second");

  console.log("Sequential:", [first, second]);
}

async function runConcurrent() {
  const results = await Promise.all([
    wait(100).then(() => "First"),
    wait(100).then(() => "Second")
  ]);

  console.log("Concurrent:", results);
}

runSequential();
runConcurrent();


// Note: Timer durations are minimum scheduling delays, not exact guarantees.
// The order between independent timer callbacks with similar delays can vary
// by runtime and scheduling. The key concepts are synchronous execution,
// Promise microtasks, and awaiting the Promises that represent your work.
