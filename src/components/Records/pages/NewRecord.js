import { useAppSelector } from 'hooks/reduxHooks';
import React, { useState } from 'react'
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap';
import { NewRecordCard } from '../NewRecordCard';
import { NewTransferCard } from '../NewTransferCard';

export const NewRecord = () => {

  const [ activeTypeRecord, setActiveTypeRecord ] = useState('Income');
  const recordTypes = useAppSelector( state => state.app.recordTypes );


  const onClick = ( e )=>{
    const { name } = e.target;
    setActiveTypeRecord(name);
  }

  return (
    <div className="content">
      <Row>
        <Col>
          <Card>
            <Card.Header className="p-3">
              <Row style={{ justifyContent: 'center'}}>
                <ButtonGroup>
                  {
                    recordTypes.map( (recordType) => (
                      <Button
                        key={ recordType.id } 
                        name={recordType.name}
                        onClick={onClick}
                        active={ activeTypeRecord === recordType.name ? true : false }>
                        {recordType.name}
                      </Button>
                    ))
                  }
                </ButtonGroup>
              </Row>
            </Card.Header>
          </Card>
        </Col>
      </Row>
      {
        activeTypeRecord === 'Income' || activeTypeRecord === 'Expense' 
            ? <NewRecordCard recordType={activeTypeRecord} /> : null
      }
      {
        activeTypeRecord === 'Transfer' && <NewTransferCard /> 
      }
      
    </div>
  )
}
