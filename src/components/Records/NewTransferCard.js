import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap'
import { FormFeedback } from 'reactstrap';
import validator from 'validator';
import { useAppSelector } from 'hooks/reduxHooks';
import { useForm } from 'hooks/useForm';
import { isObjectEmpy } from 'utils/helpers';
import { useAppDispatch } from 'hooks/reduxHooks';
import { newTransfer } from 'store/userAccount';

export const NewTransferCard = () => {

  const user = useAppSelector( state => state.user.user );
  const accounts = useAppSelector( state => state.user.accounts );
  const banks = useAppSelector( state => state.app.banks );

  const dispatch = useAppDispatch();
  const [ account, setAccount ] = useState({});
  const [ errors, setErrors ] = useState([]);
  const [ bankAccounts, setBankAccounts ] = useState([]);
  const [ realBanks, setRealBanks] = useState([]);
  const [ response, setResponse ] = useState({});

  const [ values, , handleInputChange ] = useForm({
    sourceAccountId: '',
    bankId: 'default',
    destinationNumberAccount: '',
    amount: '',
    description: ''
  });

  useEffect(() => {
    if (values.sourceAccountId !== '') {
        const actualAccount = accounts.find((ac) => ac.id == values.sourceAccountId);
        setAccount(actualAccount);
    }
  }, [values.sourceAccountId]);

  useEffect( ()=>{
    const realBanksAux = banks.filter( b => b.name !== '---' );
    setRealBanks( realBanksAux );
  }, [banks]);

  useEffect( ()=>{
    const bankAccountsAux = accounts.filter( a => a.numberAccount !== 'Cash' );
    setBankAccounts( bankAccountsAux );
  }, [accounts])

  const renderBanks = ()=>{
    const optionBanks = realBanks.map( bank => 
        <option key={bank.id} value={bank.id}>{bank.name}</option>
    )
    return optionBanks;
  }

  const handleTransfer = () => {
    setErrors({});
    setResponse({ loading: true })
    const validations = validationsForm();
    if( !isObjectEmpy(validations) ){
        setErrors(validations);
        setResponse({});
        return;
    }

    dispatch(newTransfer( { ...values, customerId: user.customerId },  user.customerId ) )
    .then( res => {
      console.log(res)
      setResponse( { variant: 'success', message: res.data.message } );
    }).catch( err => {
      console.log(err)
      setResponse( { variant: 'danger', message: err.response.data.message || 'Error was found.'})
    })
  }

  const validationsForm = () => {
    const errors = {};

    if( !validator.isInt( values.sourceAccountId.toString() ) ){
      errors.sourceAccountId = 'Account is required.';
    }

    if( !validator.isInt( values.destinationNumberAccount ) ){
        errors.destinationNumberAccount = 'Destination number account is required.';
      }

    if( !validator.isInt( values.bankId.toString() ) ){
        errors.bankId = 'Bank is required.';
    }

    if( !validator.isNumeric( values.amount ) || !parseInt(values.amount) > 0 ){
        errors.amount = 'Amount is required and must be greater than 0.';
    }

    return errors;
  }

  return (
    <Card>
        <Card.Header>
          <Card.Title as="h4">New Transfer</Card.Title>
        </Card.Header>
        <Card.Body className="mx-3">
            <Row>
              <Col>
                { response.message && <Alert variant={response.variant}><strong>{ response.message }</strong> </Alert>}
                <Form.Group>
                  <label>Source Account</label>
                  <Form.Control
                    name="sourceAccountId"
                    value={values.sourceAccountId}
                    onChange={handleInputChange}
                    isInvalid={ !!errors.sourceAccountId }
                    as="select"
                    disabled={ response.variant === 'success'}>
                      <option key="default" value="default" hidden>Select your source account.</option>
                      { bankAccounts.map((account) => (
                        <option key={account.id} value={account.id}>{account.numberAccount} - {account.bank.name} ( {account.currency.symbol}{account.balance} )</option>
                      ))}
                  </Form.Control>
                  <FormFeedback>
                        { errors.sourceAccountId }
                    </FormFeedback>
                  </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3"> 
                <Col>
                  <Form.Group>
                    <label>Destination Number Account</label>
                    <Form.Control
                        placeholder='Insert the destination account number'
                        name="destinationNumberAccount"
                        value={values.destinationNumberAccount}
                        onChange={ handleInputChange }
                        type="number"
                        isInvalid={ !!errors.destinationNumberAccount }
                        disabled={ response.variant === 'success'}
                    />
                    <FormFeedback>
                        { errors.destinationNumberAccount }
                    </FormFeedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <label>Destination Bank </label>
                    <Form.Control
                        name="bankId"
                        value={values.bankId}
                        onChange={handleInputChange}
                        as="select"
                        isInvalid={ !!errors.bankId }
                        disabled={ response.variant === 'success'}>
                        <option value="default" disabled>Select the bank of the destination account.</option>
                        {renderBanks()}
                    </Form.Control>
                    <FormFeedback>
                        { errors.bankId }
                    </FormFeedback>
                  </Form.Group>
                </Col>
            </Row>
            <Row className='mt-5' style={{justifyContent: 'center' }}>
                <Col md="4" className='text-center'>
                    <InputGroup className="mb-3" >
                        <InputGroup.Text id="basic-addon1" style={{  fontSize: 20 }}>
                         { (account && account.currency) ? account.currency.symbol : '' }
                        </InputGroup.Text>
                        <Form.Control
                        className='text-center'
                        style={{ fontSize: 40, border: 0 }}
                        type="number"
                        size="sm"
                        name='amount'
                        placeholder='0'
                        value={values.amount}
                        onChange={handleInputChange}
                        isInvalid={!!errors.amount}
                        disabled={ response.variant === 'success'}
                        >
                        </Form.Control>
                        { (account && account.currency) ? account.currency.code : '' }
                        <FormFeedback>{errors.amount}</FormFeedback>
                    </InputGroup>
                    <label>AMOUNT To TRANSFER</label>
                </Col>
            </Row>

            <Row>
               <Col md="12">
                  <Form.Group>
                    <label>Description (Optional)</label>
                    <Form.Control
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        placeholder="Insert a short description of this record."
                        type="text"
                        disabled={ response.variant === 'success'}
                    />
                  </Form.Group>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col className='text-right'>
                  { response.loading && <Spinner className='mr-2' animation="border"/>}
                  <Button
                    disabled={response.variant === 'success'}
                    className='btn-fill mt-2'
                    onClick={handleTransfer}>Do Transfer</Button>
                </Col>
            </Row>
        </Card.Body>
    </Card>
  )
}
