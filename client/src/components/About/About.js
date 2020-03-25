import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const About = (props) => {
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const todoContent = {
    title: 'Tasks',
    content:
      "This is your tasks page. You can add tasks by clicking the 'New Task' button at the top of the page As you start and complete tasks, simply drag them across the columns. If you would like to edit or delete a task, simply click on the item."
  };

  const dashboardContent = {
    title: 'Applications',
    content:
      "This is your dashboard! Add new jobs to your dashboard by clicking the 'New Application' button at the top of the page. As your job search progresses, simply drag your jobs across the columns. If you would like to edit or delete an application, simply click on the item."
  };

  const materialsContent = {
    title: 'Materials',
    content:
      "This is your materials page. Add new resources by clicking the 'Add Resource' button at the top of the page. Materials are automatically added into the correct column as you add jobs to your dashboard. You can also drag items into different columns. If you would like to edit or delete the link, click on the card. If you would like to visit your link, click on the link text."
  };

  const handleContent = (page) => {
    switch (page) {
      case 'dashboard':
        setModalContent(dashboardContent);
        break;
      case 'materials':
        setModalContent(materialsContent);
        break;
      case 'todos':
        setModalContent(todoContent);
        break;
      default:
        setModalContent(dashboardContent);
        break;
    }
  };

  useEffect(() => {
    handleContent(props.page);
  }, [props]);

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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default About;
