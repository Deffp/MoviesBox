import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Pagination.css';

export default class Pagination extends Component {
  createPagination = (page) => {
    const previousPage = `${page <= 1 ? 1 : page - 1}`;
    const nextPage = `${page + 1}`;
    const prevPage = page <= 3;

    return (
      <div className="pagination">
        <Link to={previousPage} className="text-btn">
          <li className="btn-pagination col">{'<'}</li>
        </Link>
        <Link className="text-btn" to={`/page/${prevPage ? 1 : page - 2}`}>
          <li className="btn-pagination col">{page <= 2 ? 1 : page - 2}</li>
        </Link>
        <Link className="text-btn" to={`/page/${prevPage ? 2 : page - 1}`}>
          <li className="btn-pagination col">{page <= 2 ? 2 : page - 1}</li>
        </Link>
        <div className="text-btn">
          <li className="btn-pagination col">
            {' '}
            {prevPage ? (
              <Link className="text-btn" to="/page/3">
                {' '}
                3
              </Link>
            ) : (
              <Link to={`${page}`} className="text-btn">
                ...
              </Link>
            )}
          </li>
        </div>
        <Link className="text-btn" to={`/page/${prevPage ? 4 : page + 1}`}>
          <li className="btn-pagination col">{page <= 3 ? 4 : page + 1}</li>
        </Link>
        <Link className="text-btn" to={`/page/${prevPage ? 5 : page + 2}`}>
          <li className="btn-pagination col">{page <= 3 ? 5 : page + 2}</li>
        </Link>
        <Link to={`/page/${nextPage}`} className="text-btn">
          <li className="btn-pagination col">{'>'}</li>
        </Link>
      </div>
    );
  };

  render() {
    const { location } = this.props;

    const page = location.match.params.page ? location.match.params.page : 1;
    return <ul className="row Pagination justify-content-center">{this.createPagination(parseInt(page, 10))}</ul>;
  }
}
