import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const About = props => {
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const todoContent = {
    title: "Tasks",
    content:
      "This is your tasks page. You can add tasks by hitting 'New Task'! As you start and complete tasks, simply drag them across the columns. If you would like to edit or delete a task, simply click on the item."
  };

  const dashboardContent = {
    title: "Applications",
    content:
      "This is your dashboard! Add new jobs to your dashboard by hitting new application. As your job search progresses, simply drag your jobs across the columns. If you would like to edit or delete an application, simply click on the item."
  };

  const materialsContent = {
    title: "Materials",
    content:
      "This is your materials page. Materials are automatically added into the correct column as you add jobs to your dashboard. If you would like, you can drag them to different columns. If you would like to edit or delete the link, click on the card. Click the text to go to directly to your link."
  };

  const handleContent = page => {
    switch (page) {
      case "dashboard":
        setModalContent(dashboardContent);
        break;
      case "materials":
        setModalContent(materialsContent);
        break;
      case "todos":
        setModalContent(todoContent);
        break;
    }
  };

  useEffect(() => {
    handleContent(props.page);
  }, [props.page]);

  return (
    <>
      <FontAwesomeIcon
        icon={faQuestionCircle}
        onClick={handleShow}
      ></FontAwesomeIcon>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About {modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalContent.content}</p>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default About;
