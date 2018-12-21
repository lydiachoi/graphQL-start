import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getAuthorsQuery, getBooksQuery, addBookMutation } from "../queries/queries"; 

class AddBook extends Component {

  constructor(props) {
    super(props);

    this.state = { // keeps track of all the form field states - initial state empty
      name: "",
      genre: "", 
      authorId: "", 
    };
  }

  displayAuthors() {
    var data = this.props.getAuthorsQuery; 
 
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

  submitForm(eventObject) { // we bound "this" to submitForm() so it can refer to this as the current state
    eventObject.preventDefault(); // default is that the page just refreshes

    console.log("state ", this.state);
    this.props.addBookMutation({
      variables: { 
        name: this.state.name,  
        genre: this.state.genre, 
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render() {
    console.log(this.props); // logs the data object (can see data.loading property)
    return (
      // on form submit, bind this component's current state to submitForm()
      <form id="add-book" onSubmit={this.submitForm.bind(this) } >
        <div className="field">
          <label>Book Name:</label>
          <input type="text" 
            // onchange param takes new input value & set the name state to value of input
            onChange={ (inputVal) => this.setState({name: inputVal.target.value}) } />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text"
            onChange={ (inputVal) => this.setState({genre: inputVal.target.value}) } />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={ (inputVal) => this.setState({ authorId: inputVal.target.value})} >
            <option> Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
        
      </form>
    );
  }
}

// compose binds multiple queries to one component
export default compose( 
  graphql(getAuthorsQuery,{name: "getAuthorsQuery"}), // nb: string can be anything 
  graphql(addBookMutation,{name: "addBookMutation"})  // the string shows up as the name of the return data value
)(AddBook);