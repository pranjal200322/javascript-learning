# Day 8 — Array Iteration Methods & Callback Functions

**Status: revision/practice material.** Days 1–7 in this repository cover variables and data types, operators and type conversion, conditions, loops, functions, arrays, and objects. This entry builds on arrays and functions by practising common array iteration methods. It does not claim that every method has already been completed or mastered.

## Learning goals

By working through this entry, you should be able to:

- Explain what a callback function is.
- Understand that array methods can receive a function as an argument.
- Choose between `for...of` and `forEach()`.
- Use `map()` to transform values.
- Use `filter()` to select values.
- Use `find()` to get the first matching value.
- Use `some()` and `every()` for condition checks.
- Use `reduce()` to combine values into one result.
- Recognize which methods return a new array and which return something else.

## 1. What is a callback function?

Callback ek function hota hai jo kisi doosre function ko argument ke roop mein pass kiya jata hai. Calling function zaroorat ke hisaab se us callback ko execute karta hai.

```js
function processUser(name, callback) {
  callback(name);
}

function greetUser(userName) {
  console.log("Hello, " + userName);
}

processUser("Pranjal", greetUser);
```

Yahan `greetUser` callback hai. Hum function ko call karte waqt parentheses nahi laga rahe, kyunki hum function execute nahi, pass kar rahe hain.

Array methods jaise `forEach()`, `map()`, aur `filter()` callback functions accept karte hain.

## 2. `for...of` vs `forEach()`

Dono arrays ke elements par iterate kar sakte hain.

### `for...of`

```js
const fruits = ["apple", "mango", "orange"];

for (const fruit of fruits) {
  console.log(fruit);
}
```

- Har iteration mein element ki value milti hai.
- `break` aur `continue` use kar sakte ho.
- Jab loop ko control karna ho, `for...of` useful hai.

### `forEach()`

```js
const fruits = ["apple", "mango", "orange"];

fruits.forEach((fruit, index) => {
  console.log(index, fruit);
});
```

Callback ko commonly ye arguments milte hain:
1. Current element
2. Current index
3. Original array

Important: `forEach()` ka return value `undefined` hota hai. Is method se normal `break` ya `continue` nahi kar sakte. Agar early exit chahiye, `for...of` ya suitable method use karo.

## 3. `map()` — transform every element

`map()` har element ke liye callback chalata hai aur callback ke returned values se **new array** banata hai. Original array mutate nahi hota, jab tak callback khud usse mutate na kare.

```js
const prices = [100, 200, 300];

const pricesWithTax = prices.map((price) => {
  return price * 1.18;
});

console.log(pricesWithTax); // [118, 236, 354]
console.log(prices);        // [100, 200, 300]
```

Short arrow function:

```js
const numbers = [1, 2, 3];
const squares = numbers.map(number => number * number);

console.log(squares); // [1, 4, 9]
```

**Remember:** Agar callback curly braces use karta hai, toh value return karne ke liye explicit `return` likhna zaroori hai.

## 4. `filter()` — select matching elements

`filter()` callback ke truthy result wale elements ka **new array** return karta hai.

```js
const ages = [15, 22, 17, 30, 19];

const adults = ages.filter(age => age >= 18);

console.log(adults); // [22, 30, 19]
```

- Matching elements preserve hote hain.
- Original array unchanged rehta hai.
- Koi element match na kare toh empty array `[]` milta hai.

## 5. `find()` — first matching element

`find()` first element return karta hai jiske liye callback truthy ho. Match na mile toh `undefined` return hota hai.

```js
const users = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Riya" },
  { id: 3, name: "Kabir" }
];

const selectedUser = users.find(user => user.id === 2);

console.log(selectedUser); // { id: 2, name: "Riya" }
```

Difference:
- `filter()`: saare matching elements ka array.
- `find()`: sirf pehla matching element.

## 6. `some()` and `every()`

Dono condition test karte hain aur Boolean return karte hain.

### `some()`

At least one element condition pass kare toh `true`.

```js
const marks = [35, 42, 28, 60];

console.log(marks.some(mark => mark >= 50)); // true
```

### `every()`

Saare elements condition pass karein tabhi `true`.

```js
const scores = [65, 72, 81];

console.log(scores.every(score => score >= 40)); // true
```

Empty array ke liye `some()` false aur `every()` true return karta hai. Is behavior ko edge cases mein yaad rakho.

## 7. `reduce()` — combine values into one result

`reduce()` array ke elements ko process karke ek accumulated result banata hai. Common examples: sum, product, grouping, or counting.

```js
const numbers = [10, 20, 30];

const total = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(total); // 60
```

Yahan:
- `accumulator`: ab tak ka combined result.
- `currentValue`: current element.
- `0`: initial accumulator value.

Agar initial value `0` hai:
1. Start: accumulator = 0
2. First item: 0 + 10 = 10
3. Second item: 10 + 20 = 30
4. Third item: 30 + 30 = 60

Beginner practice mein initial value dena generally clearer aur safer hota hai, especially empty arrays ke case mein.

## 8. Quick comparison

| Method | Main purpose | Typical return |
|---|---|---|
| `forEach()` | Har element par action | `undefined` |
| `map()` | Har element ko transform karna | New array |
| `filter()` | Matching elements select karna | New array |
| `find()` | First matching element | Element or `undefined` |
| `some()` | At least one match? | Boolean |
| `every()` | All elements match? | Boolean |
| `reduce()` | Values combine karna | Accumulated value |

## 9. Common mistakes

1. **`map()` mein return bhool jaana:** Curly braces ke saath callback likha hai toh explicit `return` chahiye.
2. **`forEach()` se new array expect karna:** `forEach()` ka return `undefined` hota hai.
3. **`filter()` aur `find()` confuse karna:** Ek array deta hai; doosra first matching element.
4. **`some()` aur `every()` confuse karna:** At least one vs all.
5. **`reduce()` ka initial value ignore karna:** Empty array aur type consistency ke cases mein issue ho sakta hai.
6. **Array method ko automatically immutable samajhna:** Ye listed methods original array ko directly mutate nahi karte, lekin callback ke andar tum original data mutate kar sakte ho.
7. **`forEach()` ke andar `return` ko loop break samajhna:** Callback se return karna sirf current callback invocation ko finish karta hai; poora `forEach()` stop nahi hota.

## Run the files

Repository root se run karo:

```bash
node Day8/examples.js
node Day8/questions.js
```

Pehle output predict karo, phir Node.js se run karke verify karo. Questions ke solutions self-check ke liye comments ke baad diye gaye hain.
