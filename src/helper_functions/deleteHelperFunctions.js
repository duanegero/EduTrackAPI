const pool = require("../db"); //creating varible used to to connect to database

//async helper function to use in app
const deleteStudent = async (studentId) => {
  //creating a variable to handle query to database
  const result = await pool.query(
    `DELETE FROM students WHERE studentid = $1
RETURNING *;`,
    [studentId]
  );
  //return result to use in app
  return result;
};
//export function to use else where
module.exports = {
  deleteStudent,
};
