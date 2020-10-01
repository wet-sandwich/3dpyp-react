import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ColorSelect(props) {
  return (
    <label className="mr-4">Color:
      <select className="form-control" name="color" value={props.value} onChange={props.onChange}>
        <option key={uuidv4()} value="">All</option>
        { props.colors.map(item => (<option key={uuidv4()} value={item}>{item}</option>)) }
      </select>
    </label>
  );
}
