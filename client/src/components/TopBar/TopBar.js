import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import firebase from "firebase/app";
import "firebase/auth";
import classes from "./TopBarStyles";
import TodoForm from "../TodoForm";
import ResourceForm from "../ResourcesForm";
import Form from "../Form";

const TopBar = props => {
  const [imageSource, setImageSource] = useState(props.photoURL); // If we get an image source from login, it uses that
  const [page, setPage] = useState(props.page);
  let userName = props.displayName.split(" ")[0] || "Guest";

  useEffect(() => {
    if (imageSource === null) {
      setImageSource(
        "https://s3.amazonaws.com/course_report_production/misc_imgs/default_user.png"
      ); // Sets the image to a placeholder if we don't get it from login
    }
  }, [props.page]);
  return (
    <>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: #0c2e3a;
      color: white;
    }`}
      </style>
      <Row>
        <Col md={1} style={classes.headerBtn}>
          <NavDropdown
            title={
              <img
                src={imageSource} // photoURL is passed down through props from the authentication
                alt="user profile pic"
                className="rounded-circle"
                width="50px"
              />
            }
            id="nav-dropdown"
          >
            <NavDropdown.Item eventKey="4.1">
              <h3>Hi, {userName}!</h3>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">
              <Button
                variant="flat"
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                Sign Out
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </Col>
        <Col md={2} style={classes.headerBtn}>
          {page === "todos" && (
            <TodoForm state={props.state} setState={props.setState} />
          )}
          {page === "dashboard" && (
            <Form state={props.state} setState={props.setState} />
          )}
          {page === "materials" && (
            <ResourceForm state={props.state} setState={props.setState} />
          )}
        </Col>
        <Col md={9} style={classes.header}>
          <h1>Work HQ</h1>
        </Col>
      </Row>
    </>
  );
};

export default TopBar;
