const pool = require("../db"); //creating varible used to to connect to database

//async helper function, with passed in variables, to use in app
const putUpdateStudent = async (lastname, firstname, dob, grade, studeniId) => {
  //creating a variable to handle query to database
  //sending query to database, creating variable for results
  const result = await pool.query(
    `UPDATE students
SET lastname = $1, firstname = $2, dob = $3, grade = $4
WHERE studentid = $5
RETURNING *;`,
    [lastname, firstname, dob, grade, studeniId]
  );
  //return result to use in app
  return result;
};

//async helper function, with passed in variables, to use in app
const putUpdateGrades = async (math, english, gym, science, studentId) => {
  //creating a variable to handle query to database
  //sending query to database, creating variable for results
  const result = await pool.query(
    `UPDATE student_grades
SET math = $1, english = $2, gym = $3, science = $4
WHERE student_id = $5
RETURNING *;`,
    [math, english, gym, science, studentId]
  );
  //return result to use in app
  return result;
};

//export functions to use else where
module.exports = { putUpdateStudent, putUpdateGrades };
