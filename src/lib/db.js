const mysql = require('mysql2');

export const getDatabase = () => {
  const db = mysql.createConnection({
    multipleStatements: true,
    host     : '0.tcp.ngrok.io',
    port     : 12254,
    user     : 'root',
    password : '', //Not secure to store it this way; fill in yourself
    database : 'guestbook'
  });

  return db;
};

export const closeDBInstance = (db) => {
  db.end();
};