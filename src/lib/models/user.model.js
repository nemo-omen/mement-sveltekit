import { v4 as uuidv4 } from 'uuid';

export default class User {
  id;
  name;
  userName;
  email;
  password;

  /**
   *
   * @param {String} name
   * @param {String} userName
   * @param {String} email
   * @param {String} password
   */
  constructor(name, userName, email, password) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.userName = userName;
    this.password = password;
  }
}
