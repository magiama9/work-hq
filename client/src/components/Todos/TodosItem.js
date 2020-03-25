import React, { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Defines each item on the Todos
const TodosItem = (
  { id, children, todo, description, changeTaskStatus, editTask },
  props
) => {
  // State hooks
  // ========================================
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formState, setFormState] = useState({ description });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ========================================

  // Event Handling
  // ========================================
  const handleTyping = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    changeTaskStatus(id, 'deleted');
  };

  const handleEdit = (event) => {
    event.preventDefault();
    if (formState.description.length > 0) {
      editTask(id, formState.description);
      console.log(id);
      handleClose();
    } else {
      setValidated(true);
      setFormMessage('Please fill out the required fields');
    }
  };

  // For handling the save to move over to Todos
  const handleSave = (event) => {
    const form = event.currentTarget;
    // console.log("submit") // for testing
    if (form.checkValidity() === false) {
      // console.log("bad form") // for testing
      setFormMessage('Please fill out the required fields');
      event.preventDefault();
      event.stopPropagation();
    } else {
      var oldState = props.state;
      oldState.newTasks.push(formState);
      props.setState({
        ...props.state,
        newTasks: oldState.newTasks
      });
      setValidated(true);
      handleClose();
    }
  };
  // ========================================

  // Dragging
  // ========================================
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  drag(ref);
  // ========================================

  // Red words
  const redStyle = {
    color: 'red'
  };

  //make transparent while dragging
  const opacity = isDragging ? 0 : 1;

  return (
    <>
      <div
        ref={ref}
        style={{ opacity, transform: 'translate(0,0)' }}
        // The translate(0,0) fixes a bug where a white background appears behind the radiused corners of the item when dragging
        onClick={handleShow}
      >
        {children}
      </div>

      {/* popup on click */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{todo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSave}>
            {/* Message when required fields are not filled out  */}
            {formMessage.length > 0 && <p style={redStyle}>{formMessage}</p>}
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>
                Description <span style={redStyle}>*</span>
              </Form.Label>
              <Form.Control
                as='textarea'
                rows='5'
                type='input'
                name='description'
                onChange={handleTyping}
                value={formState.description} // Controlled Input
                placeholder=''
                required='required'
              />
            </Form.Group>
            <p style={redStyle}> * required</p>
            <Button variant='primary' onClick={handleEdit}>
              Save
            </Button>
            <span> </span>
            <Button variant='danger' onClick={handleDelete}>
              Delete
            </Button>
            <span> </span>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TodosItem;
