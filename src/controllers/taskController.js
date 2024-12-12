import Task from "../models/task.js";
import HttpStatus from "http-status"; 

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(HttpStatus.OK).json(tasks);
  } catch (error) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", error }); 
  }
};

export const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(HttpStatus.CREATED).json(task); 
  } catch (error) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Validation error", error }); 
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Task not found" }); 
    res.status(HttpStatus.OK).json(task); 
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid ID", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Task not found", code: HttpStatus.NOT_FOUND });
    res.status(HttpStatus.OK).json({ task, code: HttpStatus.OK });
  } catch (error) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Invalid ID", code: HttpStatus.BAD_REQUEST, error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Task not found", code: HttpStatus.NOT_FOUND });
    res
      .status(HttpStatus.OK)
      .json({ message: "Task deleted", code: HttpStatus.OK });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid ID", error });
  }
};
