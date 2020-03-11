import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingPage from "./pages/Loading";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Materials from "./pages/Materials";
import Todos from "./pages/Todos";
import SaaSPage from "./pages/SaaSPage";
import ErrorPage from "./pages/ErrorPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
          {/* Displays the user's correct pages if they are authenticated */}
          {/* TODO: Pass the user to the materials page and render it properly */}
          <IfFirebaseAuthed>
            {user => {
              return (
                <>
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={props => (
                        <Dashboard
                          {...props}
                          userID={user.user.uid}
                          photoURL={user.user.photoURL}
                        />
                      )}
                    />
                    <Route exact path="/login" component={Landing} />
                    <Route
                      exact
                      path="/dashboard"
                      render={props => (
                        <Dashboard
                          {...props}
                          userID={user.user.uid}
                          photoURL={user.user.photoURL}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/todos"
                      render={props => (
                        <Todos
                          {...props}
                          userID={user.user.uid}
                          photoURL={user.user.photoURL}
                        />
                      )}
                    />

                    <Route
                      exact
                      path="/materials"
                      render={props => (
                        <Materials
                          {...props}
                          userID={user.user.uid}
                          photoURL={user.user.photoURL}
                        />
                      )}
                    />
                    <Route component={ErrorPage}></Route>
                  </Switch>
                </>
              );
            }}
          </IfFirebaseAuthed>

          {/* If the user isn't authenticated, it displays the landing page */}
          <IfFirebaseUnAuthed>
            {/* CAN WE JUST REPLACE THIS WITH ONE CATCHALL ROUTE? */}
            <Switch>
              <Route exact path="/" component={SaaSPage} />
              <Route exact path="/login" component={Landing} />
              <Route exact path="/dashboard" component={LoadingPage} />
              <Route exact path="/materials" component={LoadingPage} />
              <Route exact path="/todos" component={LoadingPage} />
              <Route component={ErrorPage}></Route>
            </Switch>
          </IfFirebaseUnAuthed>
        </Router>
      </FirebaseAuthProvider>
    </>
  );
}

export default App;
