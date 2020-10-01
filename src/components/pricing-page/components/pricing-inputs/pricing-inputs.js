import React, { useState, useEffect, Fragment } from 'react';
import { CardSelect, SelectableCard } from '../../../card-select';
import PriceDisplay from '../price-display';
import { MaterialSelect, SizeSelect, BrandSelect, ColorSelect } from '../../../dropdowns';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function PricingInputs() {
  const [sizeFilter, setSizeFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [printers, setPrinters] = useState([]);
  const [filament, setFilament] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState('');
  const [selectedFilament, setSelectedFilament] = useState('');
  const [filamentAmount, setFilamentAmount] = useState('');
  const [printTime, setPrintTime] = useState('');
  const [maintenancePercentage, setMaintenancePercentage] = useState('');
  const [printPrice, setPrintPrice] = useState(0);
  const [dataLists, setDataLists] = useState({brand: [], color: []});

  useEffect(() => {
    DatabaseAPI.getPrinters((data) => setPrinters(data));
    DatabaseAPI.getFilaments((data) => setFilament(data));
    DatabaseAPI.filamentDatalist(["brand", "color"], (data) => setDataLists(data));
  }, []);

  useEffect(() => {
    let deprCost = (selectedPrinter.cost / selectedPrinter.life * printTime) || 0;
    let filamentCost = (selectedFilament.cost * filamentAmount / 1000) || 0;
    let maintCost = deprCost * maintenancePercentage / 100;
    setPrintPrice(deprCost + filamentCost + maintCost);
  }, [selectedFilament, selectedPrinter, filamentAmount, printTime, maintenancePercentage]);

  function filamentList() {
    return filament.map(doc => {
      if ((doc.size.toString() === sizeFilter || sizeFilter === "") &&
          (doc.material === materialFilter || materialFilter === "") &&
          (doc.brand === brandFilter || brandFilter === "") &&
          (doc.color === colorFilter || colorFilter === "")) {
        let details = [
          `${doc.brand} ${doc.name ?? ""}`,
          `$${doc.cost.toFixed(2)}/kg`,
          `${doc.size}mm`,
        ];
        return (
          <SelectableCard
            key={doc._id}
            id={doc._id}
            name={'filament'}
            title={`${doc.color} ${doc.material}`}
            body={details}
            selected={selectedFilament._id === doc._id}
            handleOnChange={() => setSelectedFilament(filament.find(item => item._id === doc._id))}
          />
        );
      } else {
        return null;
      }
    });
  }

  function printerList() {
    return printers.map(doc => {
      let details = [
        `${(doc.cost/doc.life).toFixed(3)} $/hr`,
        `${doc.type} | ${doc.motion} | ${doc.drive}`,
        <Fragment>{doc.hotend.maxTemp}&deg;C / {doc.maxBedTemp}&deg;C</Fragment>,
      ];
      return (
        <SelectableCard
          key={doc._id}
          id={doc._id}
          name={'printer'}
          title={doc.make + " " + doc.name}
          body={details}
          selected={selectedPrinter._id === doc._id}
          handleOnChange={(e) => setSelectedPrinter(printers.find(item => item._id === doc._id))}
        />
      );
    });
  }

  return (
    <div className="container">
      <PriceDisplay price={printPrice} />
      <br/>
      <h2>Filament</h2>
      <hr/>
      <div className="form-group">
        <MaterialSelect firstOption={"All"} value={materialFilter} onChange={(e) => setMaterialFilter(e.target.value)} />
        <BrandSelect value={brandFilter} brands={dataLists.brand} onChange={(e) => setBrandFilter(e.target.value)} />
        <ColorSelect value={colorFilter} colors={dataLists.color} onChange={(e) => setColorFilter(e.target.value)} />
        <SizeSelect firstOption={"All"} value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)} />
      </div>
      <CardSelect cards={filamentList().filter(item => item !== null)} />
      <br/>
      <h2>Printer</h2>
      <hr/>
      <CardSelect cards={printerList()} />
      <br/>
      <h2>Print</h2>
      <hr/>
      <div className="form-group">
        <label>Filament Used
          <input className="form-control" type="number" name="filamentUsed" value={filamentAmount} placeholder="grams" min="0" onChange={(e) => setFilamentAmount(e.target.value)}/>
        </label>
      </div>
      <div className="form-group">
        <label>Print Time
          <input className="form-control" type="number" name="printTime" value={printTime} placeholder="hours" min="0" onChange={(e) => setPrintTime(e.target.value)}/>
        </label>
      </div>
      <br/>
      <h2>Overhead</h2>
      <hr/>
      <div className="form-group">
        <label>Maintenance
          <input className="form-control" type="number" name="maintenance" value={maintenancePercentage} placeholder="percentage" min="0" max="100" onChange={(e) => setMaintenancePercentage(e.target.value)}/>
        </label>
      </div>
    </div>
  );
}
