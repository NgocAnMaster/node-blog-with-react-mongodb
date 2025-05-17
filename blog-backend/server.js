// index.js or server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/blogs", blogRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
