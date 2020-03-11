import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";

const SaaS = () => {
  return (
    <>
      <style type="text/css">
        {`
        
    .btn-flat {
      background-color: #0c2e3a;
      color: white;
    }
    body {
      background: rgb(233, 230, 225)
    }
    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    .navbar {
      background: rgba(233, 230, 225)
    }

    .jumbotron {
      background: rgb(233, 230, 225)
    }`}
      </style>

      <Navbar
        sticky="top"
        expand="lg"
        style={{
          paddingLeft: "75px",
          paddingRight: "75px",
          paddingTop: "75px",
          height: "3vh"
        }}
      >
        <Navbar.Brand href="#home">Work HQ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#flow">How It Works</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">
              <Button variant="flat" size="xl">
                Get Started
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row style={{ height: "95vh" }}>
          <Col md={{ span: 8, offset: 0 }}>
            <Jumbotron>
              <h1>Job Searching That Doesn't Suck.</h1>
              <p>
                Job searching will never be easy, but it doesn’t have to be
                quite so hard. Work HQ makes it easy to keep your job search
                organized so you can focus on nailing the interview.
              </p>
              <p>
                <a href="/login">
                  <Button variant="flat" size="xxl">
                    Get Started
                  </Button>
                </a>
              </p>
            </Jumbotron>
          </Col>

          <Row id="features" style={{ paddingTop: "25px" }}>
            <Image src="/feature-list.png" fluid></Image>
          </Row>
          <Container id="flow" style={{ paddingTop: "25px", height: "95vh" }}>
            <Row style={{ height: "100%" }}>
              <Col>
                <Image src="/app-flow.png" fluid></Image>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>

      {/* <Row>
        <Col>
          <Image src="/dashboard.png" fluid></Image>
        </Col>
        <Col>
          <Image src="/tasks.png" fluid></Image>
        </Col>
        <Col>
          <Image src="/materials.png" fluid></Image>
        </Col>
      </Row> */}
    </>
  );
};

export default SaaS;
