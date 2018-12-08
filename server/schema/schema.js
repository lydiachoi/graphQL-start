const graphql = require("graphql");

const { // grab objects from GQL package to use to define the objects below
  GraphQLObjectType, 
  GraphQLString,
  GraphQLSchema, 
  GraphQLID, 
  GraphQLInt, 
  GraphQLList } = graphql; 
  const _ = require("lodash");

// dummy data (array to store dataset, will use mongoDB later)
var books = [
  {name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "4"},  // note, ID should be written as string in order for graphQLID to work
  {name: "The final Empire", genre: "Fantasy", id: "2", authorId: "2"}, 
  {name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "1"}, 
  {name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "1"}, 
  {name: "The Color of Magic", genre: "Fantasy", id: "5", authorId: "3"}, 
  {name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "2"}, 
];

var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1"}, 
  { name: "Brandon Sanderson", age: 34, id: "2"}, 
  { name: "Terry Pratchett", age: 66, id: "4"}, 
];

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
        return _.find(authors, {id: parent.authorId}) // find (arrayname, id)
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
        return _.filter(books, { authorId: parent.id});  // filters through the books array, looking for books where authorId = parent.id
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
        return _.find(books, {id: args.id}); // when code fires, lodash will find the ids of books in our array
      }
    }, 
    author: {
      type: AuthorType, 
      args: { id: {type: GraphQLID} }, 
      resolve(parent, args) {
        return _.find(authors, {id: args.id});
      }
    }, 
    books: {                          // returns entire list of books; 
      type: GraphQLList(BookType), 
      resolve(parent, args) {         // function simply returns entire list, no filtering
        return books; 
      }
    }, 
    authors: {            
      type:GraphQLList(AuthorType), 
      resolve(parent, args) {
        return authors;
      }
    }
  }
})

// creating a new schema; pass in options to define which queries clients are allowed to use 
// exported here to be imported by app.js to use in the graphqlHTTP function
module.exports = new GraphQLSchema({
  query: RootQuery
})
/* 
fields:() => ({
  id: {type: GraphQLString},  
  name: {type: GraphQLString},
  genre: {type: GraphQLString}
})
*/ 