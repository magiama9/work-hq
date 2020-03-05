import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend"; // Doesn't work with touch
import update from "immutability-helper";
import BoardColumn from "./BoardColumn";
import BoardItem from "./BoardItem";

// Dummy job data
const jobList = [
  {
    _id: 1,
    title: "Street View Driver",
    company: "Google",
    status: "interested"
  },
  { _id: 2, title: "Hype Man", company: "Theranos", status: "interested" },
  {
    _id: 3,
    title: "Back End Developer",
    company: "Google",
    status: "interested"
  },
  {
    _id: 4,
    title: "Front End Developer",
    company: "Google",
    status: "applied"
  },
  { _id: 5, title: "Warehouse Slave", company: "Amazon", status: "applied" },
  { _id: 6, title: "Moustache Groomer", company: "Apple", status: "responded" },
  { _id: 7, title: "'Genius'", company: "Apple", status: "interviewing" },
  { _id: 8, title: "Instructor", company: "2U", status: "interviewing" },
  { _id: 9, title: "Urban Beekeeper", company: "Hive", status: "offer" },
  { _id: 10, title: "Alcoholic", company: "Freelance", status: "offer" }
];

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

// Some shitty styling
const classes = {
  board: {
    display: "flex",
    margin: "0 auto",
    width: "90vw",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif'
  },
  column: {
    minWidth: 200,
    width: "18vw",
    height: "80vh",
    margin: "0 auto",
    backgroundColor: "#FCC8B2"
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    backgroundColor: "#C6D8AF"
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "white"
  }
};

const Board = (props) => {
  const [tasks, setTaskStatus] = useState(jobList);

  const changeTaskStatus = useCallback(
    (id, status) => {
      // Match the task to the ID
      let task = tasks.find(task => task._id === id);
      const taskIndex = tasks.indexOf(task);

      // Set the working task
      task = { ...task, status };

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
    <div>
      {/* This handles the click events */}
      {/* I need to figure out how to make it work with touch events */}
      <DndProvider backend={HTML5Backend}>
        <section style={classes.board}>
          {/* Maps over the different channels and creates a column for each */}
          {channels.map(channel => (
            <BoardColumn
              key={channel}
              status={channel}
              changeTaskStatus={changeTaskStatus}
            >
              <div style={classes.column}>
                <div style={classes.columnHead}>{labelsMap[channel]}</div>
                <div>
                  {/* Renders the correct tasks onto the column */}
                  {tasks
                    .filter(item => item.status === channel)
                    .map(item => (
                      <BoardItem key={item._id} id={item._id}>
                        <div style={classes.item}>
                          {item.title} - {item.company}
                        </div>
                      </BoardItem>
                    ))}
                </div>
              </div>
            </BoardColumn>
          ))}
        </section>
      </DndProvider>
    </div>
  );
};

export default Board;
