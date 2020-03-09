import React from "react";
import Login from "../components/Login";

function Landing() {
  return (

    // You guessed it...It renders the login component
    // This page is rendered whenever an unauthenticated user tries to access a "protected" route
    <Login/>
  );
}

export default Landing;
