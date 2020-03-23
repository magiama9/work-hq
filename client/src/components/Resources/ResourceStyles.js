import React from "react";

//set styling for each column as channel.column
// colors
//orange: #F69346
//green: #18C6B3
//yellow: #FFBF13
//blue: #0D92FF
//pink: #FF4A75
// grey: #F5F6FA
const classes = {
  row: {
    paddingLeft: "0px",
    paddingRight: "0px"
  },
  header: {
    background: "linear-gradient(to bottom right, #0e2e3a, #3c8791)",
    color: "white",
    fontFamily: "'Fredoka One', sans-serif",
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingRight: "25vw"
  },
  headerBtn: {
    background: "linear-gradient(to bottom, #0e2e3a, #235560)",
    color: "white",
    fontFamily: "'Nunito', sans-serif",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: "5px",
    width: "75px",
    marginTop: "17px",
    marginLeft: "10px"
  },
  board: {
    display: "flex",
    backgroundColor: "#F5F6FA",
    margin: "0 20px 0 0",
    padding: "10px",
    width: "90vw",
    fontFamily: "'Nunito', sans-serif"
  },
  noPad: {
    paddingLeft: "0 !important",
    paddingRight: "0 !important"
  },
  activeLink: {
    backgroundColor: "#F5F6FA",
    color: "#62cec4",
    fontWeight: "600",
    fontFamily: "'Nunito', sans-serif",
    padding: "20px 0 20px 50px",
    borderRadius: "45px 0px 0px 45px"
  },
  link: {
    fontWeight: "600",
    fontFamily: "'Nunito', sans-serif",
    padding: "20px 0 20px 50px",
    color: "#3c8791"
  },
  column: {
    // minWidth: 180,
    // width: "14vw",
    height: "80vh",
    margin: "0 auto",
    backgroundColor: "#F5F6FA"
  },
  // columnHead: {
  //   textAlign: "center",
  //   padding: 10,
  //   fontSize: "1.2em",
  //   color: "white",
  //   margin: "10px 5px 0 5px",
  //   borderRadius: "5px",
  //   fontWeight: 600
  // },
  resume: {
    backgroundColor: "#3c8791",
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    color: "white",
    margin: "10px 5px 0 5px",
    borderRadius: "5px",
    fontWeight: 600
  },
  coverLetter: {
    backgroundColor: "#791c1b",
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    color: "white",
    margin: "10px 5px 0 5px",
    borderRadius: "5px",
    fontWeight: 600
  },
  other: {
    backgroundColor: "#f3a638",
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    color: "white",
    margin: "10px 5px 0 5px",
    borderRadius: "5px",
    fontWeight: 600
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "white",
    borderRadius: "5px",
    overflow: "hidden",
    wordWrap: "break-word",
    lineHeight: "1em"
  }
};

export default classes;
