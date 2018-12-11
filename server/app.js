 const express = require("express"); // require the package we need
 const graphqlHTTP = require("express-graphql"); // naming convention for expressGraphQL - middleware function 
 const schema = require("./schema/schema");
 const mongoose = require("mongoose");

 const app = express(); // set up all to use express package

// connects to mlab mongoDB database
mongoose.connect("mongodb://lchoii:test123@ds129454.mlab.com:29454/graphql-tut", { useNewUrlParser: true });
mongoose.connection.once("open", function() { // a listener to notify once the connection is created
  console.log("connected to database"); 
})

 // handles all graphQL requests 
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true          // allows graphiql UI on /graphQL
}));

 // app listening for requests on port 4000
 app.listen(4000,function() {
   console.log("now listening for requests on port 4000");
 })

  