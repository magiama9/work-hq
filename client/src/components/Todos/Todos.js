import React, { useState, useCallback, useEffect } from "react";
import uuid from "react-uuid";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend"; // Doesn't work with touch
import classes from "./TodosStyles";
import update from "immutability-helper";
import About from "../About";
import TodosColumn from "./TodosColumn";
import TodosItem from "./TodosItem";
import TodoForm from "../TodoForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import todoFetch from "../../utils/todoFetch";
import todoPost from "../../utils/todoPost";
import firebase from "firebase/app";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import "firebase/auth";

// The different columns
const channels = ["todo", "inprogress", "completed"];

// What we label the columns.
// Key : Label
// Key is what we store in state
// Label is what's displayed
const labelsMap = {
  todo: "Your Tasks",
  inprogress: "In Progress",
  completed: "Completed Tasks"
};

const Todos = props => {
  const [tasks, setTaskStatus] = useState([]);
  const [imageSource, setImageSource] = useState(props.photoURL); // If we get an image source from login, it uses that
  const getAllTodos = userID => {
    todoFetch.fetchAll(userID).then(res => {
      setTaskStatus(res.data);
    });
  };
  // This code adds new items to the Todos from data from forms
  useEffect(() => {
    if (imageSource === null) {
      setImageSource(
        "https://s3.amazonaws.com/course_report_production/misc_imgs/default_user.png"
      ); // Sets the image to a placeholder if we don't get it from login
    }
    getAllTodos(props.userID);

    var newState = tasks;
    for (var i = 0; i < props.state.newApplications.length; i++) {
      // Adding status and id to new applications
      props.state.newApplications[i].status = "todo";
      props.state.newApplications[i].userID = props.userID;
      props.state.newApplications[i].todoID = uuid();
      // pushing new applications
      newState.push(props.state.newApplications[i]);
      props.state.newApplications = [];
      todoPost.addTodo(newState[newState.length - 1]);
      getAllTodos(props.userID);
    }
    setTaskStatus(newState);
    changeTaskStatus();
  }, [props]);

  //updating job in db whenever task is changed
  const changeTaskStatus = useCallback(
    (id, status) => {
      // Match the task to the ID
      let task = tasks.find(task => task.todoID === id);
      const taskIndex = tasks.indexOf(task);

      // Set the working task
      task = { ...task, status };
      todoPost.updateTodo(task.todoID, task);
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
      let task = tasks.find(task => task.todoID === id);
      const taskIndex = tasks.indexOf(task);
      // Set the working task
      task = { ...task, description };
      todoPost.updateTodo(task.todoID, task);
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
        <Col md={2} style={classes.headerBtn}>
          <TodoForm state={props.state} setState={props.setState} />
        </Col>
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
            <Nav.Link href="/materials" style={classes.link}>
              MATERIALS
            </Nav.Link>
            <Nav.Link href="/todos" style={classes.activeLink}>
              TASKS
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={10}>
          {/* This handles the click events */}
          {/* I need to figure out how to make it work with touch events */}
          <DndProvider backend={HTML5Backend}>
            <section style={classes.todos}>
              {/* Maps over the different channels and creates a column for each */}
              {channels.map(channel => (
                <Col key={channel} md={3}>
                  <TodosColumn
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
                            <TodosItem
                              key={item.todoID}
                              id={item.todoID}
                              todo={item.todo}
                              description={item.description}
                              changeTaskStatus={changeTaskStatus} // Allows proper event handling with the form
                              editTask={editTask}
                            >
                              <div style={classes.item}>{item.todo}</div>
                            </TodosItem>
                          ))}
                      </div>
                    </div>
                  </TodosColumn>
                </Col>
              ))}
              <span style={{ fontSize: "3rem" }}>
                <About page="todos"></About>
              </span>
            </section>
          </DndProvider>
        </Col>
      </Row>
    </>
  );
};

export default Todos;
