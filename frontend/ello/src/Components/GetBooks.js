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

  const handleSelectedBook = (book) => {
    setSelectedBooks([...selectedBooks, book]);
  };

  const viewBooksToRead = () => {
    setBooks(selectedBooks);
  };

  const viewBooksList = () => {
    setBooks(booksList);
  };

  const removeBookToRead = (bookToRemove) => {
    const updatedBooksList= books.filter((book)=>
    book.title !== bookToRemove.title)
    setBooks(updatedBooksList)
  }

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
          <FormControl sx={{ m: 1, width: 500 }}>
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {books.map((book) => (
                <MenuItem
                  key={book.author}
                  value={book.author}
                  style={getStyles(book.author, personName, theme)}
                >
                  <img
                    src={`/${book.coverPhotoURL}`}
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  {book.author}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div class="booklisting">
        {books.map((book) => {
          return (
            <div>
              <h1>
                <Book book={book} handleSelectedBook={handleSelectedBook} removeBookToRead={removeBookToRead}/>
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GetBooks;
