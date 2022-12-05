import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router';

export const AccountList = ({ accounts }) => {

  const navigate = useNavigate();

  const handleClick = (id)=> {
    navigate(`/budget/accounts/${id}`);
  }

  return (
    <Table className="table-hover table-striped" responsive>
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
  )
}
