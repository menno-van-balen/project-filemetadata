"use strict";

var express = require("express");
var cors = require("cors");

// require and use "multer"...
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log("New file upload:", req.file);

  const filename = req.file.originalname;
  const size = req.file.size;
  const nameOnServer = req.file.filename;

  res.json({ filename, size, nameOnServer });
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Node.js listening on port: ${port}...`);
});
