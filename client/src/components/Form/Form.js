import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const classes = {
  btn: {
    backgroundColor: 'white',
    color: '#0D92FF',
    borderRadius: '5px',
    width: '175px',
    height: '42px',
    fontWeight: 'bold',
    marginTop: '17px'
  }
};

// Function to add new application
function Add(props) {
  const [validated, setValidated] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  // console.log("props in form", props) // for testing//
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState({
    title: '',
    company: '',
    href: '',
    salary: '',
    location: '',
    description: '',
    contactEmail: '',
    coverLetter: '',
    resume: ''
  });
  const handleTyping = (e) => {
    // console.log("typing", e.target.value, e.target.name) // for testing //
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const redStyle = {
    color: 'red'
  };

  // For handling the save to move over to board
  const handleSave = (event) => {
    const form = event.currentTarget;
    let re = new RegExp('^(http|https)://', 'i');
    let coverLetterStr = formState.coverLetter;
    let resumeLetterStr = formState.resume;
    let coverLetterMatch = re.test(coverLetterStr);
    let resumeLetterMatch = re.test(resumeLetterStr);

    if (coverLetterStr.length === 0) {
      coverLetterMatch = true;
    }

    if (resumeLetterStr.length === 0) {
      resumeLetterMatch = true;
    }

    console.log('submit', form.checkValidity()); // for testing
    if (form.checkValidity() === false) {
      console.log('----------------bad form'); // for testing
      setFormMessage('Required field(s) have not been filled out.');
      event.preventDefault();
      event.stopPropagation();
    } else if (coverLetterMatch === false || resumeLetterMatch === false) {
      console.log('----------------bad form'); // for testing
      setFormMessage('Required field(s) have not been filled out.');
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (checkForm()) {
        let oldState = props.state;
        //push new form to applications
        oldState.newApplications.push(formState);
        props.setState({
          ...props.state,
          newApplications: oldState.newApplications
        });
        setValidated(true);
        handleClose();
        setFormState({
          title: '',
          company: '',
          href: '',
          salary: '',
          location: '',
          description: '',
          contactEmail: '',
          coverLetter: '',
          resume: ''
        });
      } else {
        setValidated(true);
        setFormMessage(
          'Required field(s) have not been filled out. When submitting a cover letter or resume, please make sure that it has http:// or https:// before the link'
        );
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  // Checks if title and company and description have something written
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

  const handleClose = () => [
    setShow(false),
    setValidated(false),
    setFormMessage('')
  ];
  const handleShow = () => setShow(true);
  console.log('this is our form state', formState);
  return (
    <>
      <Button variant='primary' onClick={handleShow} style={classes.btn}>
        New Application +
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

            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>
                Title <span style={redStyle}>*</span>
              </Form.Label>
              <Form.Control
                type='input'
                name='title'
                onChange={handleTyping}
                required='required'
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>
                Company Name <span style={redStyle}>*</span>
              </Form.Label>
              <Form.Control
                type='input'
                name='company'
                onChange={handleTyping}
                placeholder=''
                required='required'
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Link</Form.Label>
              <Form.Control
                type='input'
                name='href'
                onChange={handleTyping}
                placeholder='https://'
              />
            </Form.Group>
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
                placeholder=''
                required='required'
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type='input'
                name='salary'
                onChange={handleTyping}
                placeholder=''
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='input'
                name='location'
                onChange={handleTyping}
                placeholder=''
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type='input'
                name='contactEmail'
                onChange={handleTyping}
                placeholder=''
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control
                type='input'
                name='coverLetter'
                onChange={handleTyping}
                placeholder='https://'
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Resume</Form.Label>
              <Form.Control
                type='input'
                name='resume'
                onChange={handleTyping}
                placeholder='https://'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSave}>
            Add to The Dashboard
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
