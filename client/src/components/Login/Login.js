import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import firebase from "firebase/app";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import "firebase/auth";
import config from "../../firebase-config";

const classes = {
  row: {
    paddingLeft: "0px",
    paddingRight: "0px"
  },
  background: {
    background: "linear-gradient(to bottom right, #18C6B3, #0D92FF, #18C6B3)",
    height: "100em",
    margin: "0px",
    paddingLeft: "0px",
    paddingRight: "0px"
  },
  btnDiv: {
    marginTop: "100px",
    padding: "40px auto 0px auto"
  },
  btn: {
    width: "100%",
    height: "50px",
    margin: "20px auto 0px auto",
    backgroundColor: "white",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "600",
    border: "3px solid #FFBF13",
    borderRadius: "20px",
    position: "block"
  },
  h1: {
    fontFamily: "'Fredoka One', sans-serif",
    fontSize: "5em",
    color: "white",
    textAlign: "center",
    marginTop: "100px",
    marginBottom: "40px"
  }
};

function Login() {
  return (
    <>
      <Container fluid={true} style={classes.background}>
      <Row style={classes.row}>
        <Col md={4}></Col>
        <Col md={4}>
          <h1 style={classes.h1}>Work HQ</h1>
        </Col>
        <Col md={4}></Col>
      </Row>
      <Row style={classes.row}>
        <Col md={4} style={{ paddingLeft: "0px", paddingRight: "0px" }}></Col>
        <Col md={4} style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          {/* Login authentication */}
          <FirebaseAuthProvider {...config} firebase={firebase}>
            <div className={classes.btnDiv}>
              <button block={true}

                style={classes.btn}
                onClick={() => {
                  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                  firebase
                    .auth()
                    .signInWithPopup(googleAuthProvider)
                    .then(() => {
                      window.location.replace("/dashboard");
                    })
                    .catch(error => console.log(error));
                }}
              >
                Sign In with Google
              </button>

              <button block={true}


                style={classes.btn}
                data-testid="signin-anon"
                onClick={() => {
                  firebase
                    .auth()
                    .signInAnonymously()
                    .then(() => {
                      window.location.replace("/dashboard");
                    })
                    .catch(error => console.log(error));
                }}
              >
                Sign In Anonymously
              </button>

              <button block={true}

                style={classes.btn}
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          </FirebaseAuthProvider>
        </Col>
        <Col md={4} style={{ paddingLeft: "0px", paddingRight: "0px" }}></Col>
      </Row>
    </Container>
  );
}

export default Login;
