import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function Materials() {
  const [resLinks, setResLinks] = useState([]);
  const [covLinks, setCovLinks] = useState([]);
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
      width: "100%",
      margin: "10px 10px 10px auto",
      padding: "10px auto 10px auto",
      borderRadius: "5px",
      backgroundColor: "#F69346",
      color: "white",
      fontFamily: "'Nunito', sans-serif",
      textAlign: "center",
    },
    covers: {
      width: "100%",
      margin: "10px auto 10px 10px",
      padding: "10px auto 10px auto",
      borderRadius: "5px",
      backgroundColor: "#FFBF13",
      color: "white",
      fontFamily: "'Nunito', sans-serif",
      textAlign: "center",
    },
    input: {
      margin: "10px 10px 30px 10px"
    },
    linksCol: {
      marginLeft: "20px"
    }
  }

  const addRes = (event) => {
    event.preventDefault();
    //TODO add input into db associated with user id, render list
    const { name, value } = event.target;
    setResLinks({...resLinks, [name]: value});
  }

  const addCov = (event) => {
    event.preventDefault();
    //TODO add input into db associated with user id, render list
    const { name, value } = event.target;
    setCovLinks({...covLinks, [name]: value});
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
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
            <Button onClick="addRes">Add Link</Button>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <h2 style={classes.covers}>Cover Letters</h2>
          <InputGroup className="mb-3" style={classes.input}>
            <InputGroup.Prepend>
            <Button onClick="addCov">Add Link</Button>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </Col>
        <Col md={3} style={classes.linksCol}>
          <InputGroup className="mb-3" style={classes.input}>
              <InputGroup.Prepend>
              <Button onClick="addCov">Website</Button>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3" style={classes.input}>
            <InputGroup.Prepend>
            <Button onClick="addCov">LinkedIn</Button>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          <InputGroup className="mb-3" style={classes.input}>
            <InputGroup.Prepend>
            <Button onClick="addCov">Github</Button>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </Col>
      </Row>
    </>
  )
}


export default Materials;