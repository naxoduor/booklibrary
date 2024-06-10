import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import GenericButton from "./GenericButton";
import "./book.css"
function Book(props) {

  let button;
  let {book, handleSelectedBook, removeBookToRead}=props
  if (props.add) {
    button=<GenericButton handleButtonClick={handleSelectedBook} book={book} message="Add To Reading List" bgcolor="#5ACCCC" color="#FFFF"/>
  } else {
    button=<GenericButton handleButtonClick={removeBookToRead} book={book} message="Remove From Reading List" bgcolor="#5ACCCC" color="#FFFF" />
  }

  return (
    <div class="card_container">
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`/${props.book.coverPhotoURL}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.book.author}
            </Typography>
          </CardContent>
          {button}
        </CardActionArea>
      </Card>
    </div>
  );
}
//book
export default Book;
