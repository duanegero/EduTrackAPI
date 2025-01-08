const express = require("express"); //importing express from npm
const router = express.Router(); //creating a router variable to handle the route
const jwt = require("jsonwebtoken"); //importing jwt from npm
require("dotenv").config();

//importing helper function
const { loginUser } = require("../helper_functions/loginUser");

//get key from evn
const myKey = process.env.API_KEY;
//log for testing
console.log("API Key: ", myKey);

//defining route to POST username and password
router.post("/", async (req, res) => {
  //getting username and password from body
  const { username, password } = req.body;

  //if no username or password return error
  if (!username || !password) {
    return res.status(400).json({ message: "Username and Password required" });
  }

  try {
    //try helper function to, create varible to handle result
    const result = await loginUser(username, password);

    //if nothing found return invalid
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid Username or Password" });
    }
    //assgin returned result to variable
    const user = result.rows[0];

    //create payload
    console.log(user.id);
    const payload = { userID: user.id };

    //create toke with jwt, payload and key
    const token = jwt.sign(payload, myKey);

    //responsed with token
    res.json(token);
    console.log(token);
  } catch (error) {
    //catch and log any errors
    console.log("ERROR", error);
    res.status(500).json({ message: "Error" });
  }
});

//export router and key to use else where
module.exports = router;
module.exports.myKey = myKey;
