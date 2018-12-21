import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries"; 

// components imported
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null // keeps the id of whichever book we select
    }
  }

  displayBooks() { 
    var data = this.props.data;

    if (data.loading) {
      return( <div> Loading Books... </div> );
    } else {
      return data.books.map( // maps each book in the array to some HTML
        book => {
          return( <li key={book.id} onClick={ (e) => { this.setState({selected: book.id}) }}> {book.name} </li> );
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
        <BookDetails bookId={ this.state.selected }/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList); // use graphql to bind getBooksQuery to BookList
