import db from '$lib/db/db.js';

class CookieService {
  static async findOne(cookieId) {
    try {
      if (cookieId) {
        const cookieResponse = await db.query(`SELECT * FROM cookies WHERE session_id = ?`, cookieId);
        const cookie = cookieResponse[0][0];
        return cookie;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async findOneByEmail(email) {
    try {
      if (email) {
        const cookieResponse = await db.query(`SELECT * FROM cookies WHERE email = ?`, email);
        const cookie = cookieResponse[0][0];
        return cookie;
      } else {
        return null;
      }
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
    console.log('cookie email: ', cookie.email);
    try {
      return await db.query(`UPDATE cookies SET ? WHERE email = "${cookie.email}"`, cookie);
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
