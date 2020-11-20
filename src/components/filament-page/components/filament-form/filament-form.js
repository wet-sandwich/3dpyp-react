import React, {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import { MaterialSelect, SizeSelect } from '../../../dropdowns';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function FilamentForm({title, id, submitForm}) {
  const [dataLists, setDataLists] = useState({brand: [], color: []});
  const [filament, setFilament] = useState({
    name: "",
    brand: "",
    material: "",
    color: "",
    cost: "",
    size: "",
    printMinTemp: "",
    printMaxTemp: "",
    bedMinTemp: "",
    bedMaxTemp: "",
  });

  useEffect(() => {
    DatabaseAPI.filamentDatalist(["brand", "color"], (data) => setDataLists(data));

    if (typeof id !== 'undefined') {
      DatabaseAPI.getFilament(id, (data) => {
        setFilament({
          name: data.name,
          brand: data.brand,
          material: data.material,
          color: data.color,
          cost: data.cost,
          size: data.size,
          printMinTemp: data.printTemp[0],
          printMaxTemp: data.printTemp[1],
          bedMinTemp: data.bedTemp[0],
          bedMaxTemp: data.bedTemp[1],
        });
      });
    }
  }, [id]);

  function updateInput(event) {
    const {value, name} = event.target;
    setFilament(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function submit(event) {
    event.preventDefault();
    submitForm(filament);
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="m-4">
        <h1>{title}</h1>
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="mr-2">Brand
              <input className="form-control" autoComplete="off" type="text" list="brands" required name="brand" value={filament.brand} onChange={updateInput}/>
              <datalist id="brands">
                { dataLists.brand.map(item => (<option key={uuidv4()} value={item}/>)) }
              </datalist>
            </label>
            <label>Name
              <input className="form-control"  autoComplete="off" type="text" name="name" value={filament.name || ""} onChange={updateInput}/>
            </label>
          </div>

          <div className="form-group">
            <MaterialSelect value={filament.material} onChange={updateInput} />
          </div>

          <div className="form-group">
            <SizeSelect value={filament.size} onChange={updateInput} />
          </div>

          <div className="form-group">
            <label>Color
              <input className="form-control" autoComplete="off" type="text" list="colors" required name="color" value={filament.color} onChange={updateInput}/>
              <datalist id="colors">
                { dataLists.color.map(item => (<option key={uuidv4()} value={item}/>)) }
              </datalist>
            </label>
          </div>

          <div className="form-group">
            <label>Cost (per kg)
              <input className="form-control" type="number" required name="cost" value={filament.cost} onChange={updateInput}/>
            </label>
          </div>

          <div className="form-group">
            <label className="mr-2">Print Temperature (&deg;C)
              <input className="form-control" type="number" required name="printMinTemp" value={filament.printMinTemp} onChange={updateInput}/>
            </label>
            <div className="mr-2 d-inline-block">to</div>
            <label>
              <input className="form-control" type="number" name="printMaxTemp" value={filament.printMaxTemp} onChange={updateInput}/>
            </label>
          </div>

          <div className="form-group">
            <label className="mr-2">Bed Temperature (&deg;C)
              <input className="form-control" type="number" required name="bedMinTemp" value={filament.bedMinTemp ?? ''} onChange={updateInput}/>
            </label>
            <div className="mr-2 d-inline-block">to</div>
            <label>
              <input className="form-control" type="number" name="bedMaxTemp" value={filament.bedMaxTemp ?? ''} onChange={updateInput}/>
            </label>
          </div>

          <button type="submit" name="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
}
