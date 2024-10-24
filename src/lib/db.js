const mysql = require('mysql2');

export const getDatabase = () => {
  const db = mysql.createConnection({
    multipleStatements: false,
    host     : '2.tcp.ngrok.io',
    port     : 18492,
    user     : 'web_app',
    password : 'web_app', //Not secure to store it this way; fill in yourself
    database : 'guestbook'
  });

  return db;
};

export const closeDBInstance = (db) => {
  db.end();
};