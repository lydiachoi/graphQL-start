const graphql = require("graphql");
const _ = require("lodash"); // lodash used at the beginning to search through dummy data. no longer used. 
const Book = require("../models/book");
const Author = require("../models/author");

const { // grab objects from GQL package to use to define the objects below
  GraphQLObjectType, 
  GraphQLString,
  GraphQLSchema, 
  GraphQLID, 
  GraphQLInt, 
  GraphQLList, 
  GraphQLNonNull,
} = graphql; 

// dummy data (array to store dataset, commented out as we now use mongoDB)
// var books = [
//   {name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "4"},  // note, ID should be written as string in order for graphQLID to work
//   {name: "The final Empire", genre: "Fantasy", id: "2", authorId: "2"}, 
//   {name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "1"}, 
//   {name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "1"}, 
//   {name: "The Color of Magic", genre: "Fantasy", id: "5", authorId: "3"}, 
//   {name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "2"}, 
// ];

// var authors = [
//   { name: "Patrick Rothfuss", age: 44, id: "1"}, 
//   { name: "Brandon Sanderson", age: 34, id: "2"}, 
//   { name: "Terry Pratchett", age: 66, id: "4"}, 
// ];

// Note: all resolve() body code was commented out after initializing mongoDB database
// as we no longer needed to query/find the dummy data


// Defining object types using GraphQLOjectType 
const BookType = new GraphQLObjectType({
  name: "book", 
  fields: () => ({               // wrapped inside of a function
    id: {type: GraphQLID},       
    name: {type: GraphQLString}, 
    genre: {type: GraphQLString}, 
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // console.log(parent); 
        // return _.find(authors, {id: parent.authorId}) // find (arrayname, id)
        return Author.findById(parent.authorId); 
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author", 
  fields: () => ({               // wrapped inside of a function
    id: {type: GraphQLID},       
    name: {type: GraphQLString}, 
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType), 
      resolve(parent,args) {
        // return _.filter(books, { authorId: parent.id});  // filters through the books array, looking for books where authorId = parent.id
        return Book.find({ authorId: parent.id }); // find allows you to pass object with your parameterized filter
      }
    }, 
  })
});

// Defining root query - how to initially jump into the graph from the front end 
const RootQuery = new GraphQLObjectType({ 
  name: "rootQueryType", 
  fields: {       // different ways to "jump into the graph" -- starting points. 
    book: {
      type: BookType,
      args: { id: {type: GraphQLID} }, 
      resolve(parent, args) {
        // code to get data from db /other source
        // return _.find(books, {id: args.id}); // when code fires, lodash will find the ids of books in our array
        return Book.findById(args.id);
      }
    }, 
    author: {
      type: AuthorType, 
      args: { id: {type: GraphQLID} }, 
      resolve(parent, args) {
        // return _.find(authors, {id: args.id});
        return Author.findById(args.id);
      }
    }, 
    books: {                          // returns entire list of books; 
      type: GraphQLList(BookType), 
      resolve(parent, args) {         // function simply returns entire list, no filtering
        // return books; 
        return Book.find({});         // no criteria - return all books
      }
    }, 
    authors: {            
      type:GraphQLList(AuthorType), 
      resolve(parent, args) {
        // return authors;
        return Author.find({});       // no criteria - return all authors
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation", 
  fields: {         //allows users to use the fields id'd below to create mutations on objects 
    addAuthor: {
      type: AuthorType, 
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }, 
        age: { type: new GraphQLNonNull(GraphQLInt)}, 
      }, 
      resolve(parent, args) { 
        let author = new Author({
          name: args.name, 
          age: args.age,
        });
        return author.save();  // mongoose knows how to save author because we've defined it in the model schema
        // mongoose returns successfully saved object in the save() method
      }
    }, 
    addBook: {
      type: BookType, 
      args: {
        name: { type: new GraphQLNonNull(GraphQLString)},
        genre: { type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID) }
      }, 
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save(); 
      }
    }
  },
});

// creating a new schema; pass in options to define which queries clients are allowed to use 
// exported here to be imported by app.js to use in the graphqlHTTP function
module.exports = new GraphQLSchema({
  query: RootQuery,          // they can query for objects in the db
  mutation: Mutation,        // can create mutations on objects in db
})
/* 
fields:() => ({
  id: {type: GraphQLString},  
  name: {type: GraphQLString},
  genre: {type: GraphQLString}
})
*/ 