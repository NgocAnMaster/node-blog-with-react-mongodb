const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: [true, "Please provide slug"],
        unique: [true, "Slug exists"],
    },
    title: {
        type: String,
        required: [true, "Please provide a title!"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description!"],
    },
});

// Use `mongoose.models` to avoid model overwrite errors during hot reloads
module.exports = mongoose.models.Posts || mongoose.model("Posts", PostSchema);
