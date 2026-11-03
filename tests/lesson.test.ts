import assert from "node:assert/strict";
import { test, after } from "node:test";
import { executeLab, dispose } from "../src/lab.js";
import { LESSON } from "../src/lesson.js";
const run = (input: unknown) => executeLab(input, () => {}, new AbortController().signal);
after(async () => { await dispose(); });

test("stable id cannot silently resolve as a registry key", async () => {
  assert.equal((await run(LESSON.examples[1].input)).status, "needs-attention");
  assert.equal((await run(LESSON.examples[2].input)).status, "pass");
});
