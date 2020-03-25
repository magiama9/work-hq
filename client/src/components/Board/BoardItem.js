import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { FormCheck } from 'react-bootstrap';

// Defines each item on the board
const BoardItem = (
  {
    id,
    itemIndex,
    index,
    children,
    title,
    company,
    description,
    href,
    salary,
    location,
    changeTaskStatus,
    orderTask,
    editTask,
    status
  },
  props
) => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formState, setFormState] = useState({
    title,
    company,
    description,
    href,
    salary,
    location
  });
  let changed = false;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTyping = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  //make draggable
  const ref = useRef(null);
  const [{ isDragging, end }, drag] = useDrag({
    item: { type: 'card', id, index, status },
    begin() {
      changed = false;
    },
    end(item, monitor) {
      if (
        monitor.didDrop() &&
        monitor.getDropResult().columnStatus !== status
      ) {
        changed = true;
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  // Red words
  const redStyle = {
    color: 'red'
  };

  // Delete
  const handleDelete = (event) => {
    event.preventDefault();
    changeTaskStatus(id, 'deleted');
    console.log(id);
  };

  const checkForm = () => {
    if (
      formState.title.length > 0 &&
      formState.company.length > 0 &&
      formState.description.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Edit
  const handleEdit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity === false || checkForm() === false) {
      setValidated(true);
      setFormMessage('Please fill out the required fields');
      event.preventDefault();
    } else {
      editTask(
        id,
        formState.title,
        formState.company,
        formState.href,
        formState.description,
        formState.salary,
        formState.location
      );
      console.log(id);
      handleClose();
    }
  };

  //make transparent while dragging
  const opacity = isDragging ? 0 : 1;
  // const verticalAlign = 'middle';

  const [, drop] = useDrop({
    accept: 'card',
    drop(item, monitor) {},
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      console.log(hoverIndex);
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      if (changed) {
        return;
      }
      // Time to actually perform the action
      orderTask(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });
  // React.Children.map(children, (child) => {
  //   console.log(child);
  // });
  drag(drop(ref));
  return (
    <>
      {console.log(itemIndex)}
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
          <Modal.Title>
            {title} - {company}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            name='modal'
            noValidate
            validated={validated}
            onSubmit={handleEdit}
          >
            {/* Message when required fields are not filled out  */}
            {formMessage.length > 0 && <p style={redStyle}>{formMessage}</p>}
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>
                <h6>
                  Title <span style={redStyle}>*</span>
                </h6>
              </Form.Label>
              <Form.Control
                type='input'
                name='title'
                onChange={handleTyping}
                value={formState.title} // Controlled Input
                placeholder=''
                required='required'
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>
                <h6>
                  Company <span style={redStyle}>*</span>
                </h6>
              </Form.Label>
              <Form.Control
                type='input'
                name='company'
                onChange={handleTyping}
                value={formState.company} // Controlled Input
                placeholder=''
                required='required'
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>
                <h6>Link</h6>
              </Form.Label>
              <Form.Control
                type='input'
                name='href'
                onChange={handleTyping}
                value={formState.href} // Controlled Input
                placeholder='https://'
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>
                <h6>
                  Description <span style={redStyle}>*</span>
                </h6>
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
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>
                <h6>Salary</h6>
              </Form.Label>
              <Form.Control
                type='input'
                name='salary'
                onChange={handleTyping}
                value={formState.salary} // Controlled Input
                placeholder=''
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>
                <h6>Location</h6>
              </Form.Label>
              <Form.Control
                type='input'
                name='location'
                onChange={handleTyping}
                value={formState.location} // Controlled Input
                placeholder=''
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

export default BoardItem;
