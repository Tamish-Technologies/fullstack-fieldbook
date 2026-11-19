"use strict";

export const MAX_TITLE_LENGTH = 100;

export function normalizeTitle(rawTitle) {
  return typeof rawTitle === "string" ? rawTitle.trim() : "";
}

export function validateTitle(rawTitle) {
  const title = normalizeTitle(rawTitle);
  if (!title) return { ok: false, error: "Enter a non-empty task title." };
  if (title.length > MAX_TITLE_LENGTH) {
    return { ok: false, error: "Keep titles at 100 characters or fewer." };
  }
  return { ok: true, title };
}

export function isValidTask(task) {
  return task !== null && typeof task === "object" &&
    Number.isSafeInteger(task.id) && task.id > 0 &&
    typeof task.title === "string" &&
    task.title.trim().length > 0 &&
    task.title.length <= MAX_TITLE_LENGTH &&
    typeof task.completed === "boolean";
}

export function parseStoredTasks(raw) {
  if (raw === null) return [];
  const data = JSON.parse(raw); // caller catches malformed JSON
  if (!Array.isArray(data)) throw new Error("Expected an array of tasks");
  const seenIds = new Set();
  return data.filter((task) => {
    if (!isValidTask(task) || seenIds.has(task.id)) return false;
    seenIds.add(task.id);
    return true;
  });
}

export function addTaskToList(tasks, id, rawTitle) {
  const result = validateTitle(rawTitle);
  if (!result.ok) return { ok: false, tasks, error: result.error };
  if (!Number.isSafeInteger(id) || id <= 0 || tasks.some((task) => task.id === id)) {
    return { ok: false, tasks, error: "A unique positive task ID is required." };
  }
  return {
    ok: true,
    tasks: [...tasks, { id, title: result.title, completed: false }]
  };
}

export function renameTaskInList(tasks, id, rawTitle) {
  const result = validateTitle(rawTitle);
  if (!result.ok) return { ok: false, tasks, error: result.error };
  if (!tasks.some((task) => task.id === id)) {
    return { ok: false, tasks, error: "Task not found." };
  }
  return {
    ok: true,
    tasks: tasks.map((task) =>
      task.id === id ? { ...task, title: result.title } : task
    )
  };
}

export function toggleTaskInList(tasks, id) {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
}

export function deleteTaskFromList(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

export function countRemaining(tasks) {
  return tasks.filter((task) => !task.completed).length;
}

export function getVisibleTasks(tasks, { filter = "all", query = "", sort = "newest" } = {}) {
  const search = String(query).trim().toLowerCase();
  const matching = tasks.filter((task) => {
    const matchesStatus = filter === "active" ? !task.completed
      : filter === "completed" ? task.completed : true;
    return matchesStatus && task.title.toLowerCase().includes(search);
  });
  // Sorting a copied array avoids changing stored task order.
  return matching.slice().sort((a, b) =>
    sort === "oldest" ? a.id - b.id : b.id - a.id
  );
}
