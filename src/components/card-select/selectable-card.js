import React from 'react';
import {v4 as uuidv4} from 'uuid';
import './selectable-card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function SelectableCard(props) {

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 d-flex">
      <input type="radio" id={props.id} name={props.name} value={props.id} checked={props.selected && !props.disable} onChange={props.handleOnChange} disabled={props.disable}/>
      <label htmlFor={props.id} className="flex mb-4 flex-fill radio-card no-select">
          <h5 className="title"><strong>{props.title}</strong></h5>
          <ul className="detail">
            {props.body.map(item => (<li key={uuidv4()} className="detail-text">{item}</li>))}
          </ul>
          { (props.selected && !props.disable) ? (<FontAwesomeIcon icon={faCheckCircle} color="#FB8B24" size="2x" className="check" />) : ""}
      </label>
    </div>);
}
