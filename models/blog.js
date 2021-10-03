const mongoose = require("mongoose");

// Get the Schema constructor
const Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
const blogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
});

// Create model from the schema
const Blog = mongoose.model("Blog", blogSchema);

// Export model
module.exports = Blog;