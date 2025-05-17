const express = require('express');
const router = express.Router();
const blogs = require('../data/blogs');

// GET /api/blogs - List all blogs
router.get('/', (req, res) => {
  const blogSummaries = blogs.map(({ id, slug, title, summary }) => ({
    id, slug, title, summary
  }));
  res.json(blogSummaries);
});

// GET /api/blogs/:slug - Get blog detail
router.get('/:slug', (req, res) => {
  const blog = blogs.find(b => b.slug === req.params.slug);
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  res.json(blog);
});

module.exports = router;
