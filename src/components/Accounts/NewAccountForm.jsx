import React, { useEffect, useState } from 'react'

import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import validator from 'validator';

import { useAppDispatch } from 'hooks/reduxHooks';
import { useAppSelector } from 'hooks/reduxHooks';
import { useForm } from 'hooks/useForm';
import { getCurrencyThunk } from 'store/appSlice';
import { getBanksThunk } from 'store/appSlice';
import { isObjectEmpy } from 'utils/helpers';
import { FormFeedback } from 'reactstrap';
import { createAccountThunk } from 'store/userAccount';

export const NewAccountForm = () => {

  const [ errors, setErrors ] = useState({});
  const [ response, setResponse ] = useState({ loading: false });
  const [ values, , handleInputChange, reset ] = useForm({
    numberAccount: '',
    balance: '',
    currencyId: 'default',
    bankId: 'default',
    customerId: '',
  });

  const dispatch = useAppDispatch();
  const banks = useAppSelector( state => state.app.banks );
  const currencies = useAppSelector( state => state.app.currencies );
  const  id  = useAppSelector( state => state.user.user.customerId );

  useEffect(()=>{
    if( !banks || banks.length < 1 ){
        const getBanks = async ()=>{
            await dispatch( getBanksThunk( ) );
        }
        getBanks();
    }
  }, []);

  useEffect(()=>{
    if( !currencies || currencies.length < 1 ){
        const getCurrencies = async ()=>{
            await dispatch( getCurrencyThunk() );
        }
        getCurrencies();
    }
  }, []);

  const renderBanks = ()=>{
    const optionBanks = banks.map( bank => 
        <option key={bank.id} value={bank.id}>{bank.name}</option>
    )
    return optionBanks;
  }

  const renderCurrencies = ()=>{
    const optionCurrencies = currencies.map( currency => 
        <option key={currency.id} value={currency.id}>{currency.name} - {currency.code}</option>
    )
    return optionCurrencies;
  }

  const handleSubmitNewAccount = (e)=>{
    e.preventDefault();
    setResponse({ loading: true });
    setErrors({});

    const errorsValidations = checkErrors();
    if( !isObjectEmpy(errorsValidations) ){
        setResponse({loading: false});
        setErrors(errorsValidations)
        return;
    }
    dispatch( createAccountThunk({ ...values, customerId: id }) )
    .then( res => {
      if(res.status === 200 ){
        setResponse( { variant: 'success', message: 'The account was saved successfuly.'});
        reset();
      }
    })
    .catch( err => setResponse( { variant: 'danger', message: err.response.data.message}))
    setResponse({loading: false});
  }

  const checkErrors = () => {
    const errors = {};
    if( !validator.isInt(values.numberAccount, [ {min: 5, max: 21} ])){
        errors.numberAccount = "The number account must be an integer between 5 to 21 characteres."
    }

    if( !validator.isNumeric(values.balance) ){
        errors.balance = "The balance account must be a number."
    }

    if( values.bankId === "default" ){
        errors.bankId = "Please select the bank of your account."
    }

    if( values.currencyId  === "default"){
        errors.currencyId = "Please select the currency of your account."
    }

    return errors;
  }

  return (
    <Card>
        <Card.Header>
            <Card.Title as="h4">New Account</Card.Title>
        </Card.Header>
        <Card.Body className='mx-2'>
            { response.message ? <Alert variant={response.variant}><strong>{response.message}</strong></Alert> : null}
            <Form>
                <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Account Number</label>
                        <Form.Control
                          name="numberAccount"
                          value={values.numberAccount}
                          onChange={handleInputChange}
                          placeholder="Insert your account number."
                          type="text"
                          required
                          isInvalid={!!errors.numberAccount}
                        ></Form.Control>
                        <FormFeedback>
                          { errors.numberAccount }
                        </FormFeedback>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Bank</label>
                        <Form.Control
                          name="bankId"
                          value={values.bankId}
                          onChange={handleInputChange}
                          as="select"
                          isInvalid={!!errors.bankId}>
                            <option value="default" disabled>Select the bank of your account.</option>
                            {renderBanks()}
                        </Form.Control>
                        <FormFeedback>
                          { errors.bankId }
                        </FormFeedback>
                      </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Currency</label>
                        <Form.Control
                          name="currencyId"
                          value={values.currencyId}
                          onChange={handleInputChange}
                          as="select"
                          isInvalid={!!errors.currencyId}>
                            <option value="default" disabled>Select the currency of your account.</option>
                            {renderCurrencies()}
                        </Form.Control>
                        <FormFeedback>
                          { errors.currencyId }
                        </FormFeedback>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Balance</label>
                        <Form.Control
                          name="balance"
                          value={values.balance}
                          onChange={handleInputChange}
                          placeholder="Insert your balance account."           
                          type="number"
                          isInvalid={!!errors.balance}
                        ></Form.Control>
                        <FormFeedback>
                          { errors.balance }
                        </FormFeedback>
                      </Form.Group>
                    </Col>
                </Row>
                <div className="mt-2 text-right">
                    { response.loading ? 
                      <Spinner className='mr-2' animation="border"/>
                    : null 
                    }

                    <Button 
                        onClick={handleSubmitNewAccount}
                        className="btn-fill"
                        variant="danger">Save</Button>
                </div>
            </Form>
        </Card.Body>
    </Card>
  )
}
