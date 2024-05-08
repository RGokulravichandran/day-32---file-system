const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to create a text file with current timestamp
app.post("/create-file", (req, res) => {
  // To get individual date and time components
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = currentDate.getFullYear().toString();
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const formattedDateTime = `${day}.${month}.${year}-${hours}.${minutes}.${seconds}`;
  const filePath = path.join("files", `${formattedDateTime}.txt`);

  fs.writeFile(filePath, formattedDateTime, (err) => {
    if (err) {
      console.error("Error creating file:", err);
      return res.status(500).json({ error: "Failed to create file" });
    }
    console.log("File created successfully:", filePath);
    res.status(201).json({ message: "File created successfully" });
  });
});

// Endpoint to retrieve all text files in the folder
app.get("/files", (req, res) => {
  const folderPath = path.join("files");

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading files:", err);
      return res.status(500).json({ error: "Failed to read files" });
    }
    res.json({ files });
  });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
