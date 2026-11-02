# Day 6 — Arrays in JavaScript

**Status: revision/practice material.** This entry follows the variables, operators, conditionals, loops, and function notes in Days 1–5. It introduces array fundamentals and does not claim that every method has already been completed or mastered.

## Learning goals

By working through this entry, you should be able to:

- Explain why arrays are useful.
- Create arrays and access items using zero-based indexes.
- Read and update an array's `length` and elements.
- Add and remove elements at the beginning or end.
- Search an array with `includes()` and `indexOf()`.
- Distinguish `slice()` from `splice()`.
- Traverse an array with a regular `for` loop or `for...of`.
- Understand that arrays are reference values and that `const` does not make their contents immutable.

## 1. What is an array?

Array ek ordered collection hai jisme multiple values ek hi variable mein store kar sakte ho. For example, users ke names, movie titles, scores, ya product prices.

```js
const movies = ["Kahaani", "Badlapur", "Maharaja"];
```

JavaScript arrays zero-indexed hote hain: first element ka index `0`, second ka `1`, and so on.

## 2. Accessing elements and the length

```js
const languages = ["JavaScript", "C++", "Python"];

console.log(languages[0]); // JavaScript
console.log(languages[2]); // Python
console.log(languages.length); // 3
console.log(languages[languages.length - 1]); // Python
```

Agar index par koi element nahi hai, toh result `undefined` hota hai. Array ke last valid index ko generally `length - 1` se find kar sakte ho.

## 3. Updating an element

Index ke through existing element replace kar sakte ho:

```js
const scores = [70, 80, 90];
scores[1] = 85;

console.log(scores); // [70, 85, 90]
```

## 4. Adding and removing elements

| Method | Kya karta hai | Array ke kis end par? |
|---|---|---|
| `push(value)` | Element add karta hai | End |
| `pop()` | Element remove karke return karta hai | End |
| `unshift(value)` | Element add karta hai | Beginning |
| `shift()` | Element remove karke return karta hai | Beginning |

```js
const tasks = ["study", "exercise"];

tasks.push("read");       // ["study", "exercise", "read"]
tasks.pop();              // removes and returns "read"
tasks.unshift("wake up"); // adds at the beginning
tasks.shift();            // removes and returns "wake up"
```

`push()` aur `unshift()` new length return karte hain. `pop()` aur `shift()` removed element return karte hain. Ye methods original array ko mutate karte hain.

## 5. Searching an array

```js
const tools = ["VS Code", "Git", "Node.js"];

console.log(tools.includes("Git")); // true
console.log(tools.includes("Docker")); // false
console.log(tools.indexOf("Node.js")); // 2
console.log(tools.indexOf("Docker")); // -1
```

- `includes(value)` boolean deta hai.
- `indexOf(value)` first matching index deta hai; value na mile toh `-1`.

## 6. `slice()` vs `splice()`

Dono similar lagte hain, lekin behavior different hai.

### `slice(start, end)`

- Selected portion ka **new shallow copy** return karta hai.
- Original array ko change nahi karta.
- `end` index exclusive hota hai.

```js
const numbers = [10, 20, 30, 40, 50];
const selected = numbers.slice(1, 4);

console.log(selected); // [20, 30, 40]
console.log(numbers);  // [10, 20, 30, 40, 50]
```

### `splice(start, deleteCount, ...items)`

- Original array ko **mutate** karta hai.
- Items remove, insert, ya replace kar sakta hai.
- Removed items ka array return karta hai.

```js
const numbers = [10, 20, 30, 40];
const removed = numbers.splice(1, 2, 99);

console.log(removed); // [20, 30]
console.log(numbers); // [10, 99, 40]
```

Quick memory: `slice` = portion copy; `splice` = original array mein changes.

## 7. Looping through arrays

### Regular `for` loop

Jab index bhi chahiye ya index-based logic likhna ho:

```js
const fruits = ["apple", "mango", "orange"];

for (let i = 0; i < fruits.length; i++) {
  console.log(i, fruits[i]);
}
```

### `for...of`

Jab har element ki value chahiye aur index required nahi hai:

```js
const fruits = ["apple", "mango", "orange"];

for (const fruit of fruits) {
  console.log(fruit);
}
```

`for...of` values par iterate karta hai. Agar index chahiye, regular `for` loop ya kisi suitable array method ka use kar sakte ho.

## 8. Arrays, references, and `const`

Arrays objects hain, isliye `typeof []` ka result `"object"` hota hai. Array check karne ka reliable built-in method `Array.isArray()` hai.

```js
const first = ["a", "b"];
const second = first;

second.push("c");

console.log(first); // ["a", "b", "c"]
console.log(Array.isArray(first)); // true
```

`second = first` ne array ki independent copy nahi banayi. Dono variables same array ko refer kar rahe hain.

`const` ka matlab binding ko reassign nahi kar sakte; iska matlab ye nahi ki array immutable hai. Existing array ke elements change ho sakte hain.

Agar simple shallow copy chahiye:

```js
const original = [1, 2, 3];
const copy = [...original];

copy.push(4);

console.log(original); // [1, 2, 3]
console.log(copy);     // [1, 2, 3, 4]
```

Spread copy shallow hoti hai. Nested objects/arrays ke case mein inner references shared reh sakte hain.

## 9. Common mistakes

1. **Index 1 se start samajhna:** JavaScript arrays ka first index `0` hota hai.
2. **Last index ko length samajhna:** Last valid index `length - 1` hai.
3. **`slice()` aur `splice()` confuse karna:** `slice` original ko preserve karta hai; `splice` mutate karta hai.
4. **`indexOf()` ke missing result ko ignore karna:** Not found ka result `-1` hai.
5. **`const` ko immutability samajhna:** `const` array ko reassign hone se rokta hai, mutate hone se nahi.
6. **Assignment ko copy samajhna:** `const b = a` same array reference share karta hai.
7. **Loop condition mein `<= length` likhna:** Usually `i < array.length` use karo, warna final iteration par `undefined` mil sakta hai.

## Run the files

Repository root se commands run karo:

```bash
node Day6/examples.js
node Day6/questions.js
```

Pehle output predict karo, phir run karke verify karo. Questions ke solutions self-check ke liye unke neeche diye gaye hain.
