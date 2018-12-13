import React, { Component } from "react";
import { gql } from "apollo-boost"; 
import { graphql } from "react-apollo";

// query goes inside `<here>` directly after gql for parsing
const getAuthorsQuery = gql`  
  {
    authors {
      name
      id
    }
  }
`

class AddBook extends Component {
  displayAuthors() {
    var data = this.props.data; 

    if (data.loading) {
      return(<option disabled> Loading Authors... </option>);
    } else {
      return data.authors.map(
        function(author){ 
          return(<option key={author.id}>{author.name}</option>);
        }
      )
    }
  }
  
  
  
  render() {
    console.log(this.props); // logs the data object (can see data.loading property)
    return (
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text"/>
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text"/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select>
            <option> Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
        
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);