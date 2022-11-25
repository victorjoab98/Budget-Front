import React from 'react'
import { Button, Card, Col, Container, Dropdown, Form, ListGroup, ModalTitle, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useAppSelector } from 'hooks/reduxHooks';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useForm } from 'hooks/useForm';
import { LastRecordList } from 'components/Records/RecordList';
import { RecordsListByAccount } from 'components/Records/RecordList';
import { RecordsListByBank } from 'components/Records/RecordList';

export const Records = () => {
  
  const accounts = useAppSelector( state => state.user.accounts );
  const banks = useAppSelector( state => state.app.banks );
  const [ values, , handleInputChange ] = useForm({ accountId: 'all', bankId: 'default'});
  const [ showModal, setShowModal ] = React.useState({ show: false, type: ''});
  const [ typeFilter, setTypeFilter ] = React.useState({ type: 'lastRecords' });

  const handleFilterChange = ( filter ) => {
    setShowModal({ show: true, type: filter });
  };

  const handlerFilter = () => {

    if( showModal.type === 'account' ){
      if( values.accountId === 'all' ){
        setTypeFilter({ type: 'lastRecords' });
      }else{
        setTypeFilter({ type: 'byAccount', accountId: values.accountId });
      }
    }else{
      setTypeFilter({ type: 'byBank', bankId: values.bankId });
    }


    setShowModal({ show: false, type: '' });
  };

  const navigate = useNavigate();
  
  const handlerNewRecord = () => {
    navigate('new')
  }

  return (
    <Container fluid>
      <Card>
        <Card.Header>
          <Row>
            <Col xs="6" md="2">
              <Card.Title as="h4">Records</Card.Title>
              <p className="card-category">
              Your records
              </p>
            </Col>
            <Col xs="5" md="10" className="text-right">
              <Button 
                onClick={handlerNewRecord}
                size="sm"
                className="mt-2 btn-fill"
                type="button"
                variant="primary">Add Record</Button>
              <Dropdown className="mt-1 mb-3">
                <Dropdown.Toggle size="sm" className="btn-fill" variant="warning" id="dropdown-basic">
                  Filter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleFilterChange('account')}>By Account</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleFilterChange('bank') }>By Bank</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Header>
      </Card>

      { typeFilter.type === 'lastRecords' && <LastRecordList /> }
      { typeFilter.type === 'byAccount' && <RecordsListByAccount accountId={ typeFilter.accountId } /> }
      { typeFilter.type === 'byBank' && <RecordsListByBank bankId={  typeFilter.bankId } /> }
    
      <Modal isOpen={showModal.show} toggle={() => setShowModal(prev => ({ ...prev, show: false }))}>
        <ModalHeader className='pt-1'>
          <ModalTitle>Filter your records</ModalTitle>
        </ModalHeader>
        <ModalBody className="px-4 pt-1 pb-4">
          <Row>
            <Col md="12">
              { showModal.type === 'account' && 
                <Form.Group>
                  <label>Account</label>
                  <Form.Control
                    name="accountId"
                    value={values.accountId}
                    onChange={handleInputChange}
                    as="select">
                      <option key="all" value="all">All my acounts</option>
                      { accounts.map((account) => (
                        <option key={account.id} value={account.id}>{account.numberAccount} - {account.bank.name}</option>
                      ))}
                  </Form.Control>
                </Form.Group>
              }
              { showModal.type === 'bank' &&
                  <Form.Group>
                    <label>Banks</label>
                    <Form.Control
                      name="bankId"
                      value={values.bankId}
                      onChange={handleInputChange}
                      as="select">
                        <option key="default" value="default" >Please select the bank</option>
                        { banks.map((bank) => (
                          <option key={bank.id} value={bank.id}>{bank.name}</option>
                        ))}
                    </Form.Control>
                  </Form.Group>
              }
            </Col>
          </Row>
          <Row>
            <Col className='mt-3  text-right'>
              <Button
                onClick={handlerFilter} 
                className="btn-fill">Filter</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Container>
  )
}
