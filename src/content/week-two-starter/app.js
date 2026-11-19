"use strict";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const error = document.querySelector("#form-error");

function updateEmptyState() {
  emptyState.hidden = list.children.length > 0;
}

function addTask(title) {
  const item = document.createElement("li");
  item.className = "task-item";

  const label = document.createElement("label");
  label.className = "task-label";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const text = document.createElement("span");
  text.textContent = title;

  checkbox.addEventListener("change", () => {
    item.classList.toggle("completed", checkbox.checked);
  });
  label.append(checkbox, text);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "delete-button";
  removeButton.textContent = "Delete";
  removeButton.setAttribute("aria-label", `Delete task: ${title}`);
  removeButton.addEventListener("click", () => {
    item.remove();
    updateEmptyState();
  });

  item.append(label, removeButton);
  list.append(item);
  updateEmptyState();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) {
    error.hidden = false;
    input.focus();
    return;
  }
  error.hidden = true;
  addTask(title);
  form.reset();
  input.focus();
});

input.addEventListener("input", () => {
  error.hidden = true;
});

updateEmptyState();
