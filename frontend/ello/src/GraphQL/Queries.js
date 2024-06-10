import {gql} from '@apollo/client'

export const LOAD_BOOKS = gql `
    query {
        books {
            title
            author,
            coverPhotoURL,
            readingLevel
  }
}

`