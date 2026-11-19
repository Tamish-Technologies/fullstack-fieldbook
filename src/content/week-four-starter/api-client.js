"use strict";

export const IDEAS_URL = "https://jsonplaceholder.typicode.com/todos";
export const MAX_IDEAS = 8;

// TASK 1. Validate that `data` is an array. Keep up to 8 usable ideas.
// Each idea should have an integer id > 0, a nonblank title <= 100
// characters, and a Boolean completed field. Return new objects.
export function normalizeIdeas(data, limit = MAX_IDEAS) {
  // TODO: use Array.isArray, filter, slice and map.
  return [];
}

// TASK 2. Use fetch with async/await; check response.ok;
// parse response.json(); return normalizeIdeas(payload).
// Keep fetchImpl injectable so unit tests can pass a fake fetch function.
export async function fetchStudyIdeas({ fetchImpl = fetch, signal, url = IDEAS_URL } = {}) {
  // TODO: write a real fetch implementation.
  throw new Error("Not implemented yet - complete Week 4 Task 2.");
}
