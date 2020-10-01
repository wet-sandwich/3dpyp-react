import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function SizeSelect(props) {
  const size_options = [1.75, 2.85];

  return (
    <label className="mr-4">Size(mm):
      <select className="form-control" name="size" value={props.value} onChange={props.onChange}>
        <option key={uuidv4()} value="">{props.firstOption}</option>
        { size_options.map(item => (<option key={uuidv4()} value={item}>{item}</option>)) }
      </select>
    </label>
  );
}

SizeSelect.defaultProps = {
  firstOption: "-Select one-",
};
