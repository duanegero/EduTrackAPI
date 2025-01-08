const jwt = require("jsonwebtoken"); //importing json web token to create and verify tokens in app
const { myKey } = require("../routes/login"); //importing key from login route

//creating function to verify token,
const verifyToken = function (req, res, next) {
  //checking the request header for token, authorization is the key
  const authHeader = req.headers["authorization"];

  //removing the bearer from the token
  const token = authHeader.split(" ")[1];

  try {
    //use jwt to verify token, with key
    jwt.verify(token, myKey);
    next();
  } catch (error) {
    //catch and log any errors
    console.log("ERROR", error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

//export function to use else where
module.exports = verifyToken;
