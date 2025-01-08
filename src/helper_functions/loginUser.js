const pool = require("../db"); //creating varible used to to connect to database

//async helper function, with passed in variables, to use in app
const loginUser = async (username, password) => {
  //creating a variable to handle query to database
  const query = `SELECT * FROM users
WHERE username = $1 AND password = $2;`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [username, password]);

  //return result to use in app
  return result;
};
//export function to use else where
module.exports = { loginUser };
