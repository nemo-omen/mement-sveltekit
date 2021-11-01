import service from '$lib/services/directory.service.js';

export async function get({params}) {
  const allDirsResponse = await service.findAll();
  console.log('findAll response (/dirs)');
}