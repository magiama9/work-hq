import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Materials from "./pages/Materials";

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
