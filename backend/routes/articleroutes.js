const express = require('express');
const router = express.Router();
const articleController = require('../controller/Articlecontroler');
const upload = require('../middlewar/uploadMiddleware');

// Create a new article with image upload
router.post(
  '/create',
  upload,  // Now using the combined middleware directly
  articleController.createArticle
);
// Get all articles
router.get('/read', articleController.getAllArticles);

// Get a single article by id
router.get('/read/:id', articleController.getArticleById);

// Update an article (with optional image update)
router.put(
  '/update/:id',
  upload,
  articleController.updateArticle
);

// Delete an article by id
router.delete('/remove/:id', articleController.deleteArticle);

// Publish an article
router.patch('/publish/:id', articleController.publishArticle);

module.exports = router;