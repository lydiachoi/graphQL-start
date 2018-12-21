import { gql } from "apollo-boost"; 

// refactored all queries out of specific components and add them here, 
// importing specific queries as necessary

// query goes inside `<here>` directly after gql for parsing
const getAuthorsQuery = gql`  
  {
    authors {
      name
      id
    }
  }
`

const getBooksQuery = gql`  
  {
    books { 
      name
      id
    }
  }
`

// $variableName = the query variable; String! = of type String (not null)
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id    
    }
  } 
`

// query takes in the ID and the query searches for a book w/ that ID and returns its details
const getBookDetailsQuery = gql`
  query($id: ID) {
    book (id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    } 
  }
`

export { addBookMutation, getAuthorsQuery, getBooksQuery, getBookDetailsQuery }; 