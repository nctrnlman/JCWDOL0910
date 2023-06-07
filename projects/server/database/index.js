require("dotenv").config({
  path: ".env.local",
});
const mysql = require("mysql2");
const util = require("util");
const env = process.env;

const db = mysql.createConnection({
  host: env.MYSQL_HOST,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DB_NAME,
  port: env.MYSQL_PORT,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.connect((err) => {
  if (err) {
    return console.error(`error: ${err.message}`);
  }
  console.log("Connected to mysql server");
});

const query = util.promisify(db.query).bind(db);
module.exports = { db, query };
