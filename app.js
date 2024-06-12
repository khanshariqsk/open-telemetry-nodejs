require("./tracing");

const express = require("express");
const app = express();

app.use(express.json());

// GET endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// GET endpoint
app.get("/api/getData", (req, res) => {
  res.json({
    message: "This is a GET request",
    data: { id: 1, value: "sample data" },
  });
});

// POST endpoint
app.post("/api/postData", (req, res) => {
  const data = req.body;
  console.log({ data });
  res.json({ message: "This is a POST request", receivedData: data });
});

// PUT endpoint
app.put("/api/putData/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  res.json({
    message: "This is a PUT request",
    updatedId: id,
    updatedData: data,
  });
});

// DELETE endpoint
app.delete("/api/deleteData/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: "This is a DELETE request", deletedId: id });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
