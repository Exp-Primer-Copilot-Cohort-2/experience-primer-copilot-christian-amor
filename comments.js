// Create web server
// Create a new comment
// Fetch all comments
// Fetch a single comment
// Update a comment
// Delete a comment
// Export the router

const express = require('express');
const { Comment } = require('../models');

const router = express.Router();

// Create a new comment
router.post('/', async (req, res) => {
  const { body } = req.body;
  const comment = await Comment.create({ body });
  res.json(comment);
});

// Fetch all comments
router.get('/', async (req, res) => {
  const comments = await Comment.findAll();
  res.json(comments);
});

// Fetch a single comment
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);
  if (!comment) {
    res.status(404).json({ error: 'Comment not found' });
  } else {
    res.json(comment);
  }
});

// Update a comment
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  const comment = await Comment.findByPk(id);
  if (!comment) {
    res.status(404).json({ error: 'Comment not found' });
  } else {
    comment.body = body;
    await comment.save();
    res.json(comment);
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);
  if (!comment) {
    res.status(404).json({ error: 'Comment not found' });
  } else {
    await comment.destroy();
    res.json({ message: 'Comment deleted' });
  }
});

module.exports = router;