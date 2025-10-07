const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const tasks = [{
    id: uuidv4(),
    title: 'Task 1',
    description: 'Description 1',
    createdAt: new Date().toISOString(),
    userId: 1,
}, {
    id: uuidv4(),
    title: 'Task 2',
    description: 'Description 2',
    createdAt: new Date().toISOString(),
    userId: 2,
}, {
    id: uuidv4(),
    title: 'Task 3',
    description: 'Description 3',
    createdAt: new Date().toISOString(),
    userId: 2,
}];

router.post('/', (req, res) => {
  const { title, description, userId } = req.body || {};

  const newTask = {
    id: uuidv4(),
    title: title,
    description: description,
    createdAt: new Date().toISOString(),
    userId: userId,
  };

  tasks.push(newTask);
  return res.status(200).json(newTask);
});

router.get('/', (req, res) => {
  const { userId } = req.query || {};
  if (userId) {
    return res.status(200).json(tasks.filter(task => task.userId === userId));
  }
  return res.status(400).json({ error: 'userId is required' });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(task => task.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  return res.status(200).json(task);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const task = tasks.find(task => task.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.title = title;
  task.description = description;
  return res.status(200).json(task);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id);
  return res.status(200).json({ message: 'Task deleted' });
});

module.exports = router;