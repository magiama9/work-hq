import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";
import firebase from "firebase/app";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import "firebase/auth";
// import getMat from "../utils/materialsFetch";
// import postMat from "../utils/materialsPost";

const Materials = props => {
  const [resLinks, setResLinks] = useState([]);
  const [covLinks, setCovLinks] = useState([]);
  const [othLinks, setOthLinks] = useState([]);

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
  useEffect(() => {
    loadMats();
  }, [])

  const loadMats = () => {
    // getMat.getLinks().then(res => {
    //   console.log(res);
    // })
  }

  // const handleTyping = event => {
  //   const { name, value } = event.target;
  //   // switch(name) {
  //   //   case "resume":
  //   //     setResLinks(...resLinks, value);
  //   //     break;
  //   //   case "cover":
  //   //     setCovLinks(...covLinks, value);
  //   //     break;
  //   //   default:
  //   //     setOthLinks(...othLinks, value);
  //   //     break;
  //   //TODO clear input field
  // }

  const addLink = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    //TODO add input into db associated with user id, render list
    //get input with name match
    switch(name) {
      case "resume":
        setResLinks(...resLinks, value);
        break;
      case "cover":
        setCovLinks(...covLinks, value);
        break;
      default:
        setOthLinks(...othLinks, value);
        break;
    }
    console.log(resLinks, covLinks, othLinks);
    // postMat.addRes({
    //   type: links.name,
    //   link: links.value
    // })
    //   .then(res => loadMats())
    //   .catch(err => console.log(err));

  }

  return (
    <>
      <Row>
        <Col style={classes.header}>
          <h1>Materials</h1>
          <NavDropdown title="User" id="nav-dropdown">
            <NavDropdown.Item eventKey="4.1">
              <Button
                onClick={() => {
                  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                  firebase.auth().signInWithPopup(googleAuthProvider);
                }}
              >
                Sign In with Google
              </Button>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">
              <Button
                data-testid="signin-anon"
                onClick={() => {
                  firebase.auth().signInAnonymously();
                }}
              >
                Sign In Anonymously
              </Button>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">
              <Button
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                Sign Out
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </Col>
      </Row>
      <Row noGutters={true}>
        <Col md={2}>
          <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link href="/dashboard">Apps</Nav.Link>
            <Nav.Link href="/materials">Materials</Nav.Link>
          </Nav>
        </Col>
        <Col md={3}>
          <h2 style={classes.resumes}>Resumes</h2>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="https://"
              aria-label="resumeLink"
              aria-describedby="basic-addon2"
              ref="link"
              // onChange={handleTyping}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" name="resume" onClick={addLink}>Add Link</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
        <Col md={3}>
          <h2 style={classes.covers}>Cover Letters</h2>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="https://"
              aria-label="coverLink"
              aria-describedby="basic-addon2"
              // onChange={handleTyping}
              ref="link"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" name="cover" onClick={addLink}>Add Link</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
        <Col md={3} style={classes.linksCol}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="https://"
            aria-label="otherLink"
            aria-describedby="basic-addon2"
            // onChange={handleTyping}
            ref="link"
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" name="other" onClick={addLink}>Add Link</Button>
          </InputGroup.Append>
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="https://"
            aria-label="otherLink"
            aria-describedby="basic-addon2"
            // onChange={handleTyping}
            ref="link"
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" name="other" onClick={addLink}>Add Link</Button>
          </InputGroup.Append>
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="https://"
            aria-label="otherLink"
            aria-describedby="basic-addon2"
            // onChange={handleTyping}
            ref="link"
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" name="other" onClick={addLink}>Add Link</Button>
          </InputGroup.Append>
        </InputGroup>
          
        </Col>
      </Row>
    </>
  )
}


export default Materials;