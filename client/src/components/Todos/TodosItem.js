import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// This should be split into a separate component
// Defines each item on the Todos
const TodosItem = (
  { id, children, todo, description, changeTaskStatus },
  props
) => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formState, setFormState] = useState({ description: description });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTyping = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleDelete = event => {
    event.preventDefault();
    changeTaskStatus(id, "deleted");
  };

  //make draggable
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  // Red words
  const redStyle = {
    color: "red"
  };

  // For handling the save to move over to Todos
  const handleSave = event => {
    const form = event.currentTarget;
    // console.log("submit") // for testing
    if (form.checkValidity() === false) {
      // console.log("bad form") // for testing
      setFormMessage("Please fill out the required fields");
      event.preventDefault();
      event.stopPropagation();
    } else {
      var oldState = props.state;
      oldState.newApplications.push(formState);
      props.setState({
        ...props.state,
        newApplications: oldState.newApplications
      });
      setValidated(true);
      handleClose();
    }
  };

  //make transparent while dragging
  const opacity = isDragging ? 0 : 1;
  drag(ref);
  return (
    <>
      <div ref={ref} style={{ opacity }} onClick={handleShow}>
        {children}
      </div>

      {/* popup on click */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{todo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {description}
          <Form noValidate validated={validated} onSubmit={handleSave}>
            {/* Message when required fields are not filled out  */}
            {formMessage.length > 0 && <p style={redStyle}>{formMessage}</p>}
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>
                Description <span style={redStyle}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                type="input"
                name="description"
                onChange={handleTyping}
                value={formState.description}
                placeholder=""
                required="required"
              />
            </Form.Group>
            <p style={redStyle}> * required</p>
            <Button variant="primary" type="submit">
              Save
            </Button>
            <span> </span>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <span> </span>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Edit</Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodosItem;
