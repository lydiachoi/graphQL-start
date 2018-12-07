 const express = require("express"); // require the package we need
 const graphqlHTTP = require("express-graphql"); // naming convention for expressGraphQL - middleware function 
 const app = express(); // set up all to use express package

app.use("/graphql",graphqlHTTP({ // handles all graphQL requests 


})); 

 // app listening for requests on port 4000
 app.listen(4000,function() {
   console.log("now listening for requests on port 4000");
 })

  