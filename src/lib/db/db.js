import mysql from 'mysql2/promise';
import config from 'config';
import { testUsers, testNotes } from './demo.data.js';

const { host, user, password, database, notesTable, userTable, cookiesTable } = config.get('db');

const connection = await mysql.createConnection({ host, user, password });

connection.connect((error) => {
  if (error) throw error;
  console.log(`Connected to database ${database} at ${host}`);
});

try {
  const create = await connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);

  if (create[0].serverStatus === 2) console.log(`🗄️  Database ${database} created or already exists.`);

  const use = await connection.query(`USE ${database}`);

  if (use[0].serverStatus === 2) console.log(`Using database ${database}`);

  // const createUSer = await connection.query(`CREATE USER IF NOT EXISTS ${user}@${host} IDENTIFIED BY ${password}`);
  // if (createUser.affectedRows > 0) console.log('User created successfully (or already exists)');

  // const grant = await connection.query(`GRANT ALL ON ${database}.* TO ${user}@${host} IDENTIFIED BY ${password}`);
  // if (grant.affectedRows > 0) console.log(`User granted all privileges on ${database}`);

  console.log(`🗑️  Dropping tables ${userTable}, ${notesTable}, ${cookiesTable} for testing...`);

  await connection.query(`DROP TABLE IF EXISTS \`${notesTable}\``);
  await connection.query(`DROP TABLE IF EXISTS \`${userTable}\``);
  // await connection.query(`DROP TABLE IF EXISTS \`${cookiesTable}\``);

  console.log(`   Attempting to create empty tables ${notesTable}, ${userTable}, ${cookiesTable}...`);

  const createdUserTable = await connection.query(`CREATE TABLE IF NOT EXISTS \`${userTable}\`(
      id char(36) NOT NULL PRIMARY KEY,
      name varchar(255) NOT NULL,
      userName varchar(255) NOT NULL UNIQUE,
      email varchar(255) NOT NULL UNIQUE,
      password varchar(255) NOT NULL
      )ENGINE=InnoDB`);

  if (createdUserTable[0].serverStatus === 2) {
    console.log(`🗃️  Table ${userTable} created`);
    for (const user of testUsers) {
      await connection.query(`INSERT INTO \`${userTable}\` SET ?`, user);
    }
  }

  const createdNotesTable = await connection.query(`CREATE TABLE IF NOT EXISTS \`${notesTable}\` (
    id char(36) NOT NULL PRIMARY KEY,
    title varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    bodyContent TEXT NOT NULL,
    user_id char(36) NOT NULL,
    CONSTRAINT \`Note_USERId_fkey\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
    )ENGINE=InnoDB`);

  if (createdNotesTable[0].serverStatus === 2) {
    console.log(`🗃️  Table ${notesTable} created`);
    for (const note of testNotes) {
      await connection.query(`INSERT INTO \`${notesTable}\` SET ?`, note);
    }
  }

  const createdCookiesTable = await connection.query(`CREATE TABLE IF NOT EXISTS \`${cookiesTable}\` (
    session_id char(36) NOT NULL PRIMARY KEY,
    email varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    userName varchar(255) NOT NULL
  )ENGINE=InnoDB`);

  if (createdCookiesTable[0].serverStatus === 2) {
    console.log(`🗃️  Table ${cookiesTable} created`);
  }

  console.log("\n🚀 Setup complete. Looks like we're ready to go! 🚀\n");
} catch (error) {
  console.error(error);
}

export default connection;
