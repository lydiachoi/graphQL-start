const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql; // grab objects from GQL package to use to define the objects below


// Defining object types using GraphQLOjectType 
const BookType = new GraphQLObjectType({
  name: "book", 
  fields: function() {({        // wrapped inside of a function
    id: {type: GraphQLString}, // must be a GraphQLString 
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })}
});

// Defining root query - how to initially jump into the graph from the front end 
const RootQuery = new GraphQLObjectType({
  name: "rootQueryType", 
  fields: {       // different ways to "jump into the graph" -- starting points. 
    book: {
      type: BookType,
      args: { id: {type: GraphQLString} }, 
      resolve(parent, args) {
        /// code to get data from db /other source
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