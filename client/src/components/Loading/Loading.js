import React from "react";


const classes = {
  message: {
    fontFamily: "'Fredoka One', sans-serif",
    fontSize: "3em",
    color: "white",
    width: "100vw",
    margin: "2em auto auto auto"
  }
}

const Loading = () => {
  return (
    <div style={classes.message}>Loading...</div>
  )
}

export default Loading;