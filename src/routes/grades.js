//requiring express and setting router variable
const express = require("express");
const router = express.Router();

//importing helper function to use
const {
  getStudentGradesById,
} = require("../helper_functions/getHelperFunctions");
const { putUpdateGrades } = require("../helper_functions/putHelperFunctions");
const verifyToken = require("../middleware/token");

//defining route to GET grades by ID
router.get("/:id", verifyToken, async (req, res) => {
  //parse the ID from RUL
  const studentId = parseInt(req.params.id);
  try {
    //try helper function passing in ID
    const result = await getStudentGradesById(studentId);
    //respond with Json
    res.json(result.rows);
  } catch (error) {
    //catch any errors and log
    console.log("ERROR", error);
    res.status(500).json({ message: "ERROR" });
  }
});

//defining route to POST grades by ID
router.put("/:id", verifyToken, async (req, res) => {
  //parse the ID from RUL
  const studentId = parseInt(req.params.id);

  //geting the info for the update from the request body
  const { math, english, gym, science } = req.body;

  try {
    //using helper function to update, passing in varibles for function to use
    const result = await putUpdateGrades(
      math,
      english,
      gym,
      science,
      studentId
    );
    //respond with JSON
    res.json(result.rows);
  } catch (error) {
    //catch any errors and log
    console.log("ERROR", error);
    res.status(500).json({ message: "ERROR" });
  }
});

//export router to use in app
module.exports = router;
