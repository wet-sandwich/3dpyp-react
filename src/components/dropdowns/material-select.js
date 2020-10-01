import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function MaterialSelect(props) {
  const material_options = [
    "PLA",
    "PETG",
    "ABS",
    "Carbon Fiber",
    "TPE",
    "Nylon",
    "PC",
    "Wood",
    "Metal",
    "HIPS",
    "PVA",
    "ASA",
    "PP",
    "FPE"
  ];

  return (
    <label className="mr-4">Material:
      <select className="form-control" name="material" value={props.value} onChange={props.onChange}>
        <option key={uuidv4()} value="">{props.firstOption}</option>
        { material_options.map(item => (<option key={uuidv4()} value={item}>{item}</option>)) }
      </select>
    </label>
  );
}

MaterialSelect.defaultProps = {
  firstOption: "-Select one-",
};
