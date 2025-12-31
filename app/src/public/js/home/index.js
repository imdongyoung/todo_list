"use strict";

import createTodo from "./createTodo.js";
import { editTodo, editSubmit } from "./editTodo.js";
import renderTodos from "./renderTodo.js";
import completeTodo from "./completeTodo.js";
import deleteTodo from "./deleteTodo.js";

const submitBtn = document.querySelector("#todo-submit");
const input = document.querySelector("#todo-input");

submitBtn.addEventListener("click", createTodo);
input.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    createTodo(event.currentTarget);
  }
});

renderTodos();

window.deleteTodo = deleteTodo;

window.editTodo = editTodo;

window.editSubmit = editSubmit;

window.completeTodo = completeTodo;
