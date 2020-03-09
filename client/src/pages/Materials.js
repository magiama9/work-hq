import React, { useState, useEffect } from "react";
import classes from "./MaterialsStyles";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";
import getMats from "../utils/getMats";
import firebase from "firebase/app";
import "firebase/auth";
// import getMat from "../utils/materialsFetch";
// import postMat from "../utils/materialsPost";

const Materials = props => {
  const [state, setState] = useState({
    resLinks: [],
    covLinks: [],
    otherLinks: []
  });
  const [resLinks, setResLinks] = useState([]);

  //load materials
  const loadMats = userID => {
    getMats.fetchAll(userID).then(res => {
      console.log(res);
      setResLinks(res);
    });
  };

  //on component mount, load materials
  useEffect(() => {
    //TODO returning undefined
    console.log(props.userID);
    loadMats(props.userID);
  }, []);

  const addLink = event => {
    event.preventDefault();
    const { name, value } = event.target;
    //TODO add input into db associated with user id, render list
    //get input with name match

    // switch (name) {
    //   case "resume":
    //     setResLinks(...resLinks, value);
    //     break;
    //   case "cover":
    //     setCovLinks(...covLinks, value);
    //     break;
    //   default:
    //     setOthLinks(...othLinks, value);
    //     break;
    // }
    // console.log(resLinks, covLinks, othLinks);

    // postMat.addRes({
    //   type: links.name,
    //   link: links.value
    // })
    //   .then(res => loadMats())
    //   .catch(err => console.log(err));
  };

  return (
    <>
      <Row>
        <Col md={1} style={classes.headerBtn}>
          <NavDropdown title="User" id="nav-dropdown" style={classes.dropdown}>
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
        <Col md={11} style={classes.header}>
          <h1>Materials</h1>
        </Col>
      </Row>
      <Row style={classes.matBoard} noGutters={true}>
        <Col md={2} style={classes.nav}>
          <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link href="/dashboard">APPLICATIONS</Nav.Link>
            <Nav.Link href="/materials" style={classes.activeLink}>
              MATERIALS
            </Nav.Link>
            <Nav.Link href="/todos">TODO</Nav.Link>
          </Nav>
        </Col>
        <Col md={3} style={classes.linksCol}>
          <h2 style={classes.resumes}>Resumes</h2>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="https://"
              aria-label="resumeLink"
              aria-describedby="basic-addon2"
              // onChange={handleTyping}
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                name="resume"
                onClick={addLink}
              >
                Add Link
              </Button>
            </InputGroup.Append>
          </InputGroup>
          {/* display links */}
          <div>
            {resLinks.map(link => (
              <p>{link}</p>
            ))}
          </div>
        </Col>
        <Col md={3} style={classes.linksCol}>
          <h2 style={classes.covers}>Cover Letters</h2>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="https://"
              aria-label="coverLink"
              aria-describedby="basic-addon2"
              // onChange={handleTyping}
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                name="cover"
                onClick={addLink}
              >
                Add Link
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
        <Col md={3} style={classes.linksCol}>
          <h2 style={classes.other}>Other</h2>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="https://"
              aria-label="otherLink"
              aria-describedby="basic-addon2"
              // onChange={handleTyping
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                name="other"
                onClick={addLink}
              >
                Add Link
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="https://"
              aria-label="otherLink"
              aria-describedby="basic-addon2"
              // onChange={handleTyping
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                name="other"
                onClick={addLink}
              >
                Add Link
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="https://"
              aria-label="otherLink"
              aria-describedby="basic-addon2"
              // onChange={handleTyping
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                name="other"
                onClick={addLink}
              >
                Add Link
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};

export default Materials;
