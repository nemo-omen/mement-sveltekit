import db from '../db/db.js';

export default class NoteService {
  static async findAll() {
    try {
      const response = await db.query(`SELECT * FROM notes`);

      if (!response[0] && !response[0] > 0) {
        return { ok: false, message: 'Error finding notes in database' };
      }

      return {
        ok: true,
        data: response[0],
      };
    } catch (error) {
      console.error(error);
    }
  }

  static async find(id) {
    try {
      const response = await db.query(`SELECT * FROM notes WHERE id = ${id}`);

      if (!response[0] && !response[0] > 0) {
        return { ok: false, message: 'Error finding notes in database' };
      }

      return {
        ok: true,
        data: response[0],
      };
    } catch (error) {
      console.error(error);
    }
  }

  static async create(note) {
    try {
      return await db.query(`INSERT INTO notes SET ?`, note);
    } catch (error) {
      console.error(error);
    }
  }

  static async update(note) {
    try {
      return await db.query(`UPDATE notes SET ? WHERE id = ?`, [note, note.id]);
    } catch (error) {
      console.error(error);
    }
  }

  static async delete(id) {
    try {
      return await db.query(`DELETE FROM notes WHERE id = ?`, id);
    } catch (error) {
      console.error(error);
    }
  }
}
