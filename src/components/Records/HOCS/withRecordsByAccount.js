import React, { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate"
import { getRecordsByAccounId } from 'store/userAccount';
import { limitPaginationForRecords } from 'utils/constants';

function withRecordsByAccount(RecordList){
  return function LisRecordsWithRecordsByAccount({ accountId, date1, date2 }){

    const [ records, setRecords] = useState([]);
    const [ totalPages, setTotalPages ] = useState(0);

    useEffect(() => {
      getRecordsByAccounId( accountId, date1, date2, limitPaginationForRecords, 0 )
      .then( res => {
        setRecords(res.data.records);
        setTotalPages(res.data.totalPages);
      }).catch( err => {
        console.log(err);
      })
    }, [accountId, date1, date2]);

    const handlePageClick = async (data) => {
      let currentPage = data.selected + 1;  
      getRecordsByAccounId( accountId, date1, date2, limitPaginationForRecords, ( currentPage - 1 ) * limitPaginationForRecords )
      .then( res => {
        setRecords(res.data.records);
      }).catch( err => {
        console.log(err);
      })
    };

    const pagination = 
    <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={"..."}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />

    return (
      <RecordList title="Records By Account" records={records} pagination={pagination} />
    )
}}

export { 
  withRecordsByAccount
};
