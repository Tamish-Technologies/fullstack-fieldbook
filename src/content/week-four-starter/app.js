"use strict";

import {
  addTaskToList, renameTaskInList, toggleTaskInList,
  deleteTaskFromList, countRemaining, getVisibleTasks,
  parseStoredTasks
} from "./task-logic.js";

// Use the SAME key as Week 2 so existing saved tasks still load.
const STORAGE_KEY = "study-tasks-week2";
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const formError = document.querySelector("#form-error");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const resultsCount = document.querySelector("#results-count");
const storageNotice = document.querySelector("#storage-notice");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-order");
const filterButtons = document.querySelectorAll("[data-filter]");

function loadTasks() {
  try {
    return parseStoredTasks(localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    console.warn("Saved tasks could not be loaded:", error);
    return [];
  }
}

let tasks = loadTasks();
let nextId = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
let activeFilter = "all";
let searchQuery = "";
let sortOrder = "newest";
let editingId = null;
let editDraft = "";

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    storageNotice.hidden = true;
  } catch (error) {
    console.warn("Changes could not be saved:", error);
    storageNotice.hidden = false;
  }
}

function updateTasks(nextTasks) {
  tasks = nextTasks;
  saveTasks();
  render();
}

function makeButton(text, action, extraClass = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.action = action;
  button.textContent = text;
  button.className = extraClass;
  return button;
}

function makeEditForm(task) {
  const editForm = document.createElement("form");
  editForm.className = "edit-form";
  const label = document.createElement("label");
  label.htmlFor = `edit-title-${task.id}`;
  label.className = "sr-only";
  label.textContent = `Edit title for ${task.title}`;
  const editInput = document.createElement("input");
  editInput.id = `edit-title-${task.id}`;
  editInput.name = "edit-title";
  editInput.type = "text";
  editInput.maxLength = 100;
  editInput.value = editDraft;
  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.textContent = "Save";
  const cancelButton = makeButton("Cancel", "cancel", "quiet-button");
  const error = document.createElement("p");
  error.className = "edit-error error";
  error.setAttribute("role", "alert");
  error.hidden = true;
  editForm.append(label, editInput, saveButton, cancelButton, error);
  return editForm;
}

function makeTaskElement(task) {
  const item = document.createElement("li");
  item.className = "task-item";
  item.dataset.taskId = String(task.id);
  item.classList.toggle("completed", task.completed);
  if (editingId === task.id) {
    item.append(makeEditForm(task));
    return item;
  }

  const label = document.createElement("label");
  label.className = "task-label";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.dataset.action = "toggle";
  checkbox.checked = task.completed;
  const title = document.createElement("span");
  title.textContent = task.title; // safe: NEVER use innerHTML for task titles
  label.append(checkbox, title);
  const actions = document.createElement("div");
  actions.className = "task-actions";
  const edit = makeButton("Edit", "edit", "quiet-button");
  edit.setAttribute("aria-label", `Edit task: ${task.title}`);
  const remove = makeButton("Delete", "delete", "delete-button");
  remove.setAttribute("aria-label", `Delete task: ${task.title}`);
  actions.append(edit, remove);
  item.append(label, actions);
  return item;
}

function render() {
  const visible = getVisibleTasks(tasks, {
    filter: activeFilter, query: searchQuery, sort: sortOrder
  });
  list.replaceChildren(...visible.map(makeTaskElement));
  emptyState.hidden = visible.length !== 0;
  emptyState.textContent = tasks.length === 0
    ? "No tasks yet. Add your first one."
    : "No tasks match this view. Try another filter or search.";
  remainingCount.textContent = `${countRemaining(tasks)} remaining`;
  resultsCount.textContent = `${visible.length} shown of ${tasks.length}`;
  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter));
  });
}

function findTaskId(element) {
  const item = element.closest("[data-task-id]");
  if (!item || !list.contains(item)) return null;
  const id = Number(item.dataset.taskId);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function focusAction(id, action) {
  const button = [...list.querySelectorAll(`button[data-action="${action}"]`)]
    .find((candidate) => findTaskId(candidate) === id);
  button?.focus();
}

function startEditing(id) {
  const task = tasks.find((candidate) => candidate.id === id);
  if (!task) return;
  editingId = id;
  editDraft = task.title;
  render();
  const editInput = list.querySelector(`#edit-title-${id}`);
  editInput?.focus();
  editInput?.select();
}

function cancelEditing() {
  const id = editingId;
  editingId = null;
  editDraft = "";
  render();
  if (id !== null) focusAction(id, "edit");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = addTaskToList(tasks, nextId, input.value);
  if (!result.ok) {
    formError.textContent = result.error;
    formError.hidden = false;
    input.focus();
    return;
  }
  nextId += 1;
  formError.hidden = true;
  updateTasks(result.tasks);
  form.reset();
  input.focus();
});

input.addEventListener("input", () => { formError.hidden = true; });
searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value;
  render();
});
sortSelect.addEventListener("change", () => {
  sortOrder = sortSelect.value;
  render();
});
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    render();
  });
});

// Delegation: one listener handles every current AND future task row.
list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || !list.contains(button)) return;
  const id = findTaskId(button);
  if (id === null) return;
  if (button.dataset.action === "edit") startEditing(id);
  if (button.dataset.action === "cancel") cancelEditing();
  if (button.dataset.action === "delete") {
    if (editingId === id) { editingId = null; editDraft = ""; }
    updateTasks(deleteTaskFromList(tasks, id));
  }
});
list.addEventListener("change", (event) => {
  const checkbox = event.target.closest('input[data-action="toggle"]');
  if (!checkbox || !list.contains(checkbox)) return;
  const id = findTaskId(checkbox);
  if (id !== null) updateTasks(toggleTaskInList(tasks, id));
});
list.addEventListener("input", (event) => {
  if (event.target.matches('input[name="edit-title"]')) {
    editDraft = event.target.value;
    const error = event.target.closest("form")?.querySelector(".edit-error");
    if (error) error.hidden = true;
  }
});
list.addEventListener("submit", (event) => {
  const editForm = event.target.closest(".edit-form");
  if (!editForm || !list.contains(editForm)) return;
  event.preventDefault();
  const id = findTaskId(editForm);
  if (id === null || id !== editingId) return;
  const result = renameTaskInList(tasks, id, editDraft);
  if (!result.ok) {
    const error = editForm.querySelector(".edit-error");
    error.textContent = result.error;
    error.hidden = false;
    editForm.querySelector("input")?.focus();
    return;
  }
  editingId = null;
  editDraft = "";
  updateTasks(result.tasks);
  focusAction(id, "edit");
});
list.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && event.target.matches('input[name="edit-title"]')) {
    event.preventDefault();
    cancelEditing();
  }
});

render();
