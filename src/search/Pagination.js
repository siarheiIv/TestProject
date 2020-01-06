import React from 'react';

const Pagination = (props) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.data.searchResult.length / props.data.recordsPerPage); i++) {
    pageNumbers.push(i);
  }  

  return (
  // <div>{props.data.currentPage}</div>
  <nav>
    <ul className="pagination">
      {pageNumbers.map(pageNumber => (
        <li className={props.data.currentPage === pageNumber ? 'active-page page-item': 'page-item'} key={pageNumber}>
          <a onClick={() => props.paginate(pageNumber)} className="page-link">{pageNumber}</a>
        </li>
      ))}
    </ul>
  </nav>
  )
}

export default Pagination;