const User = require('../models/User');
const bcrypt = require('bcryptjs');

class AuthService {
  constructor() {
    this.users = this.initializeDefaultUsers();
  }

  initializeDefaultUsers() {
    const defaultUsers = [
      { id: 1, email: 'user1@example.com', password: 'password1' },
      { id: 2, email: 'user2@example.com', password: 'password2' },
    ];

    return defaultUsers.map(userData => User.fromObject(userData));
  }

  getUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  verifyPassword(email, password) {
    const user = this.getUserByEmail(email);
    return bcrypt.compare(password, user.password);
  }

  createUser(email, password) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (this.getUserByEmail(email)) {
      throw new Error('User already exists');
    }

    const hashedPassword = bcrypt.hash(password, 10);

    const user = new User(this.users.length + 1, email, hashedPassword);
    this.users.push(user);
    return user;
  }

}

module.exports = AuthService;