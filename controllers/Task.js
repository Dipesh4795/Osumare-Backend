const express = require("express");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
let Task = localStorage.getItem("tasklist")
  ? JSON.parse(localStorage.getItem("tasklist"))
  : [];
const { v4: uuidv4 } = require("uuid");
exports.createtask = async (req, res) => {
  try {
    const { name, description, priority } = req.body;
    if (!name || !description || !priority) {
      return res.status(400).json({
        success: false,
        message: "task is  not created due to missing data",
      });
    }

    const task = {
      id: uuidv4(),
      name: name,
      description: description,
      priority: priority,
    };
    Task.push(task);
    localStorage.setItem("tasklist", JSON.stringify(Task));
    return res.status(201).json({
      success: true,
      message: "task is created",
      data: task,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error in creation of task",
    });
  }
};

exports.getalltasks = async (req, res) => {
  try {
    const { page, filter } = req.query;

    const currpage = parseInt(page) || 1;
    const limit = 10;
    let filtertask = Task;

    if (filter) {
      filtertask = Task.filter((item) => item.priority === filter);
    }
    if (filtertask.length === 0) {
      return res.status(404).json({
        success: false,
        message: "task is not found",
      });
    }
    const totalPages = Math.ceil(filtertask.length / limit);
    if (currpage > totalPages) {
      return res.status(404).json({
        success: false,
        message: " task is not found on this page",
      });
    }
    const startIndex = (currpage - 1) * limit;

    const endIndex = Math.min(currpage * limit, filtertask.length);

    const pageTasks = filtertask.slice(startIndex, endIndex);

    const priorityorder = {
      High: 1,
      Moderate: 2,
      Low: 3,
    };

    pageTasks.sort(
      (a, b) => priorityorder[a.priority] - priorityorder[b.priority]
    );

    return res.status(200).json({
      success: true,
      totalPages,
      currpage,
      data: pageTasks,
      message: "fetch all Tasks",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error in get all task",
    });
  }
};

exports.gettask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = Task.filter((item) => item.id === id);
    if (task.length == 0) {
      return res.status(404).json({
        success: false,

        message: "there is no task with this id",
      });
    }

    return res.status(200).json({
      success: true,
      data: task[0],
      message: "fetch all Tasks",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: `Internal server error in get  task with ${id}`,
    });
  }
};

exports.updatetask = (req, res) => {
  const { id } = req.params;
  const { name, description, priority } = req.body;
  try {
    const reqtask = Task.filter((item) => item.id === id);
    if (reqtask.length === 0) {
      return res.status(404).json({
        success: false,

        message: "there is no task with this id",
      });
    }
    let task = reqtask[0];
    if (name) {
      task = { ...task, name: name };
    }
    if (description) {
      task = { ...task, description: description };
    }
    if (priority) {
      task = { ...task, priority: priority };
    }
    const resttask = Task.filter((item) => item.id !== id);
    Task = [...resttask, task];
    localStorage.setItem("tasklist", JSON.stringify(Task));

    return res.status(201).json({
      success: true,
      data: task,
      message: `update the Task with ${id}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: `Internal server error in update  task with ${id}`,
    });
  }
};

exports.deletetask = async (req, res) => {
  const { id } = req.params;
  try {
    const itemIndex = Task.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "item not found",
      });
    }
    const deletedItem = Task.splice(itemIndex, 1);
    localStorage.setItem("tasklist", JSON.stringify(Task));
    return res.status(200).json({
      success: true,
      data: deletedItem,
      message: `delete the Task with ${id}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: `Internal server error in delete  task with ${id}`,
    });
  }
};
