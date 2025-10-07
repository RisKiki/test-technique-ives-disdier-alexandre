const Task = require('../models/Task');

class TaskService {
  constructor() {
    this.tasks = this.initializeDefaultTasks();
  }

  initializeDefaultTasks() {
    const defaultTasks = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        userId: 1,
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        userId: 2,
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Description 3',
        userId: 2,
      }
    ];

    return defaultTasks.map(taskData => Task.fromObject(taskData));
  }

  createTask(title, description, userId) {
    if (!title || !description || !userId) {
      throw new Error('Title, description and userId are required');
    }

    const task = new Task(this.tasks.length + 1, title, description, userId);
    this.tasks.push(task);
    return task;
  }

  getTasksByUserId(userId) {
    if (!userId) {
      throw new Error('userId is required');
    }

    return this.tasks.filter(task => task.userId == userId);
  }

  getTaskById(id) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;    
  }

  updateTask(id, title, description) {
    const task = this.getTaskById(id);
    task.update(title, description);
    return task;
  }

  deleteTask(id) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const deletedTask = this.tasks[taskIndex];
    this.tasks.splice(taskIndex, 1);
    return deletedTask;
  }

  getAllTasks() {
    return this.tasks;
  }
}

module.exports = TaskService;
