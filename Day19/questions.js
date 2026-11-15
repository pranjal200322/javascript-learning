// Day 19 — Debouncing Search Input

// Q1. What problem does debouncing solve?
// Q2. What does clearTimeout(timerId) do?
// Q3. Why is timerId declared outside the returned function?
// Q4. What JavaScript concept allows the returned function to remember timerId?
// Q5. What is the difference between debouncing and throttling?
// Q6. Why is the input event suitable for live search?
// Q7. Does debouncing cancel a network request that has already started?
// Q8. Why should search filter allUsers instead of the previously filtered array?
// Q9. If a user types several characters with less than 300 ms between each
//     keystroke and then pauses, how many times does a 300 ms debounced
//     callback normally run after that pause?
// Q10. Write a debounce function that accepts a callback and a delay.

// ---------------- SOLUTIONS ----------------

// A1. It avoids running a callback repeatedly while calls keep arriving.
//     The callback runs after calls have stopped for the configured delay.

// A2. It cancels a pending timeout using the ID returned by setTimeout().
//     If the timeout has already run, there is nothing left to cancel.

// A3. The same timer ID must be available to every call of the returned
//     function, so a new call can cancel the previous pending timeout.

// A4. A closure. The returned function retains access to timerId from the
//     surrounding debounce() function even after debounce() has returned.

// A5. Debouncing waits until calls stop for a period, then runs once.
//     Throttling limits how often a callback can run during continuous calls.

// A6. The input event fires as the value changes, so it supports live search
//     while the user types.

// A7. No. Debounce delays a callback that has not run yet. AbortController
//     can be used to cancel a fetch request that is already in progress.

// A8. Filtering the original array means clearing the search can show every
//     item again. Filtering an already-filtered array can permanently exclude
//     items from later searches.

// A9. Normally once, after the final keystroke has been followed by at least
//     300 ms without another call.

// A10. One valid implementation:

function debounce(callback, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

// Quick check:
let callCount = 0;
const debouncedCount = debounce(() => {
  callCount += 1;
  console.log("Callback calls:", callCount);
}, 100);

// Calling this several times quickly schedules one callback after the pause.
debouncedCount();
debouncedCount();
debouncedCount();
// After at least 100 ms without another call, the callback runs once.
