Stack/Packages   | Definition/Usage
-----------------| -------------
Express          | ExpressGraphQL module allows express to understand graphQL and provides a simple way to create an express server that runs the graphQL API - used as middleware on a single route - route acts as endpoint to interact with graphQL endpoint. 
Nodemon          | Monitor for any changes in your node.js application and automatically restart the server 
GraphiQL | A graphical interactive in-browser GraphQL IDE - provides a React component responsible for rendering the UI, which should be provided with a function for fetching from GraphQL.
Lodash | utility module lodash - Lodash is a JavaScript library which provides utility functions for common programming tasks using the functional programming paradigm


# Stack used: #

## GraphQL ##
 - GraphqlHTTP takes in a schema (object) - which tells express-graphql about the data and how it will look 

### Building the GraphQL Schema ###
- Root Queries: root queries are graphQLObjects defined in the schema - in fields, you will define everything a client can query for - i.e. Books, authors, etc. in each field, a type is specified (previously defined in schema) and the arguments that can be passed into the query to id the type

i.e. 
``` 
book(id:'123') {        // argument(s) defined in schema
  name  
  genre
}
```

## GraphiQL ## 
- In-browser tool for writing, validating, and  testing GraphQL queries.
- Added graphiQL to app.js to allow for query testing on to show up when you go to localhost:4000/graphql 
- Documentation explorer: tells you about the graphQL server that you're making queries to - different for each graphQL server. Can be used to QA the various properties/data allowed to be retrieved

## Express ##
ExpressGraphQL module allows express to understand graphQL and provides a simple way to create an express server that runs the graphQL API.
  - Used as middleware on a single route - route acts as endpoint to interact with graphQL endpoint. 

## Nodemon ##
 -  Continuously listens to app.js for changes so restarting server isn't necessary everytime

## Lodash ##
- A JavaScript utility library delivering consistency, mogdularity, performance, & extras - utility module used to help us find data in array in schema.js
