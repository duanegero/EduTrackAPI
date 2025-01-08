const pool = require("../db"); //creating varible used to to connect to database

//async helper function to use in app
const getAllStudents = async () => {
  //creating a variable to handle query to database
  const result = await pool.query(`SELECT * FROM students`);
  //return result to use in app
  return result;
};

//async helper function to use in app
const getAllGrade = async (grade) => {
  //creating a variable to handle query to database
  const result = await pool.query(
    `SELECT * FROM students
    WHERE grade = $1
    ORDER BY lastname ASC;`,
    [grade]
  );
  //return result to use in app
  return result;
};

//async helper function to use in app
const getStudentGradesById = async (studentId) => {
  //creating a variable to handle query to database
  const result = await pool.query(
    `SELECT * FROM student_grades
    WHERE student_id = $1`,
    [studentId]
  );
  //return result to use in app
  return result;
};

//export functions to use else where
module.exports = {
  getAllStudents,
  getAllGrade,
  getStudentGradesById,
};
