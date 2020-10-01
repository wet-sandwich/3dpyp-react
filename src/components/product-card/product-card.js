import React from 'react';
import './product-card.css';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function ProductCard(props) {

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 d-flex">
      <div className="card flex-fill mb-4">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <ul>
            { props.body.map(item => (<li key={uuidv4()} className="card-text">{item}</li>)) }
          </ul>
        </div>
        <div className="edit-delete">
          <Link to={props.updateUrl}><FontAwesomeIcon icon={faEdit} className="button" /></Link>
          <span className="mr-2"></span>
          <FontAwesomeIcon icon={faTrashAlt} className="button" onClick={() => props.deleteItem(props.id)} />
        </div>
      </div>
    </div>
  );
}
