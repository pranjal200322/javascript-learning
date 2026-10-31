# Day 4 — Loops in JavaScript (for, while & do...while)

**Status: revision/practice material.** This entry introduces loop fundamentals after the conditional-statement material in Day 3. It is a practice resource; it does not claim that the learner has already completed or mastered these topics.

## Learning goals

By working through this entry, you should be able to:

- Explain why loops are useful.
- Use \`for\`, \`while\`, and \`do...while\` loops.
- Understand initialization, condition, and update.
- Control a loop with \`break\` and \`continue\`.
- Read and write a basic nested loop.
- Avoid accidental infinite loops and off-by-one errors.

## 1. Why do we need loops?

Maan lo tumhe 1 se 100 tak numbers print karne hain. Har number ke liye alag \`console.log()\` likhna repetitive aur difficult to maintain hoga.

Loop ek block of code ko repeatedly execute karta hai jab tak uski condition allow karti hai.

## 2. The \`for\` loop

Jab repetitions ki count ya range reasonably clear ho, \`for\` loop useful hota hai.

Syntax:

\`\`\`js
for (initialization; condition; update) {
  // repeated code
}
\`\`\`

Example:

\`\`\`js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
\`\`\`

Is loop ke teen parts hain:

1. **Initialization:** \`let i = 1\` — counter ki starting value set hoti hai. Ye loop start hone se pehle ek baar run hota hai.
2. **Condition:** \`i <= 5\` — har iteration se pehle check hoti hai. True hui toh body chalegi; false hui toh loop stop.
3. **Update:** \`i++\` — har completed iteration ke baad counter update hota hai.

Execution order: initialization → condition → body → update → condition → body ... → condition false → exit.

## 3. The \`while\` loop

Jab repetitions ki exact count pehle se clear na ho aur loop kisi condition par depend kare, \`while\` useful hai.

\`\`\`js
let count = 1;

while (count <= 5) {
  console.log(count);
  count++;
}
\`\`\`

Condition body se **pehle** check hoti hai. Agar starting condition false hai, toh body zero times execute ho sakti hai.

**Important:** Counter ya condition ko change karna mat bhoolna. Agar condition kabhi false hi nahi hoti, loop infinite ho sakta hai.

## 4. The \`do...while\` loop

Is loop mein body pehle execute hoti hai aur condition baad mein check hoti hai.

\`\`\`js
let number = 1;

do {
  console.log(number);
  number++;
} while (number <= 5);
\`\`\`

Isliye \`do...while\` body ko **at least once** execute karta hai, even if condition initially false ho.

Semicolon \`while (...);\` ke baad required hai.

## 5. \`break\` — loop ko stop karna

\`break\` current loop ko immediately terminate kar deta hai.

\`\`\`js
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
}
// Prints 1, 2, 3, 4
\`\`\`

## 6. \`continue\` — current iteration skip karna

\`continue\` current iteration ka remaining body skip karta hai aur next iteration par le jaata hai.

\`\`\`js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }
  console.log(i);
}
// Prints 1, 2, 4, 5
\`\`\`

Difference yaad rakho:

- \`break\`: loop se bahar.
- \`continue\`: sirf current iteration skip; loop continue.

## 7. Nested loops

Ek loop ke andar doosra loop ho toh use nested loop kehte hain. Inner loop, outer loop ki har iteration ke liye poora run hota hai.

\`\`\`js
for (let row = 1; row <= 3; row++) {
  for (let column = 1; column <= 2; column++) {
    console.log("row:", row, "column:", column);
  }
}
\`\`\`

Outer loop 3 baar chalega aur har baar inner loop 2 baar. Total inner-body executions = 3 × 2 = 6.

Nested loops ka use grids, patterns, tables, aur 2D data jaise problems mein hota hai.

## 8. Common mistakes

1. **Update bhool jaana:** \`while\` condition false nahi hogi aur loop infinite ho sakta hai.
2. **Wrong condition:** \`i < 5\` aur \`i <= 5\` mein ek iteration ka difference hai.
3. **Off-by-one error:** Starting aur ending values carefully check karo.
4. **Semicolon placement:** \`do...while\` ke end mein semicolon lagta hai.
5. **Confusing break and continue:** Ek loop stop karta hai; doosra current iteration skip karta hai.
6. **Nested loop count:** Inner body total kitni baar chalegi, outer aur inner iterations multiply karke samjho.

## 9. Which loop should you choose?

| Situation | Starting choice |
|---|---|
| Known counter/range | \`for\` |
| Condition-based repetition | \`while\` |
| Body must run at least once | \`do...while\` |
| Stop the loop early | \`break\` |
| Skip one iteration | \`continue\` |

## Run the files

Repository root se run karo:

\`\`\`bash
node Day4/examples.js
node Day4/questions.js
\`\`\`

Pehle output predict karo, phir run karke verify karo. Solutions self-check ke liye questions ke neeche diye gaye hain.
