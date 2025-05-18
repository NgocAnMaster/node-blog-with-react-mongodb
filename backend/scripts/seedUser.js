// backend/scripts/seedUser.js
const mongoose = require("mongoose");
const User = require("../db/userModel");
require("dotenv").config();

mongoose.connect(process.env.DB_URL).then(async () => {
    try {
        const existing = await User.findOne({ username: "admin" });
        if (!existing) {
            await User.create({ username: "admin", password: "123" });
            console.log("User created!");
        } else {
            console.log("User already exists.");
        }
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
});
