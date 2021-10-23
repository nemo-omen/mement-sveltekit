import * as db from '../db/db.js';

class CookieService {
  static async findOne(cookieId) {
    try {
      return db.query('SELECT * FROM cookies WHERE id = ?', cookieId);
    } catch (error) {
      console.error(error);
    }
  }

  static async insertOne(cookie) {
    try {
      return await db.query('INSERT into cookies SET ?', cookie);
    } catch (error) {
      console.error(error);
    }
  }

  static async updateOne(cookie) {
    try {
      return await db.query(
        'UPDATE cookies SET ? WHERE email = ?',
        cookie,
        cookie.email
      );
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteOne(id) {
    try {
      return await db.query(`DELETE FROM cookies WHERE id = ?`, id);
    } catch (error) {
      console.error(error);
    }
  }
}

export default CookieService;
