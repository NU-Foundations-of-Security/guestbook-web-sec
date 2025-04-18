const mysql = require('mysql2');

export const getDatabase = () => {
  const db = mysql.createConnection({
    multipleStatements: true,
    host     : '6.tcp.ngrok.io',
    port     : 11283,
    user     : 'web_app',
    password : 'web_app', //Not secure to store it this way; fill in yourself
    database : 'guestbook'
  });

  return db;
};

export const closeDBInstance = (db) => {
  db.end();
};