const express = require("express"); //importing exprees
const cors = require("cors"); //importing cors
const app = express(); //setting variable to handle express
const PORT = process.env.PORT || 3003; //setting port number for server

//setting variables to handle routes in API, importing routes
const studentsRoute = require("./routes/students.js");
const loginRoute = require("./routes/login.js");
const gradesRoute = require("./routes/grades.js");

app.use(express.json());
app.use(cors());

//setting up rotuing for endpoints, linking them to correct ports
app.use("/students", studentsRoute);
app.use("/login", loginRoute);
app.use("/grades", gradesRoute);

app.get("/", (req, res) => {
  res.send("Student API");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
