import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookDetailsQuery } from "../queries/queries"; 


class BookDetails extends Component {
  displayBookDetails(){
    const { book } = this.props.data;  // equivalent to const book = this.props.data.book; 
    if (book) {
      return (
        <div>
          <h2> {book.name} </h2>
          <p> {book.genre} </p>
          <p> {book && book.author && book.author.name} </p>
          <p> All books by this author: </p>
          <ul className="other-books"> 
              {
                book && book.author && book.author.books.map( function(item) {
                  return <li key={item.id} > {item.name} </li>
                })
              } 
          </ul>
        </div>
      )
    } else {
      return ( <div> No Books Selected...</div>)
    }
  }

  render() {  
    return (
      <div id="book-details">
        { this.displayBookDetails() }
      </div>
    );
  };
  
}

export default graphql(getBookDetailsQuery, {
  options: function(props) {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);