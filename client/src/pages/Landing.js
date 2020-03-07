import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import firebase from "firebase/app";
import Button from "react-bootstrap/Button";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import "firebase/auth";

const classes = {
  header: {
    background: "linear-gradient(to bottom right, #0D92FF, #18C6B3)",
    color: "white",
    fontFamily: "'Nunito', sans-serif",
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "10px"
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
  column: {
    // minWidth: 180,
    // width: "14vw",
    height: "80vh",
    margin: "0 auto",
    backgroundColor: "#F5F6FA"
  }
};

function Landing() {
  return (
    <div>
      <Row>
        <Col style={classes.header}>
          <h1>Landing</h1>
        </Col>
      </Row>
      <Row noGutters={true}>
        <Col md={2}>
          <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/materials">Materials</Nav.Link>
          </Nav>
          <div>
            <Button
              onClick={() => {
                const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(googleAuthProvider);
                // .then(() => {
                //   window.location.replace("http://localhost:3000/dashboard");
                // });
              }}
            >
              Sign In with Google
            </Button>
            <Button
              data-testid="signin-anon"
              onClick={() => {
                firebase.auth().signInAnonymously();
              }}
            >
              Sign In Anonymously
            </Button>
            <Button
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              Sign Out
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Landing;
