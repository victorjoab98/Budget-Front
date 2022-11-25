import React, { useEffect } from 'react'

import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'

import { useAppSelector } from 'hooks/reduxHooks';
import { useAppDispatch } from 'hooks/reduxHooks'
import { getAccountsThunk } from 'store/userAccount';
import { NewAccountForm } from 'components/Accounts/NewAccountForm';
import { useNavigate } from 'react-router';

export const Accounts = () => {

  const accounts = useAppSelector((state) => state.user.accounts);
  const [ newAccountForm, setNewAccountForm ] = React.useState(false);
  const navigate = useNavigate();

  const handlerNewAccount = () => {
    setNewAccountForm(!newAccountForm);
  }
  
  
  const handleClick = (id)=> {
    navigate(`${id}`);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Row>
                  <Col xs="9" md="10">
                    <Card.Title as="h4">Your Accounts</Card.Title>
                    <p className="card-category">
                      Your registered accounts
                    </p>
                  </Col>
                  <Col xs="3" md="2" className="text-right">
                    <Button 
                      onClick={handlerNewAccount}
                      size="sm"
                      className="mt-2 btn-fill"
                      type="button"
                      variant="primary">Add Account</Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Account Number</th>
                      <th className="border-0">Bank</th>
                      <th className="border-0">Balance</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    { accounts.map((account) => 
                      <tr key={account.id}>
                          <td>{account.bank.name === '---' ? 'Cash' : account.numberAccount}</td>
                          <td>{account.bank.name}</td>
                          <td>{account.currency.symbol} {account.balance}</td>
                          <td>
                              <Button 
                                onClick={() => handleClick(account.id)}
                                size="sm"
                                className="btn-fill pull-right"
                                type="button"
                                variant="danger">View</Button>
                          </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        { newAccountForm ?
          <Row>
            <Col>
              <NewAccountForm/>
            </Col>
          </Row>
          : null
        }
      </Container>
    </>
  )
}
