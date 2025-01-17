//importing the Pool class from 'pg' for database connection
const { Pool } = require("pg");

//creating new connection pool
const pool = new Pool({
  user: "duane",
  host: "EduTrack-Container",
  database: "EduTrack-Database",
  password: "edutrack321",
  port: 5432,
});

//export pool to use in app and send queries
module.exports = pool;
