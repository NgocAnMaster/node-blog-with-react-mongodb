const express = require("express");
const dbConnect = require("./db/dbConnect");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const PostRouter = require("./routes/PostRouter");
const User = require("./db/userModel");

// Connect to MongoDB
dbConnect();

app.use(cors());
app.use(express.json()); // parses incoming JSON
app.use("/api", PostRouter);

// Login route (optional)
// app.post("/api/login", jsonParser, (req, res) => {
//     const creds = {
//         username: req.body.username,
//         password: req.body.password,
//     };
//     if (creds.username === "admin" && creds.password === "123") {
//         res.status(200).send({ message: "Login successful" });
//     } else {
//         res.status(400).send({ message: "Login failed" });
//     }
// });

app.post("/api/login", jsonParser, async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        console.log("User found:", user);

        if (!user || user.password !== password) {
            return res.status(400).send({ message: "Login failed" });
        }

        res.status(200).send({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
    }
});


// Start server
app.listen(8080, () => {
    console.log("Server listening on port 8080");
});
