import React from 'react'
import { Alert, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { withLastRecords } from './HOCS/withLastRecords';
import { withRecordsByAccount } from './HOCS/withRecordsByAccount';
import { withRecordsByBank } from './HOCS/withRecordsByBank';
import { RecordItem } from './RecordItem';

const RecordList = ({ title, records, pagination }) => {

  const navigate = useNavigate();

  const handlerNewRecord = () => {
    navigate('/budget/records/new')
  }

  return (
    <Card>
        <Card.Header>
          <Row className='mt-2 mb-2 mx-1'>
            <Col xs="6" md="2">
              <Card.Title as="h4">{title}</Card.Title>
            </Col>
            <Col xs="6" md="10" className="text-right">
              <Button
                onClick={handlerNewRecord}
                size="sm"
                className="btn-fill"
                type="button"
                variant="primary">Add Record</Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className='mx-1'>
            <Col md="12">
              { records.length > 0 ?
                <ListGroup>
                  {
                    records.map( ({account_ref, category_ref, ...record}) => (
                      <RecordItem 
                          key={record.id} 
                          account_ref={account_ref} 
                          category_ref={category_ref} 
                          record={record} />
                    ))
                  }
                </ListGroup>
              :
                <Alert>There are not records.</Alert>
              }
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
            { pagination }
        </Card.Footer>
      </Card>
  )
}

export const LastRecordList = withLastRecords(RecordList);
export const RecordsListByAccount = withRecordsByAccount(RecordList);
export const RecordsListByBank = withRecordsByBank(RecordList);