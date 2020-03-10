import React, { useState, useCallback, useEffect } from "react";
import uuid from "react-uuid";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend"; // Doesn't work with touch
import classes from "./ResourceStyles";
import update from "immutability-helper";
import About from "../About";
import ResourceColumn from "./ResourceColumn";
import ResourceItem from "./ResourceItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import resourceFetch from "../../utils/resourceFetch";
import resourcePost from "../../utils/resourcePost";
import firebase from "firebase/app";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import "firebase/auth";
import TopBar from "../TopBar";

// The different columns
const channels = ["resume", "coverLetter", "other"];

// What we label the columns.
// Key : Label
// Key is what we store in state
// Label is what's displayed
const labelsMap = {
  resume: "Resumes",
  coverLetter: "Cover Letters",
  other: "Other Links"
};

const Resources = props => {
  const [resLinks, setResLinks] = useState([]);
  const [imageSource, setImageSource] = useState(props.photoURL); // If we get an image source from login, it uses that
  const getAllResources = userID => {
    resourceFetch.fetchAll(userID).then(res => {
      console.log(res);
      setResLinks(res.data);
    });
  };
  // This code adds new items to the Resources from data from forms
  useEffect(() => {
    if (imageSource === null) {
      setImageSource(
        "https://s3.amazonaws.com/course_report_production/misc_imgs/default_user.png"
      ); // Sets the image to a placeholder if we don't get it from login
    }
    console.log(props.userID);
    getAllResources(props.userID);

    var newState = [];
    for (var i = 0; i < props.state.newApplications.length; i++) {
      // Adding status and id to new applications
      props.state.newApplications[i].status = "resume";
      props.state.newApplications[i].userID = props.userID;
      props.state.newApplications[i].resourceID = uuid();
      // pushing new applications
      newState.push(props.state.newApplications[i]);
      props.state.newApplications = [];
      resourcePost.addResource(newState[newState.length - 1]);
      getAllResources(props.userID);
    }
    setResLinks(newState);
    changeTaskStatus();
  }, [props]);

  //updating job in db whenever task is changed
  const changeTaskStatus = useCallback(
    (id, status) => {
      // Match the task to the ID
      let resLink = resLinks.find(resLink => resLink.resourceID === id);
      const resIndex = resLinks.indexOf(resLink);

      // Set the working task
      resLink = { ...resLink, status };
      resourcePost.updateResource(resLink.resourceID, resLink);
      // Update the tasks
      let newLinks = update(resLinks, {
        [resIndex]: { $set: resLink }
      });

      // Update state
      setResLinks(newLinks);
    },
    [resLinks]
  );

  // Editing Tasks
  const editLink = useCallback(
    (id, description) => {
      // Match the task to the ID
      let resLink = resLinks.find(task => task.todoID === id);
      const resIndex = resLinks.indexOf(resLink);
      // Set the working task
      resLink = { ...resLink, description };
      resourcePost.updateResource(resLink.resourceID, resLink);
      // Update the tasks
      let newLinks = update(resLinks, {
        [resIndex]: { $set: resLink }
      });
      // Update state
      setResLinks(newLinks);
    },
    [resLinks]
  );

  return (
    <>
      <TopBar
        photoURL={props.photoURL}
        state={props.State}
        setState={props.setState}
        page="materials"
      ></TopBar>
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
            // style={classes.dropdown}
          >
            <NavDropdown.Item eventKey="4.1">
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
        <Col md={2} style={classes.headerBtn}></Col>
        <Col md={9} style={classes.header}>
          <h1>Work HQ</h1>
        </Col>
      </Row>
      <Row noGutters={true}>
        <Col md={2}>
          <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link href="/dashboard" style={classes.link}>
              APPLICATIONS
            </Nav.Link>
            <Nav.Link href="/materials" style={classes.activeLink}>
              MATERIALS
            </Nav.Link>
            <Nav.Link href="/todos" style={classes.link}>
              TASKS
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={10}>
          {/* This handles the click events */}
          {/* I need to figure out how to make it work with touch events */}
          <DndProvider backend={HTML5Backend}>
            <section style={classes.board}>
              {/* Maps over the different channels and creates a column for each */}
              {channels.map(channel => (
                <Col key={channel} md={3}>
                  <ResourceColumn
                    key={channel}
                    status={channel}
                    changeTaskStatus={changeTaskStatus}
                  >
                    <div style={classes.column}>
                      <div style={(classes.columnHead, classes[channel])}>
                        {labelsMap[channel]}
                      </div>
                      <div>
                        {/* Renders the correct tasks onto the column */}
                        {resLinks
                          .filter(item => item.status === channel)
                          .map(item => (
                            <ResourceItem
                              key={item.resourceID}
                              id={item.resourceID}
                              resource={item.resource}
                              description={item.description}
                              jobArray={item.jobArray}
                              changeTaskStatus={changeTaskStatus} // Allows proper event handling with the form
                              editLink={editLink}
                            >
                              <div style={classes.item}>
                                <a href={item.resource} target="_blank">
                                  {item.resource}
                                </a>
                              </div>
                            </ResourceItem>
                          ))}
                      </div>
                    </div>
                  </ResourceColumn>
                </Col>
              ))}
              <span style={{ fontSize: "3rem" }}>
                <About page="materials"></About>
              </span>
            </section>
          </DndProvider>
        </Col>
      </Row>
    </>
  );
};

export default Resources;
