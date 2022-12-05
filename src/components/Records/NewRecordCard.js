import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import validator from 'validator';
import { useAppSelector } from 'hooks/reduxHooks';
import { useCategories } from 'hooks/useCategories';
import { useForm } from 'hooks/useForm';
import { isObjectEmpy } from 'utils/helpers';
import { FormFeedback } from 'reactstrap';
import { addRecordThunk } from 'store/userAccount';
import { useAppDispatch } from 'hooks/reduxHooks';

export const NewRecordCard = ( { recordType = 'Income' } ) => {

  const dispatch = useAppDispatch();
  const  id  = useAppSelector( state => state.user.user.customerId );
  const accounts = useAppSelector((state) => state.user.accounts);
  const recordTypes = useAppSelector((state) => state.app.recordTypes);
  const [ categories ] = useCategories(recordType);
  const [ values, setValues, handleInputChange ] = useForm({
    accountId:'',
    categoryId:'',
    amount: '',
    description:'',
  });
  const [ account, setAccount ] = useState({});
  const [ response, setResponse ] = useState({});
  const [ errors, setErrors ] = useState({});

  useEffect(() => {
    if (accounts.length > 0) {
        setValues({ ...values, accountId: accounts[0].id });
    }
  }, [accounts]);

  useEffect(() => {
    if (categories.length > 0) {
        setValues({ ...values, categoryId: categories[0].id });
    }
  }, [categories]);

  useEffect(() => {
    if (values.accountId !== '') {
        const actualAccount = accounts.find((ac) => ac.id == values.accountId);
        setAccount(actualAccount);
    }
  }, [values.accountId]);

  const newRecordHandler = (e) => {
    e.preventDefault();
    setErrors({});
    setResponse({ loading: true });
    const validations = validationsForm();
    if( !isObjectEmpy(validations) ){
      setErrors(validations);
      setResponse({});
      console.log(validations);
      return;
    }
    const recordTypeId = recordTypes.find( (rt) => rt.name === recordType )
    dispatch(addRecordThunk({ ...values, userId: id, recordTypeId: recordTypeId.id }, id))
    .then( res => {
        if(res.status === 200 ){
            setResponse({ variant: 'success', message: 'Record created successfully.' });
        }
    }).catch( err => {
        setResponse({ variant: 'danger', message: err.response.data.message });
    })
  }

  const validationsForm = () => {
    const errors = {};

    if( !validator.isInt( values.accountId.toString() ) ){
      errors.accountId = 'Account is required.';
    }

    if( !validator.isInt( values.categoryId.toString() ) ){
        errors.categoryId = 'Category is required.';
    }

    if( !validator.isNumeric( values.amount ) || !parseInt(values.amount) > 0 ){
        console.log(values.amount);
        errors.amount = 'Amount is required and must be greater than 0.';
    }

    return errors;
  }
  return (
    <Card>
        <Card.Header>
          <Card.Title as="h4">New Record</Card.Title>
          <Card.Body>
            { response.message && <Alert variant={response.variant}><strong>{response.message}</strong></Alert> }
            <Row>
              <Col>
                <Form.Group>
                  <label>Account</label>
                  <Form.Control
                    name="accountId"
                    value={values.accountId}
                    onChange={handleInputChange}
                    disabled={ response.variant === 'success'}
                    as="select">
                      { accounts.map((account) => (
                        <option key={account.id} value={account.id}>{account.numberAccount} - {account.bank.name} ({account.currency.symbol}{account.balance})</option>
                      ))}
                  </Form.Control>
                  </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <label>Category</label>
                  <Form.Control
                    name="categoryId" 
                    value={values.categoryId}
                    onChange={handleInputChange}
                    as="select"
                    disabled={ response.variant === 'success'}
                    isInvalid={ !!errors.categoryId }>
                      { categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </Form.Control>
                    <FormFeedback>
                        { errors.categoryId }
                    </FormFeedback>
                  </Form.Group>
              </Col>
            </Row>
            <Row className='mt-5' style={{justifyContent: 'center' }}>
                <Col md="3" className='text-center'>
                    <InputGroup className="mb-3" >
                        <InputGroup.Text id="basic-addon1" style={{  fontSize: 20 }}>
                        {recordType === 'Income' ? '+ ' : '- '}
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
                        disabled={ response.variant === 'success'}
                        isInvalid={!!errors.amount}>
                        </Form.Control>
                        { (account && account.currency) ? account.currency.code : '' }
                        <FormFeedback>{errors.amount}</FormFeedback>
                    </InputGroup>
                    <label>AMOUNT</label>
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
            <Row className="mt-3">
                <Col className='my-2 text-right'>
                    {
                        response.loading 
                        ? <Spinner className='mr-2' 
                            variant='primary'
                            animation='border'/>
                        : null
                    }

                    <Button 
                        className="btn-fill"
                        onClick={newRecordHandler}
                        variant="warning">
                            Save
                    </Button>
                </Col>
                

            </Row>
          </Card.Body>
        </Card.Header>
      </Card>
  )
}
