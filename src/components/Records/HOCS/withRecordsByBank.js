import { useAppSelector } from 'hooks/reduxHooks';
import React, { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate"
import { getRecordsByBank } from 'store/userAccount';
import { limitPaginationForRecords } from 'utils/constants';

function withRecordsByBank(RecordList){
  return function LisRecordsWithRecordsByBank({ bankId }){

    const { id } = useAppSelector( state => state.user.user );
    const [ records, setRecords] = useState([]);
    const [ totalPages, setTotalPages ] = useState(0);

    useEffect(() => {
      getRecordsByBank( id, bankId, limitPaginationForRecords, 0 )
      .then( res => {
        setRecords(res.data.records);
        setTotalPages(res.data.totalPages);
      }).catch( err => {
        console.log(err);
      })
    }, [bankId]);

    const handlePageClick = async (data) => {
      let currentPage = data.selected + 1;  
      getRecordsByBank( id, bankId, limitPaginationForRecords, (currentPage - 1) * limitPaginationForRecords )
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
      <RecordList title="Your last Records" records={records} pagination={pagination} />
    )
}}

export { 
  withRecordsByBank
};
