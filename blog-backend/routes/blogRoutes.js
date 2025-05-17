// routes/blogRoutes.js
const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const auth = require('../middleware/auth');

// GET all blogs
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// GET blog by slug
router.get("/:slug", async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (blog) return res.json(blog);
  res.status(404).send("Blog not found");
});

// POST new blog
router.post("/", auth, async (req, res) => {
  const { title, slug, content } = req.body;
  const newBlog = new Blog({ title, slug, content });
  await newBlog.save();
  res.status(201).json(newBlog);
});

// PUT update blog
router.put("/:slug", auth, async (req, res) => {
  const updated = await Blog.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true }
  );
  if (updated) return res.json(updated);
  res.status(404).send("Blog not found");
});

// DELETE blog
router.delete("/:slug", auth, async (req, res) => {
  const deleted = await Blog.findOneAndDelete({ slug: req.params.slug });
  if (deleted) return res.json({ message: "Deleted successfully" });
  res.status(404).send("Blog not found");
});

module.exports = router;
