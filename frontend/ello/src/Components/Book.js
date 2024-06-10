import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
function Book(props) {
  return (
    <div>
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
          <Button onClick={() => props.handleSelectedBook(props.book)}
            className="addButton"
            style={{
              backgroundColor: "rgb(211, 211, 211)",
              borderRadius: "5px",
            }}
          >
            <Typography>Add To List</Typography>
          </Button>
          <Button onClick={() => props.removeBookToRead(props.book)}
            className="addButton"
            style={{
              backgroundColor: "rgb(211, 211, 211)",
              borderRadius: "5px",
            }}
          >
            <Typography>Remove</Typography>
          </Button>
        </CardActionArea>
      </Card>
    </div>
  );
}
//book
export default Book;
