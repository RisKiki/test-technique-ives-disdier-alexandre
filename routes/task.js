const express = require('express');
const TaskService = require('../services/TaskService');

const router = express.Router();

const taskService = new TaskService();

router.post('/', (req, res) => {
  const { title, description, userId } = req.body || {};

  const newTask = taskService.createTask(title, description, userId);

  return res.status(200).json(newTask);
});

router.get('/', (req, res) => {
  const { userId } = req.query || {};
  if (userId) {
    const tasks = taskService.getTasksByUserId(userId);
    return res.status(200).json(tasks);
  }
  return res.status(400).json({ error: 'userId is required' });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const task = taskService.getTaskById(id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  return res.status(200).json(task);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const task = taskService.getTaskById(id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  taskService.updateTask(id, title, description);
  return res.status(200).json(task);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  taskService.deleteTask(id);
  return res.status(200).json({ message: 'Task deleted' });
});

module.exports = router;