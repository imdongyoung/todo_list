"use strict";

const TodoStorage = require("./TodoStorage");

class Todo {
  constructor(body) {
    this.body = body;
  }

  async getTodos() {
    try {
      const data = await TodoStorage.getTodos();

      return { success: true, data: data };
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async createTodo() {
    const description = this.body.description;

    try {
      const result = await TodoStorage.createTodo(description);

      return result;
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async updateTodo() {
    const client = this.body;

    try {
      const result = await TodoStorage.updateTodo(client);

      return result;
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async completeTodo() {
    const client = this.body;

    try {
      const result = await TodoStorage.completeTodo(client);

      return result;
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async deleteTodo() {
    const client = this.body;

    try {
      const result = await TodoStorage.deleteTodo(client.id);

      return result;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = Todo;
