import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dashboard from "../../pages/Dashboard";
import Materials from "../../pages/Materials";
import firebase from "firebase/app";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCultPP-E1RzSrFFTcWSWK5G20mSKdTfbg",
  authDomain: "work-hq.firebaseapp.com",
  databaseURL: "https://work-hq.firebaseio.com",
  projectId: "work-hq",
  storageBucket: "work-hq.appspot.com",
  messagingSenderId: "30525482181",
  appId: "1:30525482181:web:825dd913c1bfdd371afcac",
  measurementId: "G-CB66800GCV"
};

const classes = {
  background: {
    background: "linear-gradient(to bottom right, #0D92FF, #18C6B3)",
    height: "100em",
    margin: "0"
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
}

function Login() {
  return (
    <>
      <Container fluid={true} style={classes.background}>
      <Row>
        <Col md={4}></Col>
        <Col md={4}><h1 style={classes.h1} >Work HQ</h1></Col>
        <Col md={4}></Col>
      </Row>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          {/* Login authentication */}
          <FirebaseAuthProvider {...config} firebase={firebase}>
            <div className={classes.btnDiv}>
              <button block
                style={classes.btn}
                onClick={() => {
                  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                  firebase.auth().signInWithPopup(googleAuthProvider)
                    .then(() => {
                      window.location.replace("http://localhost:3000/dashboard")
                    })
                    .catch(error => console.log(error));
                }}
              >
                Sign In with Google
              </button>
              <button block
                style={classes.btn}
                data-testid="signin-anon"
                onClick={() => {
                  firebase.auth().signInAnonymously()
                    .then(() => {
                      window.location.replace("http://localhost:3000/dashboard")
                    })
                    .catch(error => console.log(error))
                }}
              >
                Sign In Anonymously
              </button>
              <button block
                style={classes.btn}
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                Sign Out
              </button>
              {/* <FirebaseAuthConsumer>
                {({ isSignedIn, user, providerId }) => {
                  return (
                    <pre style={{ height: 300, overflow: "auto" }}>
                      {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
                    </pre>
                  );
                }}
              </FirebaseAuthConsumer> */}
            </div>
            {/* <div>
                <Router>
                  <IfFirebaseAuthed>
                    {user => {
                      return (
                        <div>
                          {" "}
                          
                          <div>
                            <Route
                              exact
                              path="/"
                              render={props => (
                                <Dashboard {...props} userID={user.user.uid} />
                              )}
                            />
                            <Route exact path="/materials" component={Materials} />
                          </div>
                        </div>
                      );
                    }}
                  </IfFirebaseAuthed>
                </Router>
                <IfFirebaseAuthedAnd
                  filter={({ providerId }) => providerId !== "anonymous"}
                >
                  {({ providerId }) => {
                    return <div>You are authenticated with {providerId}</div>;
                  }}
                </IfFirebaseAuthedAnd>
              </div> */}
          </FirebaseAuthProvider>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
    </>
  );
}

export default Login;