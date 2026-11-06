// Day 10 — Questions followed by solutions
// Run: node Day10/questions.js
//
// Predict each answer before reading/running its solution.

// Q1. What is the output order?
//
// console.log("One");
// setTimeout(() => console.log("Two"), 0);
// console.log("Three");


// Solution 1
console.log("One"); // One
setTimeout(() => console.log("Two"), 0); // scheduled for later
console.log("Three"); // Three
// Output order: One, Three, Two.


// Q2. What is the output order, and why does the Promise callback run
// before the timer callback?
//
// console.log("Start");
// setTimeout(() => console.log("Timer"), 0);
// Promise.resolve().then(() => console.log("Promise"));
// console.log("End");


// Solution 2
console.log("Start");
setTimeout(() => console.log("Timer"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
// Typical output: Start, End, Promise, Timer.
// Synchronous statements run first. Promise reactions are microtasks;
// the timer callback is a task.


/*
Q3. What are the three possible states of a Promise?
What does resolve() do, and what does reject() do?
*/

// Solution 3
const states = ["pending", "fulfilled", "rejected"];
console.log("Promise states:", states);
// resolve(value) fulfills a pending Promise.
// reject(reason) rejects a pending Promise.
// A settled Promise does not change to another state.


// Q4. What does this Promise chain print?
//
// Promise.resolve(4)
//   .then(number => number + 2)
//   .then(number => number * 3)
//   .then(result => console.log(result));


// Solution 4
Promise.resolve(4)
  .then((number) => number + 2)
  .then((number) => number * 3)
  .then((result) => {
    console.log(result); // 18
  });


// Q5. What does an async function return, even if it returns a string?


// Solution 5
async function getCourseName() {
  return "JavaScript";
}

const courseResult = getCourseName();
console.log(courseResult instanceof Promise); // true

courseResult.then((value) => {
  console.log(value); // JavaScript
});


// Q6. Complete wait(ms) so it returns a Promise that fulfills after
// approximately ms milliseconds. Then use await to print "Finished".


// Solution 6
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function finishAfterDelay() {
  await wait(100);
  console.log("Finished");
}

finishAfterDelay();


// Q7. What happens when the awaited Promise rejects?
// How can the error be handled?


// Solution 7
async function readTask() {
  try {
    const value = await Promise.reject(new Error("Task unavailable"));
    console.log(value); // This line is skipped.
  } catch (error) {
    console.log("Handled:", error.message);
  }
}

readTask();


// Q8. Does this code wait for all async callbacks before printing "Done"?
//
// const values = [1, 2, 3];
// values.forEach(async (value) => {
//   await wait(50);
//   console.log(value);
// });
// console.log("Done");


// Solution 8
const values = [1, 2, 3];

values.forEach(async (value) => {
  await wait(50);
  console.log("forEach item:", value);
});

console.log("Done prints before the async callbacks finish");
// forEach does not collect or await the Promises returned by its callback.


// Q9. Rewrite the previous pattern so each item is processed one by one.


// Solution 9
async function processOneByOne(items) {
  for (const item of items) {
    await wait(50);
    console.log("Sequential item:", item);
  }

  console.log("All sequential items finished");
}

processOneByOne([1, 2, 3]);


// Q10. Rewrite the pattern so independent items can be processed
// concurrently and wait until all of them finish.


// Solution 10
async function processTogether(items) {
  await Promise.all(
    items.map(async (item) => {
      await wait(50);
      console.log("Concurrent item:", item);
      return item * 2;
    })
  );

  console.log("All concurrent items finished");
}

processTogether([1, 2, 3]);


// Q11. What is the difference between .then() and await?


// Solution 11
// Both can handle a Promise's eventual result.
// .then() registers a Promise reaction and returns a new Promise.
// await pauses the surrounding async function until the Promise settles,
// then gives the fulfilled value back (or throws on rejection).
// async/await is syntax built on Promises; it does not replace them.


// Q12. Why is setTimeout(callback, 0) not an immediate function call?


// Solution 12
// It schedules the callback to run as a timer task when the runtime can
// process it. Current synchronous code and queued microtasks are processed
// first. Zero milliseconds is not a guarantee of immediate execution.
