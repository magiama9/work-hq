import React, { useState, useCallback, useEffect } from "react";
import uuid from "react-uuid";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend"; // Doesn't work with touch
import update from "immutability-helper";
import classes from "./BoardStyles";
import BoardColumn from "./BoardColumn";
import BoardItem from "./BoardItem";
import Form from "../Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import jobFetch from "../../utils/jobFetch";
import jobPost from "../../utils/jobPost";
import firebase from "firebase/app";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import "firebase/auth";
// The different columns
const channels = [
  "interested",
  "applied",
  "responded",
  "interviewing",
  "offer"
];

// What we label the columns.
// Key : Label
// Key is what we store in state
// Label is what's displayed
const labelsMap = {
  interested: "Interested",
  applied: "Applied",
  responded: "Responded",
  interviewing: "Interviewing",
  offer: "Offer"
};

const Board = props => {
  // const [state, setState] = useState({ newApplications: [], tasks: []});
  const [tasks, setTaskStatus] = useState([]);
  const getAllJobs = userID => {
    jobFetch.fetchAll(userID).then(res => {
      setTaskStatus(res.data);
    });
  };
  // This code adds new applications to the board from data from forms
  useEffect(() => {
    console.log(props.userID);
    getAllJobs(props.userID);

    var newState = tasks;
    for (var i = 0; i < props.state.newApplications.length; i++) {
      // Adding status and id to new applications
      props.state.newApplications[i].status = "interested";
      props.state.newApplications[i].userID = props.userID;
      console.log(props.userID);
      props.state.newApplications[i].jobID = uuid();
      console.log(props.state.newApplications[i].jobID);
      // pushing new applications
      newState.push(props.state.newApplications[i]);
      props.state.newApplications = [];
      jobPost.addJob(newState[newState.length - 1]);
      getAllJobs(props.userID);
    }
    setTaskStatus(newState);
    changeTaskStatus();
  }, [props]);

  //updating job in db whenever task is changed
  const changeTaskStatus = useCallback(
    (id, status) => {
      // Match the task to the ID
      let task = tasks.find(task => task.jobID === id);
      const taskIndex = tasks.indexOf(task);

      // Set the working task
      task = { ...task, status };
      jobPost.updateJob(task.jobID, task);
      // Update the tasks
      let newTasks = update(tasks, {
        [taskIndex]: { $set: task }
      });

      // Update state
      setTaskStatus(newTasks);
    },
    [tasks]
  );
  
  // Editing Tasks
  const editTask = useCallback(
    (id, description) => {
      // Match the task to the ID
      let task = tasks.find(task => task.jobID === id);
      const taskIndex = tasks.indexOf(task);
      // Set the working task
      task = { ...task, description };
      jobPost.updateJob(task.jobID, task);
      // Update the tasks
      let newTasks = update(tasks, {
        [taskIndex]: { $set: task }
      });
      // Update state
      setTaskStatus(newTasks);
    },
    [tasks]
  );

  return (
    <>
      <Row style={classes.row}>
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
        <Col md={2} style={classes.headerBtn}>
          <Form state={props.state} setState={props.setState}/>
        </Col>
        <Col md={9} style={classes.header}>
          <h1>Applications</h1>
        </Col>
      </Row>
      <Row noGutters={true}>
        <Col md={2} >
          <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link href="/dashboard" style={classes.activeLink}>APPLICATIONS</Nav.Link>
            <Nav.Link href="/materials">MATERIALS</Nav.Link>
            <Nav.Link href="/todos">TODOS</Nav.Link>
          </Nav>
        </Col>
        <Col md={10}>
          {/* This handles the click events */}
          {/* I need to figure out how to make it work with touch events */}
          <DndProvider backend={HTML5Backend}>
            <section style={classes.board}>
              {/* Maps over the different channels and creates a column for each */}
              {channels.map(channel => (
                <Col key={channel} md={2}>
                  <BoardColumn
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
                        {tasks
                          .filter(item => item.status === channel)
                          .map(item => (
                            <BoardItem
                              key={item.jobID}
                              id={item.jobID}
                              title={item.title}
                              description={item.description}
                              company={item.company}
                              salary={item.salary}
                              url={item.href}
                              resume={item.resume}
                              coverLetter={item.coverLetter}
                              contactEmail={item.contactEmail}
                              changeTaskStatus= {changeTaskStatus}
                              editTask = {editTask}
                            >
                              <div style={classes.item}>
                                {item.title} - {item.company}
                              </div>
                            </BoardItem>
                          ))}
                      </div>
                    </div>
                  </BoardColumn>
                </Col>
              ))}
            </section>
          </DndProvider>
        </Col>
      </Row>
    </>
  );
};

export default Board;
