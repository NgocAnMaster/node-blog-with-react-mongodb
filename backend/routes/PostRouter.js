const express = require("express");
const Post = require("../db/postModel");
const router = express.Router();

// Create a new post
router.post("/post", async (req, res) => {
    const post = new Post(req.body);
    try {
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all posts
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find({});
        res.send(posts);
    } catch (error) {
        res.status(500).send({ error });
    }
});

// Get a single post by slug
router.get("/post/:slug", async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });
        if (!post) return res.status(404).send({ message: "Post not found" });
        res.send(post);
    } catch (error) {
        res.status(500).send({ error });
    }
});

// Update a post by slug
router.patch("/post/:slug", async (req, res) => {
    try {
        const post = await Post.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        );
        if (!post) return res.status(404).send({ message: "Post not found" });
        res.send(post);
    } catch (error) {
        res.status(500).send({ error });
    }
});

// // Delete a post by slug
// router.delete("/post/:slug", async (req, res) => {
//     try {
//         const post = await Post.findOneAndDelete({ slug: req.params.slug });
//         if (!post) return res.status(404).send({ message: "Post wasn't found" });
//         res.status(204).send(); // No content
//     } catch (error) {
//         res.status(500).send({ error });
//     }
// });

// Update post
router.put("/post/:slug", async (req, res) => {
  try {
    const { title, description } = req.body;
    const updated = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      { title, description },
      { new: true }
    );

    if (!updated) return res.status(404).send({ message: "Post not found" });

    res.send(updated);
  } catch (err) {
    res.status(500).send({ message: "Error updating post" });
  }
});

// Delete post
router.delete("/post/:slug", async (req, res) => {
  try {
    const deleted = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).send({ message: "Post not found" });

    res.send({ message: "Post deleted" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting post" });
  }
});

module.exports = router;
