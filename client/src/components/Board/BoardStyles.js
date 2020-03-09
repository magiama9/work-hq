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
    background: "linear-gradient(to bottom right, #0D92FF, #18C6B3)",
    color: "white",
    fontFamily: "'Nunito', sans-serif",
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingRight: "180px"
  },
  headerBtn: {
    background: "linear-gradient(to bottom, #0D92FF, #46a9dc)",
    color: "white",
    fontFamily: "'Nunito', sans-serif",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: "5px",
    width: "75px",
    marginTop: "17px"
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
    backgroundColor: "#18C6B3",
    color: "white"
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
  interested: {
    backgroundColor: "#F69346",
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    color: "white",
    margin: "10px 5px 0 5px",
    borderRadius: "5px",
    fontWeight: 600
  },
  applied: {
    backgroundColor: "#18C6B3",
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    color: "white",
    margin: "10px 5px 0 5px",
    borderRadius: "5px",
    fontWeight: 600
  },
  responded: {
    backgroundColor: "#FFBF13",
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    color: "white",
    margin: "10px 5px 0 5px",
    borderRadius: "5px",
    fontWeight: 600
  },
  interviewing: {
    backgroundColor: "#0D92FF",
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    color: "white",
    margin: "10px 5px 0 5px",
    borderRadius: "5px",
    fontWeight: 600
  },
  offer: {
    backgroundColor: "#FF4A75",
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
    borderRadius: "5px"
  }
};

export default classes;