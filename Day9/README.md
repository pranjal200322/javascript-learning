# Day 9 — Scope, Hoisting, Closures & `this`

**Status: revision/practice material.** This entry revises JavaScript topics encountered after functions, arrays, objects, and callbacks. It is a practice resource—not a claim that every concept has already been completed or mastered.

## Learning goals

By working through this entry, you should be able to:

- Explain scope and identify where a variable can be accessed.
- Distinguish block scope from function scope.
- Understand lexical scope and variable shadowing.
- Explain hoisting and the Temporal Dead Zone (TDZ).
- Create and recognize closures.
- Understand how `this` behaves in regular functions, object methods, and arrow functions.

## 1. What is scope?

**Scope** decides where a variable is accessible in your code.

### Global/module scope

A variable declared outside a function or block can be accessed by code in its surrounding scope. In Node.js files, top-level declarations are generally module-scoped rather than automatically becoming properties of the global object.

### Function scope

Variables declared with `var`, `let`, or `const` inside a function are not accessible outside that function.

### Block scope

A block is code inside curly braces `{}`, such as an `if` block or a standalone block. Variables declared with `let` and `const` are block-scoped.

```js
const course = "JavaScript";

if (true) {
  const topic = "Scope";
  let day = 9;
  console.log(course, topic, day);
}

console.log(course);
// topic and day are not accessible here.
```

**Important difference:** `var` is function-scoped, not block-scoped.

```js
if (true) {
  var message = "Hello";
}

console.log(message); // Hello
```

Prefer `let` and `const` for predictable block scope. Use `const` by default when reassignment is not needed.

## 2. Lexical scope

JavaScript uses **lexical scope**: an inner function can access variables from the scope in which it was written.

```js
const language = "JavaScript";

function outer() {
  const topic = "closures";

  function inner() {
    console.log(language);
    console.log(topic);
  }

  inner();
}

outer();
```

The inner function can read `topic` and `language`. The outer scope cannot directly read variables declared only inside `inner`.

## 3. Variable shadowing

Shadowing happens when a variable in an inner scope uses the same name as a variable in an outer scope. Inside the inner scope, the inner declaration takes precedence.

```js
const role = "user";

function showRole() {
  const role = "admin";
  console.log(role); // admin
}

showRole();
console.log(role); // user
```

Shadowing is legal, but avoid confusing names when it makes code harder to follow.

## 4. Hoisting and the Temporal Dead Zone

**Hoisting** describes how JavaScript processes declarations before executing code in a scope. It does not mean every variable can safely be used before its declaration.

### `var`

A `var` declaration is hoisted and initialized with `undefined`.

```js
console.log(score); // undefined
var score = 90;
```

Conceptually, the declaration is processed before execution, while the assignment stays at its original position.

### `let` and `const`

Their declarations are also registered before execution, but they cannot be accessed before the declaration is evaluated. The period from entering the scope until the declaration is reached is called the **Temporal Dead Zone (TDZ)**.

```js
// console.log(points); // ReferenceError: TDZ
let points = 50;
console.log(points); // 50
```

The commented-out line is intentionally not executed; uncommenting it causes a ReferenceError.

### Function declarations vs function expressions

A function declaration can be called before its position in the source:

```js
sayHello();

function sayHello() {
  console.log("Hello!");
}
```

A function expression assigned to `const` cannot be called before that `const` declaration is initialized:

```js
const greet = function () {
  console.log("Hi!");
};

greet();
```

For beginners, the safest habit is to declare variables and function expressions before using them.

## 5. Closures

A **closure** is created when a function remembers variables from the lexical scope in which it was created—even after the outer function has finished running.

```js
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

The returned inner function still has access to `count`. The variable is not recreated on each call; the closure keeps access to that particular lexical environment.

Closures are useful for:

- Keeping state between function calls.
- Creating private data that cannot be changed directly from outside.
- Building function factories and callbacks.

Each call to `createCounter()` creates a separate counter with its own `count`.

## 6. Understanding `this`

For a **regular function**, the value of `this` is determined mainly by how the function is called—not simply where it was written.

### Method call

When a regular function is called as an object method, `this` refers to the object before the dot.

```js
const person = {
  name: "Riya",
  greet() {
    console.log("Hello, " + this.name);
  }
};

person.greet(); // Hello, Riya
```

### Explicitly setting `this` with `call()`

```js
function introduce(city) {
  return this.name + " lives in " + city;
}

const user = { name: "Aman" };

console.log(introduce.call(user, "Lucknow"));
// Aman lives in Lucknow
```

`call()` invokes the function immediately and sets its `this` value to the first argument.

### Arrow functions and lexical `this`

Arrow functions do **not** create their own `this`. They use `this` from the surrounding scope.

This is useful in callbacks inside an object method:

```js
const team = {
  name: "Film Club",
  members: ["Asha", "Kabir"],

  showMembers() {
    this.members.forEach((member) => {
      console.log(member + " is in " + this.name);
    });
  }
};

team.showMembers();
```

Here, the arrow callback inherits `this` from `showMembers()`, where `this` refers to `team`.

Do not replace every regular function with an arrow function. They have different `this` behavior and different roles.

## 7. Common mistakes

1. Assuming `let` and `const` are function-scoped. They are block-scoped.
2. Assuming `var` is block-scoped. It is function-scoped.
3. Treating hoisting as permission to use every variable before declaration.
4. Forgetting that accessing a `let` or `const` variable in its TDZ throws a ReferenceError.
5. Thinking a closure copies a variable's current value. A closure retains access to its lexical environment.
6. Assuming an arrow function gets `this` from the object before the dot. Arrow functions inherit `this` lexically.
7. Assuming `this` always means the object where a function was defined. For regular functions, the call-site matters.

## Run the files

From the repository root:

```bash
node Day9/examples.js
node Day9/questions.js
```

Pehle output predict karo, phir Node.js se run karke verify karo. Questions ke solutions self-check ke liye comments ke baad diye gaye hain.
