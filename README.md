Stack/Packages   | Definition/Usage
-----------------| -------------
Express          | ExpressGraphQL module allows express to understand graphQL and provides a simple way to create an express server that runs the graphQL API - used as middleware on a single route - route acts as endpoint to interact with graphQL endpoint. 
Nodemon          | Monitor for any changes in your node.js application and automatically restart the server 
GraphQL | TBD
| utility module lodash - Lodash is a JavaScript library which provides utility functions for common programming tasks using the functional programming paradigm, 
## Stack used: ## 

# Express #
ExpressGraphQL module allows express to understand graphQL and provides a simple way to create an express server that runs the graphQL API.
  - used as middleware on a single route - route acts as endpoint to interact with graphQL endpoint. 

# Nodemon #
 - to continuously listen to app.js for changes so restarting server isn't necessary everytime

# GraphQL #
 - graphqlHTTP takes in a schema (object) - which tells express-graphql about the data and how it will look 

## building the graphQL schema ##
- Root Queries: root queries are graphQLObjects defined in the schema - in fields, you will define everything a client can query for - i.e. Books, authors, etc. in each field, a type is specified (previously defined in schema) and the arguments that can be passed into the query to id the type

i.e. book(id:'123') {        < this is the argument
  name  
  genre
}


# Lodash #
- utility module used to help us find data in array in schema.js
