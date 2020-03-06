import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

function Materials() {
  const classes = {
    header: {
      background: "linear-gradient(to bottom right, #0D92FF, #18C6B3)",
      color: "white",
      fontFamily: "'Nunito', sans-serif",
      textAlign: "center",
      paddingTop: "10px",
      paddingBottom: "10px"
    },
    resumes: {
      height: "50px",
      margin: "10px auto 10px auto",
      padding: "40px auto 10px auto",
      borderRadius: "5px",
      backgroundColor: "#F69346",
      color: "white",
      fontFamily: "'Nunito', sans-serif",
      textAlign: "center",
    },
    covers: {
      height: "50px",
      margin: "10px auto 10px auto",
      padding: "40px auto 10px auto",
      borderRadius: "5px",
      backgroundColor: "#FFBF13",
      color: "white",
      fontFamily: "'Nunito', sans-serif",
      textAlign: "center",
    }
  }

  return (
    <>
      <Row>
        <Col style={classes.header}>
          <h1>Materials</h1>
        </Col>
      </Row>
      <Row noGutters={true}>
        <Col md={2}>
          <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link href="/">Apps</Nav.Link>
            <Nav.Link href="/materials">Materials</Nav.Link>
          </Nav>
        </Col>
        <Col md={3}>
          <h2 style={classes.resumes}>Resumes</h2>
          <Button>Add Link</Button>
        </Col>
        <Col md={3} style={classes.covers}>
          <h2>Cover Letters</h2>
          <Button>Add Link</Button>
        </Col>
      </Row>
    </>
  )
}


export default Materials;