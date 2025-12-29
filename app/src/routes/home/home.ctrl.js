"use strict";

const Todo = require("../../models/Todo");

const output = {
  home: async (req, res) => {
    const todo = new Todo(req.body);
    const response = await todo.getTodos();

    if (response.success) {
      res.render("./home/index", { todos: response.data || [] });
    } else {
      res.status(500).send(response.msg);
    }
  },
};

const process = {
  getTodos: async (req, res) => {
    const todo = new Todo(req.body);
    const response = await todo.getTodos();

    const url = {
      method: "GET",
      path: "/todos",
      status: response.err ? 400 : 200,
    };

    return res.status(url.status).json(response);
  },

  createTodo: async (req, res) => {
    const todo = new Todo(req.body);
    const response = await todo.createTodo();

    const url = {
      method: "POST",
      path: "/todos",
      status: response.err ? 409 : 201,
    };

    return res.status(url.status).json(response);
  },

  updateTodo: async (req, res) => {
    const todo = new Todo(req.body);
    const response = await todo.updateTodo();

    const url = {
      method: "PATCH",
      path: "/todos",
      status: response.err ? 409 : 201,
    };

    return res.status(url.status).json(response);
  },

  completeTodo: async (req, res) => {
    const todo = new Todo(req.body);
    const response = await todo.completeTodo();

    const url = {
      method: "POST",
      path: "/todos",
      status: response.err ? 409 : 201,
    };

    return res.status(url.status).json(response);
  },

  deleteTodo: async (req, res) => {
    const todo = new Todo(req.body);
    const response = await todo.deleteTodo();

    const url = {
      method: "DELETE",
      path: "/todos",
      status: response.err ? 409 : 201,
    };

    return res.status(url.status).json(response);
  },
};

module.exports = {
  process,
  output,
};
