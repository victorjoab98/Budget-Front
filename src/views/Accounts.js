import React, { useEffect } from 'react'

import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'

import { useAppSelector } from 'hooks/reduxHooks';
import { useAppDispatch } from 'hooks/reduxHooks'
import { getAccountsThunk } from 'store/userAccount';
import { NewAccountForm } from 'components/Accounts/NewAccountForm';
import { useNavigate } from 'react-router';
import { AccountList } from 'components/Accounts/AccountList';

export const Accounts = () => {

  const accounts = useAppSelector((state) => state.user.accounts);
  const [ newAccountForm, setNewAccountForm ] = React.useState(false);
  

  const handlerNewAccount = () => {
    setNewAccountForm(!newAccountForm);
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
                <AccountList accounts={accounts} />
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
