import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

async function getHashed(pw) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pw, salt);
}

export const testUsers = [
  {
    id: uuidv4(),
    name: 'Test User',
    userName: 'testUser123',
    email: 'test@test.com',
    password: await getHashed('Test1234!'),
  },
];

export const testNotes = [
  {
    id: uuidv4(),
    title: 'Welcome to mement.to!',
    bodyContent: 'This is some test content!',
    user_id: testUsers[0].id,
  },
];
