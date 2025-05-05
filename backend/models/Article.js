const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [5, "Title must be at least 5 characters"],
    maxlength: [200, "Title cannot exceed 200 characters"]
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    minlength: [50, "Content must be at least 50 characters"]
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async function(userId) {
        const user = await mongoose.model("User").findById(userId);
        return user && (user.role === "admin" || user.role === "author");
      },
      message: "Author must have either 'admin' or 'author' role"
    }
  },
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft"
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  coverImage: String
}, { 
  timestamps: true
});


ArticleSchema.index({ title: "text", content: "text" });
ArticleSchema.index({ author: 1, status: 1 });

module.exports = mongoose.model("Article", ArticleSchema);