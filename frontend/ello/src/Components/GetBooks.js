import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_BOOKS } from "../GraphQL/Queries";
import Book from "./Book";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Button, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./getbooks.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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
    const updatedBooksList = books.filter(
      (book) => book.title !== bookToRemove.title
    );
    setBooks(updatedBooksList);
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

  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div>
      <div></div>
      <div class="viewButtons">
        <Button
          onClick={() => viewBooksList()}
          className="addButton"
          style={{
            backgroundColor: "rgb(211, 211, 211)",
            borderRadius: "5px",
          }}
        >
          <Typography>View Books List</Typography>
        </Button>
        <Button
          onClick={() => viewBooksToRead()}
          className="addButton"
          style={{
            backgroundColor: "rgb(211, 211, 211)",
            borderRadius: "5px",
          }}
        >
          <Typography>View Books To Read</Typography>
        </Button>
      </div>
      <div class="selectform">
        <div class="form">
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 500 }}
            // options={countries}
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
                label="Choose a country"
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
