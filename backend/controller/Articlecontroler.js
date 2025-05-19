const Article = require("../models/Article");
const fs = require('fs');
const path = require('path');

// Helper function to delete files
const deleteFile = (filePath) => {
    if (filePath) {
        const fullPath = path.join(__dirname, '../public', filePath);
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }
    }
};

const createArticle = async (req, res) => {
    try {
        const { name, description, price, author, tags, status } = req.body;

        // Validate required fields
        if (!name || !description || !author) {
            // If there was an uploaded file but validation failed, delete it
            if (req.file) deleteFile(`/uploads/articles/${req.file.filename}`);
            
            return res.status(400).json({
                success: false,
                message: 'Name, description, and author are required',
                errors: {
                    name: !name ? 'Name is required' : null,
                    description: !description ? 'Description is required' : null,
                    author: !author ? 'Author is required' : null
                }
            });
        }

        const article = new Article({
            name,
            description,
            price: price || 0,
            author,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            status: status || 'draft',
            image: req.file ? `/uploads/articles/${req.file.filename}` : null
            // Removed user field since we're not requiring authentication
        });

        await article.save();

        res.status(201).json({
            success: true,
            message: 'Article created successfully',
            article
        });
    } catch (error) {
        // Clean up uploaded file if there was an error
        if (req.file) deleteFile(`/uploads/articles/${req.file.filename}`);
        
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).reduce((acc, key) => {
                acc[key] = error.errors[key].message;
                return acc;
            }, {});
            
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        console.error('Create Article Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating article',
            error: error.message
        });
    }
};

const getAllArticles = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, search } = req.query;
        const skip = (page - 1) * limit;
        
        const query = {};
        if (status) query.status = status;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } }
            ];
        }

        const articles = await Article.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await Article.countDocuments(query);

        res.status(200).json({
            success: true,
            count: articles.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: Number(page),
            articles
        });
    } catch (error) {
        console.error('Get All Articles Error:', error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching articles", 
            error: error.message 
        });
    }
};

const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        
        if (!article) {
            return res.status(404).json({ 
                success: false,
                message: "Article not found" 
            });
        }

        res.status(200).json({
            success: true,
            article
        });
    } catch (error) {
        console.error('Get Article Error:', error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching article", 
            error: error.message 
        });
    }
};

const updateArticle = async (req, res) => {
    try {
        const { name, description, price, author, tags, status } = req.body;
        const articleId = req.params.id;

        // Find existing article
        const existingArticle = await Article.findById(articleId);
        if (!existingArticle) {
            if (req.file) deleteFile(`/uploads/articles/${req.file.filename}`);
            return res.status(404).json({ 
                success: false,
                message: "Article not found" 
            });
        }

        // Handle image update
        let imagePath = existingArticle.image;
        if (req.file) {
            if (existingArticle.image) deleteFile(existingArticle.image);
            imagePath = `/uploads/articles/${req.file.filename}`;
        }

        // Update article with new fields
        const updatedArticle = await Article.findByIdAndUpdate(
            articleId,
            { 
                name, 
                description, 
                price, 
                author,
                tags: tags ? tags.split(',').map(tag => tag.trim()) : existingArticle.tags,
                status: status || existingArticle.status,
                image: imagePath,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({ 
            success: true,
            message: "Article updated successfully", 
            article: updatedArticle 
        });
    } catch (error) {
        if (req.file) deleteFile(`/uploads/articles/${req.file.filename}`);
        
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).reduce((acc, key) => {
                acc[key] = error.errors[key].message;
                return acc;
            }, {});
            
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors
            });
        }

        console.error('Update Article Error:', error);
        res.status(500).json({ 
            success: false,
            message: "Error updating article", 
            error: error.message 
        });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;

        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ 
                success: false,
                message: "Article not found" 
            });
        }

        // Delete associated image
        if (article.image) deleteFile(article.image);

        await article.deleteOne();

        res.status(200).json({ 
            success: true,
            message: "Article deleted successfully" 
        });
    } catch (error) {
        console.error('Delete Article Error:', error);
        res.status(500).json({ 
            success: false,
            message: "Error deleting article", 
            error: error.message 
        });
    }
};

const publishArticle = async (req, res) => {
    try {
        const articleId = req.params.id;

        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ 
                success: false,
                message: "Article not found" 
            });
        }

        article.status = 'published';
        await article.save();

        res.status(200).json({ 
            success: true,
            message: "Article published successfully",
            article
        });
    } catch (error) {
        console.error('Publish Article Error:', error);
        res.status(500).json({ 
            success: false,
            message: "Error publishing article", 
            error: error.message 
        });
    }
};

module.exports = { 
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    publishArticle
};