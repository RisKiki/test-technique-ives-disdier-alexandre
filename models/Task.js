class Task {
  constructor(id, title, description, userId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
  }

  update(title, description) {
    this.title = title || this.title;
    this.description = description || this.description;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      userId: this.userId
    };
  }

  static fromObject(obj) {
    const task = new Task(obj.id, obj.title, obj.description, obj.userId);
    task.id = obj.id;
    return task;
  }
}

module.exports = Task;
