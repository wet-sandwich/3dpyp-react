import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductList(props) {
  return (
    <div className="container mt-4">
      <h1 className="d-inline-block mb-4">{props.name} List</h1>
      <Link to={props.newProductUrl}><div className="btn btn-primary mx-4 align-text-bottom">Add {props.name}</div></Link>
      <div className="row">
        { props.products }
      </div>
    </div>
  );
}
