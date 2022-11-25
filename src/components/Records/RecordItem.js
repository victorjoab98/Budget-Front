import React from 'react'
import { ListGroup } from 'react-bootstrap'
import moment from 'moment';

export const RecordItem = ({ record, account_ref, category_ref }) => {
  return (
    <ListGroup.Item key={record.id} className='py-1'style={{ display: 'flex', justifyContent: 'space-between'}}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
        <div className="mr-3">
            <i className={`nc-icon ${ category_ref.type === 'Income'? 'nc-simple-add' : 'nc-simple-delete'}`}/>
        </div>
        <div>
        <p className='mb-0'>
            {category_ref.name}
        </p>
        <label>{account_ref.numberAccount} - {account_ref.bank.name}</label>
        </div>
        </div>
        <div>
        <p className={` mb-0 ${ category_ref.type === 'Income'? 'text-success' : 'text-danger'}`}><strong>{account_ref.currency.symbol} {record.amount}</strong></p>
        <label>{ moment( record.createdAt ).format('MM/DD/YYYY') }</label>
        </div>
    </ListGroup.Item>
  )
}
