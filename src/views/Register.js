import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Alert, Button, Card, Col, Container, Form, Navbar, Row, Spinner } from 'react-bootstrap'
import { FormFeedback } from 'reactstrap';
import validator from 'validator';
import { useAppSelector } from 'hooks/reduxHooks';
import { useForm } from 'hooks/useForm';
import './css/Login.css';
import { isObjectEmpy } from 'utils/helpers';
import { useAppDispatch } from 'hooks/reduxHooks';
import { getCurrencyThunk } from 'store/appSlice';
import { registerUserThunk } from 'store/userAccount';

export const Register = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currencies = useAppSelector( state => state.app.currencies );
  const logged = useAppSelector( state => state.user.logged );
  const [ response, setResponse ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ values, , handleInputChange ] = useForm({
    name: '',
    email: '',
    username: '',
    password: '',
    preferredCurrency: 'default'
  });

  useEffect( ()=>{
    dispatch( getCurrencyThunk() );
  }, [])

  useEffect( () => {
    if ( logged === true ) {
      navigate('/budget/dashboard');
    }
  }, [logged]);

  const redirectToLogIn = () => {
    navigate('/budget/login');
  }

  const style = {
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19)",
    paddingInline: "4%"
  }


  const handleRegister = () => {
    setResponse({ loading: true});
    setErrors({});
    const validationsErrors = checkInputs();
    if( !isObjectEmpy(validationsErrors) ){
      setErrors( validationsErrors );
      setResponse({});
      return;
    }

    const userBody = {
      name: values.name,
      email: values.email,
      preferredCurrency: values.preferredCurrency,
      userData: {
        username: values.username,
        password: values.password
      }
    }

    dispatch( registerUserThunk( userBody ) )
    .then( res => setResponse({ variant: 'success', message: 'User registered successfully.' }) )
    .catch( err => setResponse({ variant: 'danger', message: err.response.data.message }) )
  }

  const checkInputs = () => {
    const errors = {};

    if( validator.isEmpty( values.name ) ){
      errors.name = 'Name is required.';
    }

    if( validator.isEmpty( values.email ) ){
      errors.email = 'Email is required.';
    }else{
      if( !validator.isEmail( values.email ) ){
        errors.email = 'Please insert a valid email.';
      }
    }

    if( validator.isEmpty( values.username ) ){
      errors.username = 'Username is required.';
    }

    if( !validator.isLength( values.password, { min: 5, max: 15 } ) ){
      errors.password = 'Password is required and must be min 5 to max 15 carachters.';
    }

    if( values.preferredCurrency === 'default' ){
      errors.preferredCurrency = 'Preferred currency is required.';
    }

    return errors;
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
              { response.message && <Alert variant={response.variant}><strong>{response.message}</strong></Alert>}
              <Row>
                <Col md="12">
                  <Form.Group>
                    <label>Name</label>
                    <Form.Control
                        type='text'
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        isInvalid={!!errors.name}
                        required>
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
                        isInvalid={!!errors.email}
                        required>
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
                      <option key="default" value="default" disabled>Select your preferred currency.</option>
                      {
                        currencies.map( currency => 
                          <option key={currency.id} value={currency.id}>{currency.name} - {currency.code}</option>
                        )
                      }
                    </Form.Control>
                    <FormFeedback>
                      { errors.preferredCurrency }
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
                  onClick={handleRegister}
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
