# Day 2 — Operators, Comparisons & Type Conversion

**Status: revision/practice material.** Day 1 in this repository covered variables, declaration/reassignment, primitive types, `typeof`, and value vs reference behavior. This entry builds on those basics; it does not claim that you have completed a separate lesson already.

## 1. Arithmetic operators

| Operator | Meaning | Example | Result |
|---|---|---|---:|
| `+` | addition | `5 + 3` | `8` |
| `-` | subtraction | `5 - 3` | `2` |
| `*` | multiplication | `5 * 3` | `15` |
| `/` | division | `10 / 2` | `5` |
| `%` | remainder | `10 % 3` | `1` |
| `**` | exponent/power | `2 ** 3` | `8` |

`%` division ke baad bacha hua remainder deta hai. Example: `10 % 3` ka result `1` hai.

## 2. Assignment operators

`total += 5` ka matlab `total = total + 5` hai. Isi pattern mein `-=`, `*=`, aur `/=` bhi use hote hain.

## 3. Comparison operators

- `>` / `<`: greater than / less than
- `>=` / `<=`: greater than or equal / less than or equal
- `===` / `!==`: strict equality / strict inequality
- `==` / `!=`: loose equality / inequality; types convert ho sakte hain

Prefer `===` and `!==` for predictable comparisons. For example, `10 == "10"` is `true`, but `10 === "10"` is `false` because the types differ.

## 4. Type conversion and coercion

**Explicit conversion** tab hota hai jab hum conversion khud likhte hain:

```js
Number("42");  // 42
String(42);    // "42"
Boolean(1);    // true
Number("hi"); // NaN
```

**Type coercion** JavaScript ki automatic conversion hai. For example, `"10" + 5` becomes the string `"105"`, while `"10" - 5` becomes the number `5`.

Falsy values include `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. Most other values—including empty arrays `[]` and empty objects `{}`—are truthy.

`typeof NaN` returns `"number"`; use `Number.isNaN(value)` to test for `NaN`.

## 5. Operator precedence

Multiplication happens before addition: `5 + 4 * 2` gives `13`. Use parentheses to make the intended order clear: `(5 + 4) * 2` gives `18`.

## Run

From the repository root, run:

```bash
node Day2/examples.js
node Day2/questions.js
```

Pehle output predict karo, phir code run karke check karo. Practice material ko revision samjho; is entry ka matlab yeh nahi ki saare topics pehle hi master ho chuke hain.
