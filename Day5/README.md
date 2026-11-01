# Day 5 — Functions in JavaScript

**Status: revision/practice material.** Days 1–4 in this repository introduced variables and data types, operators and type conversion, conditional statements, and loops. This entry introduces functions as a way to organize and reuse that logic. It is practice material and does not claim that the learner has completed or mastered every concept.

## Learning goals

By working through this entry, you should be able to:

- Explain why functions are useful.
- Declare and call a function.
- Pass information through parameters and arguments.
- Return a value from a function.
- Recognize function expressions and arrow functions.
- Use default parameters.
- Understand the difference between `return` and `console.log()`.

## 1. What is a function?

Function code ka reusable block hota hai. Tum ek task ka code function ke andar likhte ho, aur jab zaroorat ho tab function ko call karke execute kar sakte ho.

Example: agar application mein baar-baar total calculate karna hai, toh same calculation repeat likhne ke bajaye ek function bana sakte ho.

## 2. Function declaration

Syntax:

```js
function functionName() {
  // code to run
}

functionName(); // function call
```

Example:

```js
function sayHello() {
  console.log("Hello!");
}

sayHello();
sayHello();
```

Function define karne se uska code immediately execute nahi hota. Code tab run hota hai jab function call hota hai.

## 3. Parameters and arguments

Parameters function definition mein likhe hue variable names hote hain. Arguments woh actual values hain jo function call karte waqt pass karte ho.

```js
function greet(name) {       // name is a parameter
  console.log("Hello " + name);
}

greet("Pranjal");            // "Pranjal" is an argument
```

Multiple parameters bhi ho sakte hain:

```js
function add(a, b) {
  console.log(a + b);
}

add(10, 20);
```

Yahan `a` aur `b` parameters hain; `10` aur `20` arguments hain.

## 4. The `return` statement

`return` function se value wapas deta hai. Returned value ko variable mein store, compare, ya kisi doosre calculation mein use kar sakte ho.

```js
function add(a, b) {
  return a + b;
}

const result = add(5, 3);
console.log(result); // 8
```

### `return` vs `console.log()`

- `console.log(value)` value ko console par display karta hai.
- `return value` function se value caller ko wapas deta hai.

Agar function sirf `console.log()` karta hai aur koi value return nahi karta, toh uska result `undefined` hota hai.

```js
function printSum(a, b) {
  console.log(a + b);
}

const answer = printSum(2, 3); // console displays 5
console.log(answer);           // undefined
```

## 5. Default parameters

Agar caller argument pass na kare, toh default parameter value use hoti hai.

```js
function welcome(name = "Guest") {
  return "Welcome, " + name;
}

console.log(welcome());        // Welcome, Guest
console.log(welcome("Aman"));  // Welcome, Aman
```

Default parameter tab use hota hai jab argument missing ho ya `undefined` pass kiya gaya ho. `null` pass karne par default value apply nahi hoti.

## 6. Function expression

Function ko variable mein assign bhi kar sakte ho:

```js
const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(4, 5)); // 20
```

Yahan function expression ko `multiply` variable ke through call kiya gaya hai.

## 7. Arrow functions

Arrow function function expression likhne ka shorter syntax hai.

```js
const subtract = (a, b) => {
  return a - b;
};

console.log(subtract(10, 4)); // 6
```

Agar function body mein sirf ek expression hai, toh braces aur explicit `return` omit kar sakte ho:

```js
const square = number => number * number;

console.log(square(5)); // 25
```

Useful syntax reminders:

- No parameters: `() => expression`
- One parameter: `value => expression`
- Multiple parameters: `(a, b) => expression`
- Multiple statements: use `{ }` and write `return` when a value is needed.

Arrow functions and regular functions do not behave identically with `this`; that is a separate topic. Is entry mein arrow functions ko basic calculations ke liye use kar rahe hain.

## 8. Early return

`return` execute hote hi current function stop ho jaata hai. Isse invalid case ko pehle handle kar sakte ho.

```js
function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero";
  }

  return a / b;
}

console.log(divide(10, 2)); // 5
console.log(divide(10, 0)); // Cannot divide by zero
```

## 9. Common mistakes

1. **Function call bhool jaana:** `sayHello` function reference hai; `sayHello()` function call hai.
2. **Parameter aur argument confuse karna:** Parameter definition mein hota hai; argument call mein pass hota hai.
3. **Return ki jagah sirf console.log use karna:** Display karna aur value return karna different tasks hain.
4. **Return ke baad code likhna:** Same function execution mein `return` ke baad wali statements execute nahi hoti.
5. **Arrow function mein braces ke saath return bhoolna:** `() => { a + b }` value return nahi karta. Use `() => a + b` or `() => { return a + b; }`.

## Run the files

Repository root se commands run karo:

```bash
node Day5/examples.js
node Day5/questions.js
```

Pehle output predict karo, phir run karke verify karo. `questions.js` mein har question comment ke form mein diya gaya hai aur uske neeche solution hai.
