import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// This should be split into a separate component
// Defines each item on the board
const BoardItem = ({ id, children, title, company, description, url, resume, coverLetter, salary, contactEmail  }, props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //make draggable
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  //make transparent while dragging
  const opacity = isDragging ? 0 : 1;
  drag(ref);
console.log(title)
  return (
    <>
      <div ref={ref} style={{ opacity }} onClick={handleShow}>
        {children}
      </div>

      {/* popup on click */}
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title} - {company}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {description}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      </Modal>
    </>
  );

};

export default BoardItem;
