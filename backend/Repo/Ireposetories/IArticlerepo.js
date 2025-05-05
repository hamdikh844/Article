const Article = require('../models/Article');


const getAll = async () => {
    try {
        const articles = await Article.find().exec();
        return articles;
    } catch (error) {
        throw new Error(`Failed to get articles: ${error.message}`);
    }
};

module.exports = {
    getAll
};
