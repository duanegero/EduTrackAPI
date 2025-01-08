const pool = require("../db"); //creating varible used to to connect to database

//async helper function, with passed in variables, to use in app
const postNewStudent = async (lastname, firstname, dob, grade) => {
  //creating a variable to handle query to database
  //sending query to database, creating variable for results
  const result = await pool.query(
    `INSERT INTO students(lastname, firstname, dob, grade)
    VALUES($1, $2, $3, $4)
    RETURNING *;`,
    [lastname, firstname, dob, grade]
  );
  console.log(result);
  //return result to use in app
  return result;
};

//async helper function, with passed in variables, to use in app
const postNewGrade = async (studentId) => {
  //creating a variable to handle query to database
  //sending query to database, creating variable for results
  const result = await pool.query(
    `INSERT INTO student_grades(student_id)
    VALUES($1)
    RETURNING *;`,
    [studentId]
  );
  //return result to use in app
  return result;
};

//export functions to use else where
module.exports = {
  postNewStudent,
  postNewGrade,
};
