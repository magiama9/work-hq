import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

// Function to add new application
function Add(props) {
  const [validated, setValidated] = useState(false)
  const [formMessage, setFormMessage] = useState("")

  // console.log("props in form", props) // for testing//
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    company: "",
    salary: "",
    location: "",
    description: ""
  });
  const handleTyping = e => {
    // console.log("typing", e.target.value, e.target.name) // for testing //
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const redStyle = {
    color: 'red',
  };

  // For handling the save to move over to board
  const handleSave = (event) => {
    const form = event.currentTarget
    // console.log("submit") // for testing
    if (form.checkValidity() === false) {
      // console.log("bad form") // for testing
      setFormMessage("Please fill out the required fields")
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add a New Application! +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Best of luck!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please fill out the information below!
          <Form noValidate validated={validated} onSubmit={handleSave}>
            {/* Message when required fields are not filled out  */}
            {formMessage.length > 0 && (
              <p style={redStyle}>{formMessage}</p>
            )}

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title <span style={redStyle}>*</span></Form.Label>
              <Form.Control
                type="input"
                name="title"
                onChange={handleTyping}
                placeholder=""
                required="required"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Company Name <span style={redStyle}>*</span></Form.Label>
              <Form.Control
                type="input"
                name="company"
                onChange={handleTyping}
                placeholder=""
                required="required"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Description <span style={redStyle}>*</span></Form.Label>
              <Form.Control as="textarea" rows="5"
                type="input"
                name="description"
                onChange={handleTyping}
                placeholder=""
                required="required"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="input"
                name="salary"
                onChange={handleTyping}
                placeholder=""
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="input"
                name="location"
                onChange={handleTyping}
                placeholder=""
              />
            </Form.Group>
            <p style={redStyle}> * required</p>
            {/* Button must be inside form element to trigger validation */}
            <Button variant="primary" type="submit">
              Add to The Dashboard!
              </Button>
              <span> </span>
            <Button variant="secondary" onClick={handleClose}>
              Close
              </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Add;
