import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Materials from "./pages/Materials";
import Todos from "./pages/Todos";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/app";
import {
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
  FirebaseAuthProvider
} from "@react-firebase/auth";
import "firebase/auth";
import config from "./firebase-config";

function App() {
  return (
    <>
      <FirebaseAuthProvider {...config} firebase={firebase}>
        <Router>
          <Route exact path="/" component={Landing} />

          {/* Displays the user's correct pages if they are authenticated */}
          {/* TODO: Pass the user to the materials page and render it properly */}
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
                    <Route
                      exact
                      path="/todos"
                      render={props => (
                        <Todos {...props} userID={user.user.uid} />
                      )}
                    />

                    <Route exact path="/materials" render={props => (
                      <Materials {...props} userID={user.user.uid} />
                    )}/>
                  </div>
                </div>
              );
            }}
          </IfFirebaseAuthed>

          {/* If the user isn't authenticated, it displays the landing page */}
          <IfFirebaseUnAuthed>
            <Route exact path="/dashboard" component={Landing} />
            <Route exact path="/materials" component={Landing} />
              <Route exact path="/todos" component={Landing} />
          </IfFirebaseUnAuthed>
        </Router>
      </FirebaseAuthProvider>
    </>
  );
}

export default App;
