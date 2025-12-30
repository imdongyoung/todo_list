"use strict";

const submitBtn = document.querySelector("#todo-submit");
const input = document.querySelector("#todo-input");

submitBtn.addEventListener("click", createTodo);
input.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    createTodo();
  }
});

renderTodos();

function createTodo() {
  if (!input.value) {
    alert("입력하세요");
    return;
  }

  const req = {
    description: input.value,
  };

  fetch("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        renderTodos();
        input.value = "";
        input.focus();
      } else {
        console.error(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function renderTodos() {
  const todoContainer = document.querySelector(".todo-container");

  fetch("/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        const todosHTML = createHTML(res.data);

        todoContainer.innerHTML = todosHTML;
      } else {
        console.error(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function createHTML(todos) {
  let todosHTML = "";

  todos.forEach((todo) => {
    todosHTML += `
    <div class="todo-wrap" data-id="${todo.id}">
      <div class="todo-row" id="todo-row-${todo.id}">
        <input type="checkbox" ${todo.is_check ? "checked" : ""} class="todo-checkbox" id="todo-checkbox-${todo.id}" onclick="completeTodo(event)" />
        <div class="todo-description ${todo.is_check ? "completed-todo" : ""}">${todo.description}</div>
        <div class="todo-btn-container">
        ${
          todo.is_check
            ? ""
            : `<span class="edit-btn" onclick="editTodo(event)" data-id="${todo.id}">
            <i class="fa-solid fa-pen"></i>
          </span>`
        }
          <span class="delete-btn" onclick="deleteTodo(event)">
            <i class="fa-solid fa-trash-can"></i>
          </span>
        </div>
      </div>

      <div class="todo-edit-row" id="todo-edit-row-${todo.id}">
        <input type="checkbox" ${todo.is_check ? "checked" : ""} class="todo-checkbox" id="todo-checkbox-${todo.id}" />
        <input type="text" value="${todo.description}" class="edit-input" id="edit-input-${todo.id}" />
        <div class="todo-btn-container">
          <div class="edit-submit" onclick="editSubmit(event)" data-id="${todo.id}">
            완료
          </div>
          <div class="delete-btn" onclick="deleteTodo(event)">
            <i class="fa-solid fa-trash-can"></i>
          </div>
        </div>
      </div>
    </div>
    <hr />
  `;
  });

  return todosHTML;
}

window.deleteTodo = function (event) {
  const id = event.currentTarget.parentElement.parentElement.parentElement.dataset.id;

  fetch("/todos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        renderTodos();
      } else {
        console.error(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

window.editTodo = function (event) {
  const id = event.currentTarget.parentElement.parentElement.parentElement.dataset.id;

  const row = document.querySelector(`#todo-row-${id}`);
  const editRow = document.querySelector(`#todo-edit-row-${id}`);
  const editInput = document.querySelector(`#edit-input-${id}`);

  editRow.style.display = "flex";
  row.style.display = "none";

  editInput.focus();
  const value = editInput.value;
  editInput.value = "";
  editInput.value = value;
};

window.editSubmit = function (event) {
  const id = event.currentTarget.parentElement.parentElement.parentElement.dataset.id;

  const editInput = document.querySelector(`#edit-input-${id}`);

  if (!editInput.value) {
    alert("입력하세요");
    return;
  }

  const req = {
    id,
    description: editInput.value,
  };

  fetch("/todos", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        renderTodos();
      } else {
        console.error(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

window.completeTodo = function (event) {
  const id = event.currentTarget.parentElement.parentElement.dataset.id;

  const checkbox = document.querySelector(`#todo-checkbox-${id}`);

  const req = {
    id,
    isCheck: checkbox.checked,
  };

  fetch("/complete", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        renderTodos();
      } else {
        console.error(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
