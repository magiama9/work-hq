import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

// Function to add new application
function Add (props) {
  // console.log("props in form", props) // for testing//
  const [show, setShow] = useState(false);
  const [formState,setFormState] = useState({title:"", company: "", salary:"", location:"", description:""})
  const handleTyping = (e) => {
    // console.log("typing", e.target.value, e.target.name) // for testing //
    setFormState({...formState, [e.target.name]: e.target.value})
  }

  // For handling the save to move over to board
  const handleSave = () => {
    // To do: onClick api call to save to database
    var oldState = props.state
    oldState.newApplications.push(formState)
    props.setState({...props.state, newApplications:oldState.newApplications})
    handleClose()
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(formState) // for testing
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
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="input" name="title" onChange={handleTyping} placeholder="" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="input" name="company" onChange={handleTyping} placeholder="" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control type="input" name="description" onChange={handleTyping} placeholder="" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="input" name="salary" onChange={handleTyping} placeholder="" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Location</Form.Label>
              <Form.Control type="input" name="location" onChange={handleTyping} placeholder="" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Add to The Dashboard!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;