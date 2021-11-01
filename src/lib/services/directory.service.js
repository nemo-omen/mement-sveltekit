import db from '$lib/db/db.js';
import { get, post, put, del } from './api.service.js';

class DirectoryService {
  static async findAll() {
    const dirsResponse = await get('/dirs');
    console.log('dirsResponse (DirectoryService): ', dirsResponse);
  }
}

export default DirectoryService;
