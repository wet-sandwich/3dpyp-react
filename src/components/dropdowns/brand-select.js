import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function BrandSelect(props) {
  return (
    <label className="mr-4">Brand:
      <select className="form-control" name="brand" value={props.value} onChange={props.onChange}>
        <option key={uuidv4()} value="">All</option>
        { props.brands.map(item => (<option key={uuidv4()} value={item}>{item}</option>)) }
      </select>
    </label>
  );
}
