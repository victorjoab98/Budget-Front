import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router'
import { FormFeedback } from 'reactstrap';
import validator from 'validator';

import { useAppSelector } from 'hooks/reduxHooks';
import { RecordsListByAccount } from 'components/Records/RecordList';
import { updateAccountThunk } from 'store/userAccount';
import { useAppDispatch } from 'hooks/reduxHooks';

export const AccountView = () => {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const accounts = useAppSelector( state => state.user.accounts );
  const user = useAppSelector( state => state.user.user );
  const [ account, setAccount ] = useState({});
  const [ editBalance, setEditBalance ] = useState(false);
  const [ newBalance, setNewBalance ] = useState('');
  const [ errors, setErrors ] = useState({});
  const [ response, setResponse ] = useState({});

  useEffect( ()=>{
    if( accounts.length > 0 ){
        const a = accounts.find( ac => ac.id.toString() === id );
        setAccount(a);
    }
  }, [id, accounts]);

  const handleUpdateBalance = () => {
    setResponse({ loading: true });
    setErrors({});

    if( !validator.isNumeric( newBalance ) || !parseInt( newBalance ) > 0 ){
        setErrors({ balance : 'The new balance is required and must be greater than 0.' });
        setResponse({});
        return;
    }

    dispatch( updateAccountThunk( account.id, newBalance, user.customerId ) )
    .then( res => {
        setResponse({ variant: 'success', message: res.data.message })
    }).catch( err => {
        setResponse({ variant: 'danger', message: err.response.data.message || 'Error in operation.' })
    })
  }

  return (
    <Container fluid>
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Row>
                <Col xs="8" md="10">
                  <Card.Title as="h4">Details Account</Card.Title>
                </Col>
                <Col xs="4" md="2" className="text-right">
                  <Button
                      onClick={()=>setEditBalance(true)} 
                      size="sm"
                      className="mt-2 btn-fill"
                      type="button"
                      variant="warning"
                      disabled={editBalance}>
                        <strong>Edit Balance</strong></Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
                <Row className="mx-2">
                    <Col>
                        <p className='mb-0'>Account:</p>
                        <p className='ml-2 text-muted'> { account.numberAccount } </p>
                    </Col>
                    <Col>
                        <p className='mb-0'>Bank:</p>
                        <p className='ml-2 text-muted'> { account.bank ? account.bank.name : '' } </p>
                    </Col>
                    <Col>
                        <p className='mb-0'>Currency:</p>
                        <p className='ml-2 text-muted'> {account.currency ?  `${account.currency.code}-${account.currency.name}`: ''} </p>
                    </Col>
                    <Col>
                        <p className='mb-0'>Balance:</p>
                        <p className='ml-2 text-muted'> { account.currency ? account.currency.symbol : '' } {account.balance } </p>
                    </Col>
                </Row>
                { editBalance && 
                <Row className='mx-2 mt-4 mb-5' style={{justifyContent: 'center' }}>
                  <Col md="4" className='text-center'>
                    { response.message && <Alert variant={response.variant}><strong>{response.message}</strong></Alert>}
                    <hr></hr>
                    <InputGroup className="mb-3" >
                        <InputGroup.Text id="basic-addon1" style={{  fontSize: 20 }}>
                          { account.currency ? account.currency.symbol : '' }
                        </InputGroup.Text>
                        <Form.Control
                        className='text-center'
                        size='lg'
                        style={{ fontSize: 40, border: 0 }}
                        type="number"
                        placeholder={Number(account.balance)}
                        value={newBalance}
                        onChange={({target})=>setNewBalance(target.value)}
                        isInvalid={!!errors.balance}>
                        </Form.Control>
                        { (account && account.currency) ? account.currency.code : '' }
                        <FormFeedback>{errors.balance}</FormFeedback>
                    </InputGroup>
                    <label>ENTER THE NEW BALANCE</label>
                    
                    { response.loading && 
                        <>
                          <hr/>
                          <Spinner animation="border"/>
                        </>
                    }
                    <br/>
                    <Button
                        onClick={handleUpdateBalance}
                        className='btn-fill mt-2'
                        size="md">Save</Button>
                    <Button
                        onClick={()=>setEditBalance(false)}
                        className='btn-fill mt-2 ml-1'
                        variant='danger'
                        size="md">Close</Button>
                  </Col>
                </Row>
                }
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>

          <RecordsListByAccount accountId={ id } />
    </Container>
  )
}
