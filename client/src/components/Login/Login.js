import React from "react";
import classes from "./LoginStyles";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import firebase from "firebase/app";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import "firebase/auth";
import config from "../../firebase-config";


function Login() {
  return (
    <Container fluid={true} style={classes.background}>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <h1 style={classes.h1}>Work HQ</h1>
        </Col>
        <Col md={4}></Col>
      </Row>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          {/* Login authentication */}
          <FirebaseAuthProvider {...config} firebase={firebase}>
            <div className={classes.btnDiv}>
              <button
                block
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
              <button
                block
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
              <button
                block
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
        <Col md={4}></Col>
      </Row>
    </Container>
  );
}

export default Login;
