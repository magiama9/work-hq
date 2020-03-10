import React, { Component } from "react";
import Landing from "./Landing";
import Loading from "../components/Loading";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const classes = {
  divBackground: {
    background: "linear-gradient(to bottom right, #0e2e3a, #3c8791)",
    // background:
    //   "url('https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&h=650&w=940')",
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw",
    margin: "0px 0px 0px 0px",
    padding: "2em auto 2em auto"
  }
};

class LoadingPage extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      messages: [<Loading />, <Landing/>],
      index: 0
    };
  }

  // Starts an timer when the component mounts
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState(({ messages, index }) => {
        index = (index + 1) % messages.length;
        return {
          index
        };
      });
    }, 3000);
  }

  // Clears the interval when the component unmounts
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { index, messages } = this.state;
    return (
      <Container fluid={true} style={classes.divBackground}>
        <Row>
          <Col md={12}>
          {/* <Col md={4}></Col>
          <Col md={4}> */}
            <div style={classes.message}>{messages[index]}</div>
          {/* </Col>
          <Col md={4}></Col> */}
          </Col>
        </Row> 
      </Container>
    );
  }
}

export default LoadingPage;
