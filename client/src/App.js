import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Materials from "./pages/Materials";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/app";
import {
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import "firebase/auth";
import config from "./firebase-config";

if (process.env.NODE_ENV === "production") {
  console.log("production");
  console.log(process.env.FIREBASE_CONFIG);
} else {
  console.log("not production");
}

function App() {
  return (
    <>
      {/* Login authentication */}
      <FirebaseAuthProvider {...config} firebase={firebase}>
        {/* <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              return (
                <pre style={{ height: 300, overflow: "auto" }}>
                  {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
                </pre>
              );
            }}
          </FirebaseAuthConsumer> */}
        <div>
          <Router>
            <Route exact path="/" component={Landing} />

            <IfFirebaseAuthed>
              {user => {
                return (
                  <div>
                    {" "}
                    {/* <Dashboard userID={user.user.uid} /> */}
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
      </FirebaseAuthProvider>
    </>
  );
}

export default App;
