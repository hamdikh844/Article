const Article = require('../models/Article');

const ArticleService = {


   
  getAll: async () => {
    try {
      const articles = await Article.find()
        .populate('author', 'username email') 
        .sort({ createdAt: -1 }); 
      return articles;
    } catch (error) {
      throw new Error(`Failed to get articles: ${error.message}`);
    }
  }
};

module.exports = ArticleService;