import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import classes from "./SideBarStyles";

const SideBar = props => {
  let dashboard = classes.link;
  let materials = classes.link;
  let todos = classes.link;

  const handleActive = page => {
    switch (page) {
      case "dashboard":
        dashboard = classes.activeLink;
        break;
      case "materials":
        materials = classes.activeLink;
        break;
      case "todos":
        todos = classes.activeLink;
        break;
    }
  };

  useEffect(() => {
    handleActive(props.page);
    console.log(todos);
  }, [props]);
  return (
    <Col md={2}>
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link href="/dashboard" style={dashboard}>
          APPLICATIONS
        </Nav.Link>
        <Nav.Link href="/materials" style={materials}>
          MATERIALS
        </Nav.Link>
        <Nav.Link href="/todos" style={todos}>
          TASKS
        </Nav.Link>
      </Nav>
    </Col>
  );
};

export default SideBar;
