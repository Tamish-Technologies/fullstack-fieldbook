"use strict";

import {
  normalizeTitle, validateTitle, parseStoredTasks,
  addTaskToList, renameTaskInList, toggleTaskInList,
  deleteTaskFromList, getVisibleTasks, countRemaining
} from "./task-logic.js";

const results = document.querySelector("#test-results");
const summary = document.querySelector("#test-summary");
let passed = 0;
let failed = 0;

function assert(condition, message = "Assertion failed") {
  if (!condition) throw new Error(message);
}

function test(name, fn) {
  const row = document.createElement("li");
  try {
    fn();
    passed += 1;
    row.textContent = `PASS: ${name}`;
    row.className = "pass";
  } catch (error) {
    failed += 1;
    row.textContent = `FAIL: ${name} — ${error.message}`;
    row.className = "fail";
    console.error(name, error);
  }
  results.append(row);
}

const seed = [
  { id: 7, title: "Read JavaScript", completed: false },
  { id: 9, title: "Practice CSS", completed: true },
  { id: 12, title: "Debug JavaScript", completed: false }
];

test("normalizes outer whitespace", () => {
  assert(normalizeTitle("  Study  ") === "Study");
});
test("rejects whitespace-only title", () => {
  assert(validateTitle("   ").ok === false);
});
test("rejects title longer than 100 chars", () => {
  assert(validateTitle("x".repeat(101)).ok === false);
});
test("accepts a 100-character title", () => {
  assert(validateTitle("x".repeat(100)).ok === true);
});
test("adds without mutating original array", () => {
  const result = addTaskToList(seed, 14, "  Write tests ");
  assert(result.ok && result.tasks.length === 4);
  assert(seed.length === 3 && result.tasks[3].title === "Write tests");
});
test("rejects a duplicate ID", () => {
  assert(addTaskToList(seed, 9, "Duplicate").ok === false);
});
test("renames only the selected ID", () => {
  const result = renameTaskInList(seed, 7, "  Read docs  ");
  assert(result.ok && result.tasks[0].title === "Read docs");
  assert(result.tasks[1].title === "Practice CSS");
  assert(seed[0].title === "Read JavaScript");
});
test("invalid rename leaves original unchanged", () => {
  const result = renameTaskInList(seed, 7, "  ");
  assert(!result.ok && result.tasks === seed);
});
test("unknown rename ID is rejected", () => {
  assert(renameTaskInList(seed, 999, "New").ok === false);
});
test("toggle updates one task and preserves original", () => {
  const result = toggleTaskInList(seed, 7);
  assert(result[0].completed && !seed[0].completed);
  assert(result[1].completed === seed[1].completed);
});
test("delete removes only matching ID", () => {
  const result = deleteTaskFromList(seed, 9);
  assert(result.length === 2 && result.every((task) => task.id !== 9));
  assert(seed.length === 3);
});
test("filters active tasks", () => {
  assert(getVisibleTasks(seed, { filter: "active" }).length === 2);
});
test("search is case-insensitive", () => {
  const visible = getVisibleTasks(seed, { query: "JAVAscript" });
  assert(visible.length === 2);
});
test("search and status filter compose", () => {
  const visible = getVisibleTasks(seed, { filter: "completed", query: "css" });
  assert(visible.length === 1 && visible[0].id === 9);
});
test("newest sorts by ID descending", () => {
  assert(getVisibleTasks(seed)[0].id === 12);
});
test("oldest sorts by ID ascending", () => {
  assert(getVisibleTasks(seed, { sort: "oldest" })[0].id === 7);
});
test("sorting does not reorder original array", () => {
  getVisibleTasks(seed, { sort: "newest" });
  assert(seed.map((task) => task.id).join(",") === "7,9,12");
});
test("count remaining ignores current filter", () => {
  assert(countRemaining(seed) === 2);
});
test("parses valid persisted tasks", () => {
  assert(parseStoredTasks(JSON.stringify(seed)).length === 3);
});
test("drops malformed and duplicate persisted records", () => {
  const raw = JSON.stringify([seed[0], seed[0], { id: 17, title: "", completed: false }]);
  assert(parseStoredTasks(raw).length === 1);
});
test("null storage yields empty list", () => {
  assert(parseStoredTasks(null).length === 0);
});
test("invalid JSON throws for the caller to catch", () => {
  let threw = false;
  try { parseStoredTasks("not-json"); } catch { threw = true; }
  assert(threw);
});

summary.textContent = `${passed} passed, ${failed} failed`;
summary.className = failed === 0 ? "pass" : "fail";
