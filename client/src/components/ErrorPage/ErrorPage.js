import React from "react";
import classes from "./ErrorPageStyles";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "firebase/auth";
import { Animated } from "react-animated-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ErrorPage() {
  return (
    <>
      <Container fluid={true} style={classes.background}>
        <Animated
          animationIn="bounceInDown"
          animationOut="fadeOut"
          isVisible={true}
        >
          <Row style={classes.row}>
            <Col md={4}></Col>
            <Col md={4}>
              <h1 style={classes.h1}>We couldn't find that page...</h1>
              <a href="/">
                <h1 style={classes.h1}>
                  <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Return
                  Home
                </h1>
              </a>
            </Col>
            <Col md={4}></Col>
          </Row>
        </Animated>
      </Container>
    </>
  );
}

export default ErrorPage;
