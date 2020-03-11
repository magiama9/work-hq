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
      background-color: #791c1b;
      color: white;
    }
    .topbit {
      background: linear-gradient(rgba(233, 230, 225, 0.0),rgba(233, 230, 225, 1.0)), url("https://images.pexels.com/photos/1843717/pexels-photo-1843717.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260");
      background-size: cover;
    }
    body {
      background: rgba(233, 230, 225, 1.0);
    }
    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    .btn:hover {
      background-color: #e93f33;
      color: white;
    }

    .jumbotron {
      background: rgba(233, 230, 225, 0.0);
    
    }`}
      </style>
      <Container fluid={true} className="topbit">
        <Row>
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
            <Navbar.Brand href="#home" style={{fontFamily: "'Nunito', sans-serif", fontWeight: "600"}}>Work HQ</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#features" style={{fontFamily: "'Nunito', sans-serif"}}>Features</Nav.Link>
                <Nav.Link href="#flow" style={{fontFamily: "'Nunito', sans-serif"}}>How It Works</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/login">
                  <Button variant="flat" size="xl" style={{fontFamily: "'Nunito', sans-serif"}}>
                    Get Started
                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        <Row style={{ height: "95vh" }}>
          <Col md={{ span: 8, offset: 0 }}>
            <Jumbotron>
              <h1 style={{fontFamily: "'Fredoka One', sans-serif"}}>Job Searching That Doesn't Suck.</h1>
              <p style={{fontFamily: "'Nunito', sans-serif"}}>
                Job searching will never be easy, but it doesn’t have to be
                quite so hard. Work HQ makes it easy to keep your job search
                organized so you can focus on nailing the interview.
              </p>
              <p>
                <a href="/login">
                  <Button variant="flat" size="xxl" style={{fontFamily: "'Nunito', sans-serif"}}>
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

