const express = require("express");
const users = require("./data/user");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors()); // Use the cors middleware to enable CORS

app.get("/", (req, res) => {
  res.send("hello express server");
});
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (user && user.password === password) {
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "secret key"
    );
    res.status(200).json({ sucess: true, token: token });
  } else {
    res.status(401).json({ sucess: false, message: "Invalid credentilas" });
  }
});

let formDataList = [];
let currentId = 1;

app.post("/api/saveFormData", (req, res) => {
  const formData = req.body;
  formData.id = currentId++;
  formDataList.push(formData);

  console.log("Form Data Received:", formData);

  // Send a success response
  res.status(200).json({ success: true, message: "Data saved successfully" });
});

app.get("/api/getAllFormData", (req, res) => {
  // Return all saved form data
  res.status(200).json({ success: true, formDataList: formDataList });
});
app.post("/api/getFormDataById", (req, res) => {
  // Retrieve the ID from the request body
  const { id } = req.body;

  // Here, you can use the ID to fetch data from your database or perform any necessary operations

  // For demonstration, let's assume formDataList is an array of objects containing form data
  // Replace this with your actual data fetching logic
  const formData = formDataList.find((data) => data.id === id);

  // Return a response
  if (formData) {
    res.status(200).json({ success: true, formData: formData });
  } else {
    res.status(404).json({ success: false, message: "Form data not found" });
  }
});

// Start the server
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
