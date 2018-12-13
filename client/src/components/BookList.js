import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries"; 

class BookList extends Component {
  displayBooks() { 
    var data = this.props.data;

    if (data.loading) {
      return( <div> Loading Books... </div> );
    } else {
      return data.books.map( // maps each book in the array to some HTML
        function(book) {
          return( <li key={book.id}> {book.name} </li> );
        }) 
    }
  }

  render() {
    console.log(this.props); // logs the data object (can see data.loading property)
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList); // use graphql to bind getBooksQuery to BookList
