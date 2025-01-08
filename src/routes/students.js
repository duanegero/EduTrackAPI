//requiring express and setting router variable
const express = require("express");
const router = express.Router();

//importing helper functions
const {
  getAllStudents,
  getAllGrade,
} = require("../helper_functions/getHelperFunctions");
const {
  postNewStudent,
  postNewGrade,
} = require("../helper_functions/postHelperFunctions");
const { putUpdateStudent } = require("../helper_functions/putHelperFunctions");
const { deleteStudent } = require("../helper_functions/deleteHelperFunctions");

//importing verify token to protect routes
const verifyToken = require("../middleware/token");

//defining GET route
router.get("/", async (req, res) => {
  try {
    //using helper function to GET
    const result = await getAllStudents();
    //responding with result in JSON
    res.json(result.rows);
  } catch (error) {
    //catch and log any errors
    console.log("ERROR", error);
    res.status(500).json({ message: "ERROR" });
  }
});

//defining GET route
router.get("/:grade", verifyToken, async (req, res) => {
  //parsing grade from request URL
  const grade = parseInt(req.params.grade);
  try {
    //using helper function to GET
    const result = await getAllGrade(grade);
    //responding with result in JSON
    res.json(result.rows);
  } catch (error) {
    //catch and log any errors
    console.log("ERROR", error);
    res.status(500).json({ message: "ERROR" });
  }
});

//defining POST route
router.post("/", verifyToken, async (req, res) => {
  //getting details from request body
  const { lastname, firstname, dob, grade } = req.body;

  //if any field empty respond error JSON
  if (!lastname || !firstname || !dob || !grade) {
    return res
      .status(400)
      .json({ message: "Both names, Date of Birth and Grade required!" });
  }

  try {
    //using helper function to POST
    const result = await postNewStudent(lastname, firstname, dob, grade);

    //creating variable to handle result
    const newStudent = result.rows[0];

    //if no results return error message
    if (!newStudent) {
      return res.status(500).json({ message: "Failed to add new student." });
    }

    //getting the ID of new student, create varible to handle
    const newStudentId = newStudent.studentid;

    //using helper function, to create new row in grades table for new student
    const gradeResult = await postNewGrade(newStudentId);
    //respond ok status and success message, log new student and grades
    res.status(201).json({
      message: "Added successfully",
      newStudent: result.rows[0],
      newGrade: gradeResult.rows[0],
    });
  } catch (error) {
    //catch and log any errors
    console.log("ERROR", error);
    res.status(500).json({ message: "Error" });
  }
});

//defining route for PUT
router.put("/:id", verifyToken, async (req, res) => {
  //parsing id from request URL
  const studeniId = parseInt(req.params.id);

  //getting details from request body
  const { lastname, firstname, dob, grade } = req.body;

  //if any field empty respond error JSON
  if (!lastname || !firstname || !dob || !grade) {
    return res
      .status(400)
      .json({ message: "Both names, Date of Birth and Grade required!" });
  }

  try {
    //using helper function to PUT
    const result = await putUpdateStudent(
      lastname,
      firstname,
      dob,
      grade,
      studeniId
    );
    //respond ok status and success message
    res.status(201).json({
      message: "Updated successfully",
      updatedStudent: result.rows[0],
    });
  } catch (error) {
    //catch and log any errors
    console.log("ERROR", error);
    res.status(500).json({ message: "Error" });
  }
});

//defining route to DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  //parsing id from request URL
  const studentId = parseInt(req.params.id);

  try {
    //using helper function to DELETE
    const result = await deleteStudent(studentId);

    //if result find nothing return 404 and message
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    //respond ok status and success message
    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    //log any errors for troubleshoot
    console.log("Error", error);
    res.status(500).json({ message: "Error" });
  }
});

//export router to use else where
module.exports = router;
