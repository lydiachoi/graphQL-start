const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString } = graphql; // grab objects from GQL package to use to define the objects below

const BookType = new GraphQLObjectType({
  name: "book", 
  fields: function() {
    ({id: {type: GraphQLString},
      name: {type: GraphQLString},
      genre: {type: GraphQLString}})
  }
});

https://www.youtube.com/watch?v=A8vtRvz-lK0&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f&index=7