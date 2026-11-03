# Day 7 — Objects in JavaScript

**Status: revision/practice material.** Days 1–6 cover variables and data types, operators, conditions, loops, functions, and array fundamentals. This entry introduces objects as another way to organize related data. It is a practice resource; it does not claim that every concept has already been completed or mastered.

## Learning goals

By working through this entry, you should be able to:

- Explain what an object is and why it is useful.
- Create an object using an object literal.
- Read, add, update, and delete properties.
- Access properties with dot notation and bracket notation.
- Work with nested objects.
- Add methods to an object and understand basic method `this`.
- Use `Object.keys()`, `Object.values()`, and `Object.entries()`.
- Destructure an object and create a shallow copy with spread syntax.
- Understand that objects are reference values.

## 1. What is an object?

Array mein values ordered positions (indexes) par store hoti hain. Object mein related information **key-value pairs** ke form mein store hoti hai.

Example: movie ke title, release year, rating aur watched status ko ek object mein rakh sakte hain.

```js
const movie = {
  title: "Kahaani",
  year: 2012,
  rating: 8.1,
  watched: true
};
```

- `title`, `year`, `rating`, `watched` properties/keys hain.
- Unke saamne stored values hain.
- Object literal curly braces `{}` se banta hai.

## 2. Reading properties

### Dot notation

```js
console.log(movie.title);
console.log(movie.year);
```

### Bracket notation

```js
console.log(movie["title"]);

const propertyName = "rating";
console.log(movie[propertyName]);
```

Bracket notation tab useful hota hai jab property name kisi variable mein ho, ya key mein spaces/special characters hon.

`movie.title` aur `movie["title"]` same property access karte hain. Lekin `movie[propertyName]` variable ki value ko key ke roop mein use karta hai.

## 3. Adding, updating, and deleting properties

```js
const user = {
  name: "Aman",
  age: 22
};

// Add
user.city = "Lucknow";

// Update
user.age = 23;

// Delete
delete user.city;

console.log(user);
```

`const` object variable ko kisi naye object se reassign hone se rokta hai, lekin object ki existing properties ko add/update/delete karna allowed hai.

## 4. Nested objects

Object ke andar another object ho sakta hai. Isse related structured data represent kar sakte hain.

```js
const student = {
  name: "Riya",
  address: {
    city: "Kanpur",
    state: "Uttar Pradesh"
  }
};

console.log(student.address.city);
```

Nested property access karte waqt har level ka property name use karo. Agar beech ka object missing ho sakta hai, toh optional chaining (`?.`) crash se bachane mein help karti hai:

```js
console.log(student.contact?.email);
```

Optional chaining sirf missing/nullish path par `undefined` return karti hai; yeh data create nahi karti.

## 5. Methods and `this`

Object ke andar function property ko commonly **method** kehte hain.

```js
const person = {
  name: "Pranjal",
  greet() {
    return "Hello, " + this.name;
  }
};

console.log(person.greet());
```

Is normal method call mein `this` us object ko refer karta hai jiske through method call hua: `person.greet()`.

Important: `this` ka behavior call-site aur function type par depend karta hai. Arrow functions apna separate `this` create nahi karte; woh surrounding scope se `this` lete hain. Isliye object methods ke liye normal method syntax use karna ek clear starting point hai.

## 6. Useful object methods

```js
const course = {
  name: "JavaScript",
  duration: "30 days",
  level: "beginner"
};

console.log(Object.keys(course));
// ["name", "duration", "level"]

console.log(Object.values(course));
// ["JavaScript", "30 days", "beginner"]

console.log(Object.entries(course));
// [["name", "JavaScript"], ["duration", "30 days"], ["level", "beginner"]]
```

- `Object.keys(obj)`: property names ka array.
- `Object.values(obj)`: property values ka array.
- `Object.entries(obj)`: har property ki `[key, value]` pair ka array.
- `Object.hasOwn(obj, key)`: check karta hai ki property object ki apni property hai ya nahi.

## 7. Object destructuring

Destructuring se properties ko variables mein conveniently extract kar sakte ho.

```js
const movie = {
  title: "Maharaja",
  year: 2024,
  rating: 8.3
};

const { title, rating } = movie;

console.log(title);
console.log(rating);
```

Variable names default mein property names se match karte hain. Rename bhi kar sakte ho:

```js
const { title: movieTitle } = movie;
console.log(movieTitle);
```

## 8. Spread syntax and shallow copies

Object spread se ek naya object bana kar properties copy/override kar sakte ho.

```js
const original = {
  name: "Aman",
  city: "Lucknow"
};

const updated = {
  ...original,
  city: "Kanpur",
  active: true
};

console.log(original); // original unchanged
console.log(updated);  // city updated, active added
```

Yeh **shallow copy** hai. Top-level object naya hota hai, lekin nested objects/arrays ke references copy ho sakte hain. Isliye nested data ko mutate karne par original aur copy dono par effect ho sakta hai.

## 9. Objects are reference values

```js
const first = { score: 10 };
const second = first;

second.score = 20;

console.log(first.score); // 20
```

`second = first` ne independent object nahi banaya. Dono variables same object ko refer karte hain.

Agar top-level shallow copy chahiye, spread use kar sakte ho:

```js
const first = { score: 10 };
const second = { ...first };

second.score = 20;

console.log(first.score);  // 10
console.log(second.score); // 20
```

## 10. Common mistakes

1. **Dot notation mein variable use karna:** `obj.keyName` literal key `keyName` dekhta hai. Variable wali key ke liye `obj[keyName]` use karo.
2. **`const` ko immutability samajhna:** `const` binding ko reassign hone se rokta hai; properties ko mutate karna phir bhi possible hai.
3. **Nested property blindly access karna:** Missing intermediate object par error aa sakta hai. Zaroorat ho toh `?.` use karo.
4. **Object assignment ko copy samajhna:** `const b = a` same reference share karta hai.
5. **Spread ko deep copy samajhna:** Object spread only shallow copy banata hai.
6. **Method ke `this` ko assume karna:** Normal method call mein `this` call-site se determine hota hai; arrow function ka apna `this` nahi hota.

## Run the files

Repository root se run karo:

```bash
node Day7/examples.js
node Day7/questions.js
```

Pehle output predict karo, phir run karke verify karo. `questions.js` mein har question comment ke form mein hai aur uske baad solution diya gaya hai.
