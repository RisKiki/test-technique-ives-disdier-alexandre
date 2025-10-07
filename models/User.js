class User {
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  static fromObject(obj) {
    const user = new User(obj.id, obj.email, obj.password);
    return user;
  }
}

module.exports = User;  