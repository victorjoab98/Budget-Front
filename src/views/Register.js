import { useForm } from 'hooks/useForm';
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Navbar, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { FormFeedback } from 'reactstrap';
import './css/Login.css';

export const Register = () => {

  const navigate = useNavigate();
  const [ errors, setErrors ] = useState({});
  const [ values, , handleInputChange ] = useForm({
    name: '',
    email: '',
    username: '',
    password: '',
    preferredCurrency: 'default'
  });

  const redirectToLogIn = () => {
    navigate('/budget/login');
  }

  const style = {
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19)",
    paddingInline: "4%"
  }

  return (
    <Container className='p-0' fluid>
      <Navbar  style={{backgroundColor:"#2b2b2e", height:"80px", justifyContent: 'center'}}>
        <Row className="mx-5 px-5" style={{width: '80%'}}>
        </Row>
      </Navbar>
      <Row style={{ marginTop: "1.5%", justifyContent: 'center' }}>
        <Col xl="3" lg="4" md="6" sm="8" xs="8">
          <Card className="py-1" style={style}>
            <Card.Header className="text-center">
              <h3>Budget-Wallet</h3>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md="12">
                  <Form.Group>
                    <label>Name</label>
                    <Form.Control
                        type='text'
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        isInvalid={!!errors.name}>
                    </Form.Control>
                    <FormFeedback>
                      { errors.name }
                    </FormFeedback>
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group>
                    <label>Email</label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        isInvalid={!!errors.email}>
                    </Form.Control>
                    <FormFeedback>
                      { errors.email }
                    </FormFeedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col md="12">
                  <Form.Group>
                    <label>Username</label>
                    <Form.Control
                        type='text'
                        name="username"
                        value={values.username}
                        onChange={handleInputChange}
                        isInvalid={!!errors.username}>
                    </Form.Control>
                    <FormFeedback>
                      { errors.username }
                    </FormFeedback>
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Form.Group>
                    <label>Password</label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        isInvalid={!!errors.password}>
                    </Form.Control>
                    <FormFeedback>
                      { errors.password }
                    </FormFeedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col md="12">
                  <Form.Group>
                    <label>Preferred Currency</label>
                    <Form.Control
                        as="select"
                        name="preferredCurrency"
                        value={values.preferredCurrency}
                        onChange={handleInputChange}
                        isInvalid={!!errors.preferredCurrency}>
                      <option key="default" value="default" hidden>Select your preferred currency.</option>
                    </Form.Control>
                    <FormFeedback>
                      { errors.preferredCurrency }
                    </FormFeedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mt-4' >
                <Col md="12" className='text-center'>
                    <Button
                    className='btn-fill'>
                        Sign Up
                    </Button>
                </Col>
              </Row>
            </Card.Body>
            <Card.Body>
              <Row>
                <Col md="12" className="mt-1 mb-2 text-right">
                  <div>
                    Already have an account? - 
                    <span
                        onClick={redirectToLogIn} 
                        className='text-primary'>Log In</span>
                  </div>
                </Col>  
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
