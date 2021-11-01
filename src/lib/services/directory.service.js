import db from '$lib/db/db.js';
import { get, post, put, del } from './api.service.js';

class DirectoryService {

  async findAll() {
    const dirsResponse = await get({method: 'GET', path: '/dirs'});
    console.log('dirsResponse (DirectoryService): ', dirsResponse);
  }
}

export default DirectoryService;
