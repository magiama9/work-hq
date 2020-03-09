import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const classes = {
  btn: {
    backgroundColor: "white",
    color: "#0D92FF",
    borderRadius: "5px",
    width: "175px",
    height: "42px",
    fontWeight: "bold",
    marginTop: "17px"
  }
};

// Function to add new application
function ResourceForm(props) {
  const [validated, setValidated] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  // console.log("props in form", props) // for testing//
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState({
    resource: "",
    description: ""
  });
  const handleTyping = e => {
    // console.log("typing", e.target.value, e.target.name) // for testing //
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const redStyle = {
    color: "red"
  };

  // For handling the save to move over to board
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow} style={classes.btn}>
        Add Resource +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Best of luck!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please fill out the information below!
          <Form noValidate validated={validated} onSubmit={handleSave}>
            {/* Message when required fields are not filled out  */}
            {formMessage.length > 0 && <p style={redStyle}>{formMessage}</p>}

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>
                Resource Link <span style={redStyle}>*</span>
              </Form.Label>
              <Form.Control
                type="input"
                name="resource"
                onChange={handleTyping}
                placeholder=""
                value={formState.resource}
                required="required"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>
                Notes <span style={redStyle}>*</span>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Add to your List
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResourceForm;
