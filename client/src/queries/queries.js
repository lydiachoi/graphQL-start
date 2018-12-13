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

export {getAuthorsQuery, getBooksQuery}; 