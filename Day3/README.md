# Day 3 — Conditional Statements (if, else, switch & ternary)

**Status: revision/practice material.** Day 1 in this repository covers variables and data types; Day 2 covers operators, comparisons, type conversion, truthy/falsy values, and precedence. Day 3 builds on those ideas. This entry is a learning resource, not a claim that the learner has already completed or mastered the topic.

## Learning goals

By the end of this topic, you should be able to:

- Make a decision with `if`, `else if`, and `else`.
- Combine conditions with `&&`, `||`, and `!`.
- Recognize truthy and falsy conditions.
- Use nested conditions when a second decision depends on the first.
- Choose between `if/else`, `switch`, and the ternary operator.
- Avoid common mistakes such as using `=` instead of `===`.

---

## 1. Why do we need conditional statements?

A program normally executes statements from top to bottom. But real programs need to make decisions.

Examples:

- If a user is logged in, show the dashboard; otherwise, show the login page.
- If a student's marks are at least 40, mark them as passed; otherwise, mark them as failed.
- If the cart total crosses a threshold, apply a discount.

A **conditional statement** runs a block of code only when its condition evaluates to `true`.

## 2. The `if` statement

Syntax:

```js
if (condition) {
  // Runs only when condition is true
}
```

Example:

```js
const age = 20;

if (age >= 18) {
  console.log("You are eligible to vote.");
}
```

The expression `age >= 18` evaluates to a Boolean. Since it is `true`, the block executes.

## 3. `if...else`

Use `else` when you need an alternative path.

```js
const temperature = 14;

if (temperature >= 25) {
  console.log("It is warm.");
} else {
  console.log("It is not warm.");
}
```

Exactly one of these two branches runs.

## 4. `if...else if...else`

Use this when there are multiple mutually exclusive ranges or cases.

```js
const marks = 76;

if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 75) {
  console.log("Grade B");
} else if (marks >= 60) {
  console.log("Grade C");
} else if (marks >= 40) {
  console.log("Pass");
} else {
  console.log("Fail");
}
```

**Order matters.** JavaScript checks conditions from top to bottom and executes the first branch whose condition is true. Put more specific or higher-threshold conditions first when ranges overlap.

For example, if `marks >= 40` is checked first, a score of 95 will match that branch and the later grade checks will never run.

## 5. Conditions with logical operators

Day 2 introduced comparison and logical operators. They are commonly used inside conditions.

| Operator | Meaning | Example |
|---|---|---|
| `&&` | AND: both sides must be truthy | `age >= 18 && hasID` |
| `||` | OR: at least one side must be truthy | `isAdmin || isOwner` |
| `!` | NOT: reverses truthiness | `!isLoggedIn` |

Example:

```js
const age = 22;
const hasID = true;

if (age >= 18 && hasID) {
  console.log("Entry allowed.");
} else {
  console.log("Entry denied.");
}
```

### Short-circuit evaluation

- `A && B`: if `A` is falsy, JavaScript does not evaluate `B`.
- `A || B`: if `A` is truthy, JavaScript does not evaluate `B`.

These operators return one of their operands; they do not always return a Boolean. Inside an `if`, JavaScript checks the resulting value's truthiness.

## 6. Truthy and falsy values in conditions

A condition does not have to be explicitly `true` or `false`. JavaScript converts its value to a Boolean for the decision.

Common falsy values:

- `false`
- `0`, `-0`, and `0n`
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

Most other values are truthy. In particular, empty arrays `[]` and empty objects `{}` are truthy.

```js
const username = "";

if (username) {
  console.log("Username provided");
} else {
  console.log("Username is empty");
}
```

Do not confuse an empty array with a falsy value:

```js
if ([]) {
  console.log("This runs because [] is truthy");
}
```

## 7. Nested `if`

A nested condition is an `if` statement inside another conditional block. Use it when a second decision should be checked only after the first one succeeds.

```js
const isLoggedIn = true;
const isAdmin = false;

if (isLoggedIn) {
  if (isAdmin) {
    console.log("Show admin panel");
  } else {
    console.log("Show user dashboard");
  }
} else {
  console.log("Please log in");
}
```

Avoid unnecessary deep nesting. Sometimes combining conditions or returning early makes code easier to read.

## 8. Ternary operator

The ternary operator is a compact expression for choosing one of two values.

Syntax:

```js
condition ? valueIfTrue : valueIfFalse
```

Example:

```js
const age = 17;
const message = age >= 18 ? "Adult" : "Minor";

console.log(message); // Minor
```

Use ternary for short, simple choices. Prefer `if/else` when branches contain multiple statements or the logic becomes difficult to read. Avoid deeply nested ternaries.

## 9. `switch` statement

Use `switch` when one expression is compared against several discrete values.

```js
const day = 2;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Unknown day");
}
```

Important points:

- `switch` compares the expression with each `case` using strict equality (`===`).
- `break` exits the switch. Without it, execution can fall through into the next case.
- `default` runs when no case matches. It is optional.

Multiple cases can share a block:

```js
const role = "editor";

switch (role) {
  case "admin":
  case "editor":
    console.log("Can manage content");
    break;
  case "viewer":
    console.log("Can only view content");
    break;
  default:
    console.log("Unknown role");
}
```

## 10. Which one should you choose?

| Situation | Good starting choice |
|---|---|
| One condition | `if` |
| Two alternative paths | `if...else` |
| Several ranges or complex conditions | `if...else if...else` |
| One value matched against discrete options | `switch` |
| One short expression choosing between two values | Ternary |

There is no rule that every decision must use `switch` or ternary. Choose the clearest form.

## 11. Common mistakes

1. **Using assignment instead of comparison:** `if (age = 18)` assigns a value. Use `if (age === 18)` for comparison.
2. **Wrong branch order:** A broad condition placed first can prevent later branches from running.
3. **Forgetting `break` in switch:** This can cause fall-through.
4. **Assuming empty arrays/objects are falsy:** Both `Boolean([])` and `Boolean({})` are `true`.
5. **Overusing nested ternaries:** Readability matters more than fewer lines.
6. **Using `==` without understanding coercion:** Prefer `===` for predictable comparisons.

## Run the files

From the repository root:

```bash
node Day3/examples.js
node Day3/questions.js
```

First predict the output of each example and question. Then run the file and compare. The solutions in `questions.js` are included for self-checking.
