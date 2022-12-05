import React from 'react'
import { Button, Card, Col, Container, Dropdown, Form, ModalTitle, Row } from 'react-bootstrap'
import moment from 'moment';
import validator from 'validator';
import { useAppSelector } from 'hooks/reduxHooks';
import { FormFeedback, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useForm } from 'hooks/useForm';
import { LastRecordList } from 'components/Records/RecordList';
import { RecordsListByAccount } from 'components/Records/RecordList';
import { RecordsListByBank } from 'components/Records/RecordList';
import { isObjectEmpy } from 'utils/helpers';

export const Records = () => {
  
  const accounts = useAppSelector( state => state.user.accounts );
  const banks = useAppSelector( state => state.app.banks );
  const [ values, , handleInputChange ] = useForm({ 
    accountId: 'all', 
    bankId: 'default',
    date1: '',
    date2: '', });
  const [ errors, setErrors ] = React.useState({});
  const [ dates, setDates ] = React.useState({ date1: '', date2: '' });
  const [ showModal, setShowModal ] = React.useState({ show: false, type: ''});
  const [ typeFilter, setTypeFilter ] = React.useState({ type: 'lastRecords' });

  const handleFilterChange = ( filter ) => {
    setShowModal({ show: true, type: filter });
  };

  const handlerFilter = () => {

    setErrors({});
    const validations = checkDates();
    if( !isObjectEmpy( validations ) ){
      setErrors( validations );
      return;
    }   

    let obj = values.date1 !== '' ? { date1: values.date1, date2: values.date2 } : {};
    if( showModal.type === 'account' ){
      if( values.accountId === 'all' ){
        setTypeFilter({ ...obj, type: 'lastRecords' });
      }else{
        setTypeFilter( { ...obj, type: 'byAccount', accountId: values.accountId } );
      }
    }else if (showModal.type === 'bank'){
      setTypeFilter({ ...obj, type: 'byBank', bankId: values.bankId });
    }

    setDates({
      date1: values.date1,
      date2: values.date2
    });

    setShowModal({ show: false, type: '' });
  };

  

  const checkDates = () => {
    const errors = {};

    if (showModal.type === 'bank'){
      if( values.bankId === 'default' ){
        errors.bankId = 'You have to select a bank.';
      }
    }

    if( values.date2 !=='' && (values.date1 === '' || !validator.isDate( values.date1 ) )  ){
      errors.date1 = 'Initial date is not valid';
    }else if( moment( values.date1 ).isAfter( values.date2 ) ){
        errors.date1 = 'Initial date can not be greater than final date.';
    }

    if( values.date1 !=='' && (values.date2 === '' || !validator.isDate( values.date2 ) ) ){
      errors.date2 = 'Final date is not valid';
    }else if( moment( values.date2 ).isAfter( new Date() ) ){
        errors.date2 = 'Final Date can not be greater than today.';
    }


    return errors;
  }

  return (
    <Container fluid>
      <Card>
        <Card.Header>
          <Row className='mb-3 mx-1'>
            <Col xs="6" md="2">
              <Card.Title as="h4">Records</Card.Title>
              <p className="card-category">
              Your records
              </p>
            </Col>
            <Col xs="5" md="10" className="text-right">
              <Dropdown className="mt-1 mb-3">
                <Dropdown.Toggle size="sm" className="btn-fill" variant="warning" id="dropdown-basic">
                  FILTER
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item active={typeFilter.type === 'byAccount'} onClick={() => handleFilterChange('account')}>By Account</Dropdown.Item>
                  <Dropdown.Item active={typeFilter.type === 'byBank'} onClick={() => handleFilterChange('bank') }>By Bank</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Header>
      </Card>

      { typeFilter.type === 'lastRecords' && <LastRecordList date1={dates.date1} date2={dates.date2}/> }
      { typeFilter.type === 'byAccount' && <RecordsListByAccount accountId={ typeFilter.accountId } date1={dates.date1} date2={dates.date2}/> }
      { typeFilter.type === 'byBank' && <RecordsListByBank bankId={  typeFilter.bankId } date1={dates.date1} date2={dates.date2}/> }
    
      <Modal isOpen={showModal.show} toggle={() => setShowModal(prev => ({ ...prev, show: false }))}>
        <ModalHeader className='pt-1'>
          <ModalTitle>Filter your records</ModalTitle>
        </ModalHeader>
        <ModalBody className="px-4 pt-1 pb-4">
          
              { showModal.type === 'account' && 
                <Row>
                <Col md="12">
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
                </Col>
                </Row>
              }
              { showModal.type === 'bank' &&
              <Row>
                <Col md="12">
                  <Form.Group>
                    <label>Banks</label>
                    <Form.Control
                      name="bankId"
                      value={values.bankId}
                      onChange={handleInputChange}
                      as="select"
                      isInvalid={!!errors.bankId}>
                        <option key="default" value="default" disabled >Please select the bank</option>
                        { banks.map((bank) => (
                          <option key={bank.id} value={bank.id}>{bank.name}</option>
                        ))}
                    </Form.Control>
                    <FormFeedback>{errors.bankId}</FormFeedback>
                  </Form.Group>
                  </Col>
              </Row>
              }
              <hr/>
              <label className='mt-3 text-muted'>
                Select an initial and final date if you want filter by date.
              </label>
              <Row >
                
                <Col md="6">
                  <Form.Group>
                    <label>Initial Date</label>
                    <Form.Control
                      name="date1"
                      value={values.date1}
                      onChange={handleInputChange}
                      type="date"
                      isInvalid={!!errors.date1}
                      />
                      <FormFeedback>{ errors.date1 }</FormFeedback>

                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group>
                    <label>Final Date</label>
                    <Form.Control
                      name="date2"
                      value={values.date2}
                      onChange={handleInputChange}
                      type="date"
                      isInvalid={!!errors.date2}
                      />
                    <FormFeedback>{ errors.date2 }</FormFeedback>
                  </Form.Group>
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
