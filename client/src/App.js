import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";


// components
import AddBook from "./components/AddBook"; // 
import BookList from "./components/BookList"; // renders the <BookList/> component inside app

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql" // the endpoint we created for the graphql app
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}> 
        <div id="main">
          <h1>Lydia's Reading List</h1>    
          <BookList/>    
          <AddBook/>
        </div>
      </ApolloProvider> 
    );
  }
}

export default App;
 