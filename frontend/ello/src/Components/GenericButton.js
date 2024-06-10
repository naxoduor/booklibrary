import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function GenericButton(props){
  const {message, bgcolor, color, book} = props
    return (
    <Button onClick={() => props.handleButtonClick(book)}
    className="addButton"
    style={{
      backgroundColor: bgcolor,
      color: color,
      borderRadius: "5px",
    }}
  >
    <Typography>{message}</Typography>
  </Button>
    )
}

export default GenericButton