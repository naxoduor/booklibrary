import React, { useEffect, useState } from "react";
import { useQuery} from "@apollo/client";
import { LOAD_BOOKS } from "../GraphQL/Queries";
import Book from "./Book";
import "./getbooks.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import GenericButton from "./GenericButton";




function GetBooks() {
  const { error, loading, data } = useQuery(LOAD_BOOKS);
  const [booksList, setBooksList] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [add, setAdd]  = useState(true)

  const handleSelectedBook = (book) => {
    setSelectedBooks([...selectedBooks, book]);
  };

  const viewBooksToRead = () => {

    setBooks(selectedBooks);
    setAdd(false)
  };

  const viewBooksList = () => {
    setBooks(booksList);
    setAdd(true)
  };

  const removeBookToRead = (bookToRemove) => {
    const updatedBooksList = selectedBooks.filter(
      (book) => book.title !== bookToRemove.title
    );
    setBooks(updatedBooksList);
    setSelectedBooks(updatedBooksList)
  };

  const handleTitleSearch = (event, book) => {
    if(book!=null) {
      const filteredItems = books.filter((bookItem) =>
        bookItem.title.toLowerCase().includes(book.title.toLowerCase())
        );
        setBooks(filteredItems)
    }
  };

  useEffect(() => {
    console.log(data);

    if (data) {
      setBooksList(data.books);
      setBooks(data.books);
    }
  }, [data]);

  return (
    <div class="container">
      <div></div>
      <div class="viewButtons">
      <GenericButton handleButtonClick={viewBooksList} book={null} message="View Books List" bgcolor="#335C6E" color="#FFFF"/>
      <GenericButton handleButtonClick={viewBooksToRead} book={null} message="View Readig List" bgcolor="#335C6E" color="#FFFF"/>
      </div>
      <div class="selectform">
        <div class="form">
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 500 }}
            options={books}
            autoHighlight
            getOptionLabel={(option) => option.title}
            onChange={(event, value) => handleTitleSearch(event,value)} // prints the selected value
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`/${option.coverPhotoURL}`}
                  src={`/${option.coverPhotoURL}`}
                  alt=""
                />
                {option.title}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                onClick={() => handleTitleSearch}
                {...params}
                label="Choose a Book Title"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          
        </div>
      </div>

      <div class="booklisting">
        {books.map((book) => {
          return (
            <div>
              { book &&
                <Book
                  book={book}
                  add={add}
                  handleSelectedBook={handleSelectedBook}
                  removeBookToRead={removeBookToRead}
                />}
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default GetBooks;
