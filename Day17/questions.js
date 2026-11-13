// Day 17 — Questions and Solutions
// Try answering each question before reading its solution.

/*
Q1. What does Array.prototype.sort() do?
Q2. Does sort() mutate the array on which it is called?
Q3. Why is a comparator useful when sorting names?
Q4. What does localeCompare() return?
Q5. How can you sort a copy instead of changing the original array?
Q6. How can you reverse an alphabetical comparator for descending order?
Q7. Why must the user cards be rendered again after sorting?
Q8. Which event should be used to detect a changed <select> option?
*/

// SOLUTION 1
// sort() rearranges the elements of an array and returns that same array.

// SOLUTION 2
// Yes. sort() changes the order of the original array in place.

// SOLUTION 3
// A comparator defines how two values should be ordered. It avoids relying
// on the default string-based sorting behaviour.

// SOLUTION 4
// localeCompare() returns a negative number, zero, or a positive number
// depending on the relative order of the two strings.

// SOLUTION 5
const originalNames = ["Zoya", "aman", "Ravi"];
const copiedNames = [...originalNames];

copiedNames.sort((a, b) =>
  a.localeCompare(b, undefined, { sensitivity: "base" })
);

console.log("Original:", originalNames);
console.log("Sorted copy:", copiedNames);

// SOLUTION 6
const namesForDescending = ["Aman", "Ravi", "Zoya"];

namesForDescending.sort((a, b) => b.localeCompare(a));

console.log("Descending:", namesForDescending);

// SOLUTION 7
// Sorting changes the data order, but it does not rearrange DOM nodes that
// have already been inserted. Clear the container and append cards again
// in the new order.

// SOLUTION 8
// Use the "change" event for a select element.

// Example sorting helper:
function sortNames(names, order = "asc") {
  const result = [...names];

  result.sort((a, b) => {
    const comparison = a.localeCompare(b, undefined, {
      sensitivity: "base"
    });

    return order === "desc" ? -comparison : comparison;
  });

  return result;
}

console.log(sortNames(["Zoya", "Aman", "Ravi"], "asc"));
console.log(sortNames(["Zoya", "Aman", "Ravi"], "desc"));
