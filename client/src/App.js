import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./pages/Landing";
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
  if (process.env.FIREBASE_TEST === "a") {
    console.log("worked");
  } else {
    console.log("failed");
  }
} else {
  console.log("not production");
}

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/materials" component={Materials} />
      </Router>
    </>
  );
}

export default App;
