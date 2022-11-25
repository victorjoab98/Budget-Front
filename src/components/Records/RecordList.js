import React from 'react'
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import { withLastRecords } from './HOCS/withLastRecords';
import { withRecordsByAccount } from './HOCS/withRecordsByAccount';
import { withRecordsByBank } from './HOCS/withRecordsByBank';
import { RecordItem } from './RecordItem';

const RecordList = ({ title, records, pagination }) => {
  return (
    <Card>
        <Card.Header>
          <Card.Title as="h4">{ title }</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md="12">
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