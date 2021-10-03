let mongoose = require("mongoose");

// Get the Schema constructor
let Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
let categorySchema = new Schema({
  category: {
    type: String,
    required: true
  }
});

// Create model from the schema
let Category = mongoose.model("Category", categorySchema);

// Export model
module.exports = Category;