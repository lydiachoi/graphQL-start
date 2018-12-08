const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const bookSchema = new Schema({ // object describes different data types/properties on a book
  name: String,
  genre: String, 
  authorId: String, 
}); 

// a collection of "Book", in which all objects have schema "BookSchema"
// exporting to use later in mongoDB
module.exports = mongoose.model("Book", bookSchema); 
