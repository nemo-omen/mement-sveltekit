import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { sampleMd } from '$lib/util/sample.md.js';
async function getHashed(pw) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pw, salt);
}

export const testUsers = [
  {
    id: '37ac14e9-273c-48b1-ab9d-c2d84562c442',
    name: 'Test User',
    userName: 'testUser123',
    email: 'test@test.com',
    password: await getHashed('Test1234!'),
  },
];

export const testDirectories = [
  {
    name: 'Your Notes',
    type: 'root',
    parent_id: null,
  },
  {
    name: 'Documentation',
    type: 'child',
    parent_id: 1,
  },
];

export const testNotes = [
  {
    id: uuidv4(),
    title: 'Mement Intro',
    bodyContent: sampleMd,
    user_id: testUsers[0].id,
    parent_id: 1,
  },
];
