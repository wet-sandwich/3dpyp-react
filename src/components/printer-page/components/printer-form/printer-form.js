import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SizeSelect } from '../../../dropdowns';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function PrinterForm({title, id, submitForm}) {
  const type_options = ["FFF", "SLA"];
  const motion_options = ["Cartesian", "Delta", "CoreXY", "Polar"];
  const drive_options = ["Direct", "Bowden"];

  const [printer, setPrinter] = useState({
    name: "",
    make: "",
    life: "",
    cost: "",
    type: type_options[0],
    motion: motion_options[0],
    maxBedTemp: "",
    drive: drive_options[0],
    size: "",
    maxPrintTemp: "",
  });

  useEffect(() => {
    if (typeof id !== 'undefined') {
      DatabaseAPI.getPrinter(id, (data) => {
        setPrinter({
          name: data.name,
          make: data.make,
          life: data.life,
          cost: data.cost,
          type: data.type,
          motion: data.motion,
          maxBedTemp: data.maxBedTemp,
          drive: data.drive,
          size: data.size,
          maxPrintTemp: data.maxPrintTemp,
        });
      });
    }
  }, [id]);

  function updateInput(event) {
    const {value, name} = event.target;

    setPrinter(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function submit(event) {
    event.preventDefault();
    submitForm(printer);
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="m-4">
        <h1>{title}</h1>
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="mr-2">Name
              <input className="form-control" type="text" required name="name" value={printer.name} onChange={updateInput}/>
            </label>
            <label>Make
              <input className="form-control" type="text" required name="make" value={printer.make} onChange={updateInput}/>
            </label>
          </div>

          <div className="form-group">
            <label className="mr-2">Cost
              <input className="form-control" type="number" required name="cost" value={printer.cost} onChange={updateInput}/>
            </label>
            <label>Life (in hours)
              <input className="form-control" type="number" required name="life" value={printer.life} onChange={updateInput}/>
            </label>
          </div>

          <div className="form-group">
            <label>Printer type:
              <select className="form-control" name="type" value={printer.type} onChange={updateInput}>
                { type_options.map(item => (<option key={uuidv4()} value={item}>{item}</option>)) }
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>Printer motion:
              <select className="form-control" name="motion" value={printer.motion} onChange={updateInput}>
                { motion_options.map(item => (<option key={uuidv4()} value={item}>{item}</option>)) }
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>Filament feed type:
              <select className="form-control" name="drive" value={printer.drive} onChange={updateInput}>
                { drive_options.map(item => (<option key={uuidv4()} value={item}>{item}</option>)) }
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>Max Bed Temperature (&deg;C)
              <input className="form-control" type="number" name="maxBedTemp" value={printer.maxBedTemp ?? ''} onChange={updateInput}/>
            </label>
          </div>

          <h3>Hotend</h3>
          <hr/>
          <div className="form-group">
            <SizeSelect value={printer.size} onChange={updateInput} />
            <label>Max Print Temp. (&deg;C)
              <input className="form-control" type="number" required name="maxPrintTemp" value={printer.maxPrintTemp} onChange={updateInput}/>
            </label>
          </div>

          <button type="submit" name="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
}
