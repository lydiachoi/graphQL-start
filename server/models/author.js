const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const authorSchema = new Schema({ // object describes different data types/properties on a book
  name: String,
  age: Number, 
}); 

// see book.js for explanation 
module.exports = mongoose.model("Author", authorSchema); 
