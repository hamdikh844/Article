const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Article name is required'],
        trim: true,
        minlength: [5, 'Article name must be at least 5 characters'],
        maxlength: [100, 'Article name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [50, 'Description must be at least 50 characters']
    },
    price: {
        type: Number,
        min: [0, 'Price cannot be negative'],
        default: 0
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
    },
    image: {
        type: String,
        default: null,
        validate: {
            validator: function(v) {
                // Simple URL/path validation
                return v === null || /^\/uploads\/articles\/[a-zA-Z0-9\-_]+\.(jpg|jpeg|png|gif)$/.test(v);
            },
            message: props => `${props.value} is not a valid image path!`
        }
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    tags: {
        type: [String],
        default: [],
        validate: {
            validator: function(v) {
                return v.length <= 5;
            },
            message: 'Cannot have more than 5 tags'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});




const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;