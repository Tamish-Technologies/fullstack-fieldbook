"use strict";

const STORAGE_KEY = "study-tasks-week2";
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const formError = document.querySelector("#form-error");
const remainingCount = document.querySelector("#remaining-count");
const storageNotice = document.querySelector("#storage-notice");
const filterButtons = document.querySelectorAll("[data-filter]");

function isValidTask(task) {
  return task !== null && typeof task === "object" &&
    Number.isSafeInteger(task.id) && task.id > 0 &&
    typeof task.title === "string" && task.title.trim().length > 0 &&
    typeof task.completed === "boolean";
}

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new Error("Expected a task array");
    return parsed.filter(isValidTask);
  } catch (error) {
    console.warn("Unable to load stored tasks:", error);
    return [];
  }
}

let tasks = loadTasks();
let activeFilter = "all";
let nextId = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    storageNotice.hidden = true;
  } catch (error) {
    console.warn("Unable to save tasks:", error);
    storageNotice.hidden = false;
  }
}

function getVisibleTasks() {
  if (activeFilter === "active") {
    return tasks.filter((task) => !task.completed);
  }
  if (activeFilter === "completed") {
    return tasks.filter((task) => task.completed);
  }
  return tasks;
}

function addTask(title) {
  tasks.push({ id: nextId, title, completed: false });
  nextId += 1;
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
}

function makeTaskElement(task) {
  const item = document.createElement("li");
  item.className = "task-item";
  item.classList.toggle("completed", task.completed);

  const label = document.createElement("label");
  label.className = "task-label";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => toggleTask(task.id));
  const title = document.createElement("span");
  title.textContent = task.title;
  label.append(checkbox, title);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "delete-button";
  removeButton.textContent = "Delete";
  removeButton.setAttribute("aria-label", `Delete task: ${task.title}`);
  removeButton.addEventListener("click", () => deleteTask(task.id));

  item.append(label, removeButton);
  return item;
}

function render() {
  const visible = getVisibleTasks();
  list.replaceChildren();
  visible.forEach((task) => list.append(makeTaskElement(task)));
  emptyState.hidden = visible.length > 0;
  emptyState.textContent = tasks.length === 0
    ? "No tasks yet. Add your first one."
    : "No tasks match this filter.";
  const remaining = tasks.filter((task) => !task.completed).length;
  remainingCount.textContent = `${remaining} remaining`;
  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter));
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title || title.length > 100) {
    formError.hidden = false;
    input.focus();
    return;
  }
  formError.hidden = true;
  addTask(title);
  form.reset();
  input.focus();
});

input.addEventListener("input", () => { formError.hidden = true; });
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    render();
  });
});

render();
