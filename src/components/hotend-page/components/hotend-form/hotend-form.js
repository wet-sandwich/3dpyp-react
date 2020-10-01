import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SizeSelect } from '../../../dropdowns';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function HotendForm(props) {
  const heatbreak_options = ["Metal", "PTFE"];

  const [hotend, setHotend] = useState({
    name: "",
    make: "",
    size: "",
    heatbreak: heatbreak_options[0],
    maxTemp: "",
  });

  useEffect(() => {
    if (typeof props.id !== 'undefined') {
      DatabaseAPI.getHotend(props.id, (data) => {
        setHotend({
          name: data.name,
          make: data.make,
          size: data.size,
          heatbreak: data.heatbreak,
          maxTemp: data.maxTemp,
        });
      });
    }
  }, [props.id]);

  function updateInput(event) {
    const {value, name} = event.target;

    setHotend(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function submit(event) {
    event.preventDefault();
    props.submitForm(hotend);
  }

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label className="mr-2">Name
          <input className="form-control" type="text" required name="name" value={hotend.name} onChange={updateInput}/>
        </label>
        <label>Make
          <input className="form-control" type="text" required name="make" value={hotend.make} onChange={updateInput}/>
        </label>
      </div>

      <div className="form-group">
        <label>Max Temperature (&deg;C)
          <input className="form-control" type="number" required name="maxTemp" value={hotend.maxTemp} onChange={updateInput}/>
        </label>
      </div>

      <div className="form-group">
        <SizeSelect value={hotend.size} onChange={updateInput} />
      </div>

      <div className="form-group">
        <label>Heatbreak:
          <select className="form-control" name="heatbreak" value={hotend.heatbreak} onChange={updateInput}>
            { heatbreak_options.map(item => (<option key={uuidv4()} value={item}>{item}</option>)) }
          </select>
        </label>
      </div>

      <button type="submit" name="submit" className="btn btn-primary">Save</button>

    </form>
  );
}
