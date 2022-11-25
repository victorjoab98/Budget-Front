import React, { useState } from 'react'
import validator from 'validator';
import { Alert, Button, Card, Col, Container, Form, Navbar, Row, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { FormFeedback } from 'reactstrap';
import { useForm } from 'hooks/useForm'
import { isObjectEmpy } from 'utils/helpers';
import { useAppDispatch } from 'hooks/reduxHooks';
import { loginUserThunk } from 'store/userAccount';
import './css/Login.css';

export const Login = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ values, , handleInputChange ] = useForm({
    username: '',
    password: ''
  });
  const [ errors, setErrors ] = useState({});
  const [ response, setResponse ] = useState({});

  const style = {
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19)",
    paddingInline: "4%"
  }

  const handleLogin = () => {
    setErrors({});
    setResponse({ loading : true });

    const validationsErrors = checkInputs();
    if( !isObjectEmpy(validationsErrors) ){
        setErrors( validationsErrors );
        setResponse({});
        return;
    }

    dispatch( loginUserThunk( values ) )
    .then( res => {
        console.log(res);
        setResponse({});
    }).catch( err => {
        console.log(err)
        setResponse({ variant: 'danger', message: err.response.data.message || 'Error.'})
    });

  }

  const checkInputs = () => {
    const errors = {};
    if( validator.isEmpty(values.username )){
        errors.username = "Please enter your username."
    }

    if( validator.isEmpty( values.password) ){
        errors.password = "Please enter your password."
    }

    return errors;
  }

  const handleSignUp = () => {
    navigate('/budget/register');
  }

  return (
    <Container className='p-0' fluid>
        <Navbar  style={{backgroundColor:"#2b2b2e", height:"80px", justifyContent: 'center'}}>
            <Row className="mx-5 px-5" style={{width: '80%'}}>
            </Row>
        </Navbar>
        <Row style={{ marginTop: "3.5%", justifyContent: 'center' }}>
            <Col xl="3" lg="4" md="6" sm="8" xs="8">
                <Card className="py-2" style={style}>
                    <Card.Header className="text-center">
                        <h3>Budget-Wallet</h3>
                    </Card.Header>
                    <Card.Body className="mt-3">
                      { response.message && <Alert variant={response.variant}><strong>{ response.message }</strong></Alert>}
                      <Row>
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
                        <Col className="mt-2" md="12">
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
                      <Row className='mt-4' >
                        <Col md="12" className='text-center'>
                            {
                                response.loading && <Spinner className='mr-2' 
                                variant='primary'
                                animation='border'/>
                            }
                            <Button
                            onClick={handleLogin}
                            className='btn-fill'>
                                Sign In
                            </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Body>
                      <Row>
                        <Col md="12" className="mt-4 mb-2 text-right">
                          <div>
                            Don't have an account? - 
                            <span
                                onClick={handleSignUp} 
                                className='text-primary'>Sign Up</span>
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
