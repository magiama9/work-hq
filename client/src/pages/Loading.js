import React, { Component } from "react";
import Landing from "./Landing";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const classes = {
  background: {
    background: "url('https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&h=650&w=940')",
    backgroundSize: "cover",
    height: "100vh",
    margin: "0px 0px 0px 0px",
    padding: "2em auto 2em auto"
  },
  message: {
    fontFamily: "'Fredoka One', sans-serif",
    fontSize: "3em",
    color: "white",
    width: "50%",
    margin: "2em auto auto auto"
  }
}

class Loading extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      messages: ["Loading...", Landing],
      index: 0
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(({messages, index}) => {
        index = (index + 1) % messages.length;
        return {
          index
        }
      });
    }, 3000);
  }

  render() {
    const { index, messages } = this.state;
    return(
      <Container fluid={true} style={classes.background}>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <h1 style={classes.message}>{messages[index]}</h1>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    )
  }
}

export default Loading;