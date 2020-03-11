import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import classes from "./SideBarStyles";

const SideBar = props => {
  return (
    <Col md={2}>
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link
          href="/dashboard"
          style={props.page === "dashboard" ? classes.activeLink : classes.link}
        >
          APPLICATIONS
        </Nav.Link>
        <Nav.Link
          href="/materials"
          style={props.page === "materials" ? classes.activeLink : classes.link}
        >
          MATERIALS
        </Nav.Link>
        <Nav.Link
          href="/todos"
          style={props.page === "todos" ? classes.activeLink : classes.link}
        >
          TASKS
        </Nav.Link>
      </Nav>
    </Col>
  );
};

export default SideBar;
