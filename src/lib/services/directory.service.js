import db from '$lib/db/db.js';

class DirectoryService {
  static async findAll() {
    try {
      const dirsResponse = await db.query(`SELECT * FROM directories`);

      if (!dirsResponse[0] && !dirsResponse[0] > 0) {
        return { ok: false, message: 'Error finding directories in database' };
      }

      return {
        ok: true,
        data: dirsResponse[0],
      };
    } catch (error) {
      console.error(error);
    }
  }

  static async find(id) {
    try {
      const dirsResponse = await db.query(`SELECT * FROM directories WHERE id = ${id}`);

      if (!dirsResponse[0] && !dirsResponse[0] > 0) {
        return { ok: false, message: 'Error finding directories in database' };
      }

      return {
        ok: true,
        data: dirsResponse[0],
      };
    } catch (error) {
      console.error(error);
    }
  }
}

export default DirectoryService;
