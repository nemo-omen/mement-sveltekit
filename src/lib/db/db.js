import mysql from 'mysql2/promise';
import config from 'config';
import { testUsers, testDirectories, testNotes } from './demo.data.js';

const { host, user, password, database, directoriesTable, notesTable, userTable, cookiesTable } = config.get('db');

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

  console.log(`🗑️  Dropping tables ${userTable}, ${directoriesTable}, ${notesTable}, ${cookiesTable} for testing...`);

  await connection.query(`DROP TABLE IF EXISTS \`${notesTable}\``);
  await connection.query(`DROP TABLE IF EXISTS \`${directoriesTable}\``);
  await connection.query(`DROP TABLE IF EXISTS \`${userTable}\``);
  // await connection.query(`DROP TABLE IF EXISTS \`${cookiesTable}\``);

  console.log(`   Attempting to create empty tables ${notesTable}, ${userTable}, ${cookiesTable}...`);

  /* USERS */
  const createdUserTable = await connection.query(`CREATE TABLE IF NOT EXISTS \`${userTable}\`(
      id char(36) NOT NULL PRIMARY KEY,
      name varchar(255) NOT NULL,
      userName varchar(255) NOT NULL UNIQUE,
      email varchar(255) NOT NULL UNIQUE,
      password varchar(255) NOT NULL
      )`);

  if (createdUserTable[0].serverStatus === 2) {
    console.log(`🗃️  Table ${userTable} created`);
    for (const user of testUsers) {
      await connection.query(`INSERT INTO \`${userTable}\` SET ?`, user);
    }
  }

  /* DIRECTORIES */
  // const createdDirectoriesTable = await connection.query(`CREATE TABLE IF NOT EXISTS \`${directoriesTable}\` (
  //   id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  //   name varchar(255) NOT NULL,
  //   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  //   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  //   type varchar(255) NOT NULL CHECK (type in ('root', 'child')),
  //   parent_id int(11) DEFAULT NULL,
  //   FOREIGN KEY (parent_id) REFERENCES ${directoriesTable} (id)
  //     ON DELETE CASCADE ON UPDATE CASCADE
  // )`);

  // if (createdDirectoriesTable[0].serverStatus === 2) {
  //   console.log(`🗃️  Table ${directoriesTable} created`);
  //   for (const directory of testDirectories) {
  //     await connection.query(`INSERT INTO \`${directoriesTable}\` SET ?`, directory);
  //   }
  // }

  /* NOTES */
  const createdNotesTable = await connection.query(`CREATE TABLE IF NOT EXISTS \`${notesTable}\` (
    id char(36) NOT NULL PRIMARY KEY,
    name varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    bodyContent TEXT,
    user_id char(36) NOT NULL,
    parent_id char(36) DEFAULT NULL,
    node_type varchar(20) NOT NULL,
    CONSTRAINT \`Note_USERId_fkey\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES \`notes\` (id) ON DELETE CASCADE ON UPDATE CASCADE
    )`);

  if (createdNotesTable[0].serverStatus === 2) {
    console.log(`🗃️  Table ${notesTable} created`);
    for (const note of testNotes) {
      await connection.query(`INSERT INTO \`${notesTable}\` SET ?`, note);
    }
  }

  /* COOKIES */
  const createdCookiesTable = await connection.query(`CREATE TABLE IF NOT EXISTS \`${cookiesTable}\` (
    session_id char(36) NOT NULL PRIMARY KEY,
    email varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    userName varchar(255) NOT NULL
  )`);

  if (createdCookiesTable[0].serverStatus === 2) {
    console.log(`🗃️  Table ${cookiesTable} created`);
  }

  console.log("\n🚀 Setup complete. Looks like we're ready to go! 🚀\n");
} catch (error) {
  console.error(error);
}

export default connection;
