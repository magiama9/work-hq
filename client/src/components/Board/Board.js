import React, { useState, useCallback, useEffect } from 'react';
import uuid from 'react-uuid';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'; // Doesn't work with touch
import update from 'immutability-helper';
import classes from './BoardStyles';
import BoardColumn from './BoardColumn';
import BoardItem from './BoardItem';
import About from '../About';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import jobFetch from '../../utils/jobFetch';
import jobPost from '../../utils/jobPost';
import resourcePost from '../../utils/resourcePost';
import 'firebase/auth';
import TopBar from '../TopBar';
import SideBar from '../SideBar';

// The different columns
const channels = [
  'interested',
  'applied',
  'responded',
  'interviewing',
  'offer'
];

// What we label the columns.
// Key : Label
// Key is what we store in state
// Label is what's displayed
const labelsMap = {
  interested: 'Interested',
  applied: 'Applied',
  responded: 'Responded',
  interviewing: 'Interviewing',
  offer: 'Offer'
};

const Board = (props) => {
  // const [state, setState] = useState({ newApplications: [], tasks: []});
  const [tasks, setTaskStatus] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [coverLetters, setCoverLetters] = useState([]);
  const [imageSource, setImageSource] = useState(props.photoURL); // If we get an image source from login, it uses that

  // Fetching jobs from the dataBase
  const getAllJobs = (userID) => {
    jobFetch.fetchAll(userID).then((res) => {
      setTaskStatus(res.data);
      let resources = [];
      res.data.forEach((job) => {
        // Checking if the coverLetter field was completed and it's not already in our coverLetter links
        if (job.coverLetter !== '' && !coverLetters.includes(job.coverLetter)) {
          let newResource = {
            resource: job.coverLetter,
            status: 'coverLetter',
            resourceID: uuid(),
            jobID: job.jobID,
            userID: props.userID
          };
          resources.push(newResource);
          coverLetters.push(job.coverLetter);
        }

        // Checking if the resume field was completed and it's not already in our resume links
        if (job.resume !== '' && !resumes.includes(job.resume)) {
          let newResource = {
            resource: job.resume,
            status: 'resume',
            resourceID: uuid(),
            jobID: job.jobID,
            userID: props.userID
          };
          resources.push(newResource);
          resumes.push(job.resume);
        }
      });

      // Adds the unique resources to the database
      resources.forEach((resource) => {
        resourcePost.addResource(resource);
      });

      // Reset the resource array to empty
      resources = [];
    });
  };

  // This code adds new applications to the board from data from forms
  useEffect(() => {
    if (imageSource === null) {
      setImageSource(
        'https://s3.amazonaws.com/course_report_production/misc_imgs/default_user.png'
      ); // Sets the image to a placeholder if we don't get it from login
    }

    getAllJobs(props.userID); // Fetches jobs on updates

    var newState = tasks;
    for (var i = 0; i < props.state.newApplications.length; i++) {
      // Adding status and id to new applications
      props.state.newApplications[i].status = 'interested';
      props.state.newApplications[i].userID = props.userID;
      props.state.newApplications[i].jobID = uuid();
      // pushing new applications
      newState.push(props.state.newApplications[i]);
      props.state.newApplications = [];
      jobPost.addJob(newState[newState.length - 1]);
      getAllJobs(props.userID);
    }
    setTaskStatus(newState);
    changeTaskStatus(); // Callback Function
  }, [props]);

  //updating job in db whenever task is changed
  const changeTaskStatus = useCallback(
    (id, status) => {
      console.log(tasks);

      // Match the task to the ID
      let task = tasks.find((task) => task.jobID === id);

      if (task && task.status !== status) {
        const taskIndex = tasks.indexOf(task);

        // Set the working task
        task = { ...task, status };
        jobPost.updateJob(task.jobID, task);

        // Update the tasks
        // let newTasks = update(tasks, {
        //   [taskIndex]: { $set: task }
        // });

        let newTasks = tasks.concat(task);

        newTasks.splice(taskIndex, 1);
        console.log(newTasks);
        // Update state
        setTaskStatus(newTasks);
      }
    },
    [tasks]
  );

  // Editing Tasks
  const editTask = useCallback(
    (id, title, company, href, description, salary, location) => {
      // Match the task to the ID
      let task = tasks.find((task) => task.jobID === id);
      const taskIndex = tasks.indexOf(task);
      // Set the working task
      task = { ...task, title, company, href, description, salary, location };
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

  const channelColors = {
    interested: ['#3e5861', '#0b252e'],
    applied: ['#f1995f', '#be662c'],
    responded: ['#639fa7', '#306c74'],
    interviewing: ['#f5b860', '#c2852d'],
    offer: ['#944949', '#611616']
  };
  return (
    <>
      {/* Renders Top Bar with the correct form for the current page */}
      <TopBar
        displayName={props.displayName}
        photoURL={props.photoURL}
        state={props.state}
        setState={props.setState}
        page='dashboard'
      ></TopBar>
      <Row noGutters={true}>
        {/* Renders sidebar with the active page highlighted */}
        <SideBar page='dashboard'></SideBar>
        <Col md={10}>
          {/* This handles the click events */}
          {/* I need to figure out how to make it work with touch events */}
          <DndProvider backend={HTML5Backend}>
            <section style={classes.board}>
              {/* Maps over the different channels and creates a column for each */}
              {channels.map((channel) => (
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
                          .filter((item) => item.status === channel)
                          .map((item, index) => (
                            <BoardItem
                              key={item.jobID}
                              id={item.jobID}
                              title={item.title}
                              description={item.description}
                              company={item.company}
                              salary={item.salary}
                              href={item.href}
                              resume={item.resume}
                              location={item.location}
                              coverLetter={item.coverLetter}
                              contactEmail={item.contactEmail}
                              changeTaskStatus={changeTaskStatus}
                              editTask={editTask}
                            >
                              <div
                                style={Object.assign(
                                  {
                                    backgroundColor:
                                      channelColors[channel][
                                        index % channelColors[channel].length
                                      ]
                                  },
                                  classes.item
                                )}
                              >
                                {item.title} - {item.company}
                              </div>
                            </BoardItem>
                          ))}
                      </div>
                    </div>
                  </BoardColumn>
                </Col>
              ))}
              <Button
                style={{
                  fontSize: '2rem',
                  height: '5rem',
                  backgroundColor: 'rgb(000,000,000,0.0)',
                  border: 'none',
                  color: 'black',
                  marginTop: '-0.20em'
                }}
              >
                <About page='dashboard'></About>
              </Button>
            </section>
          </DndProvider>
        </Col>
      </Row>
    </>
  );
};

export default Board;
