import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
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

function Login() {
  return (
    <>
      {/* Login authentication */}
      {/* <FirebaseAuthProvider {...config} firebase={firebase}>

        <div>
          <Router>
            <Route exact path="/" component={Landing} />
            <IfFirebaseAuthed>
              {user => {
                return (
                  <div>
                    {" "}
                    <div>
                      <Route
                        exact
                        path="/dashboard"
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
        </div>
      </FirebaseAuthProvider> */}
    </>
  );
}

export default Login;