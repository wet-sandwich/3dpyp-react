import React, { useState, useEffect, Fragment } from 'react';
import { CardSelect, SelectableCard } from '../../../card-select';
import PriceDisplay from '../price-display';
import { MaterialSelect, SizeSelect, BrandSelect, ColorSelect } from '../../../dropdowns';
import { useFilters, useSelection, usePrintPrice } from './hooks';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function PricingInputs() {
  const [filtersState, {setFilter, resetFilters}] = useFilters();
  const [selectionState, {setSelectedPrinter, setSelectedFilament, minPrintTemp, minBedTemp}] = useSelection();
  const [printers, setPrinters] = useState([]);
  const [filament, setFilament] = useState([]);
  const [printPrice, {totalPrice, updatePrice}] = usePrintPrice();
  const [filamentAmount, setFilamentAmount] = useState("");
  const [printTime, setPrintTime] = useState("");
  const [overhead, setOverhead] = useState({maintenance: "", failRate: ""});
  const [dataLists, setDataLists] = useState({brand: [], color: []});

  useEffect(() => {
    DatabaseAPI.getPrinters((data) => setPrinters(data));
    DatabaseAPI.getFilaments((data) => setFilament(data));
    DatabaseAPI.filamentDatalist(["brand", "color"], (data) => setDataLists(data));
  }, []);

  useEffect(() => {
    updatePrice({
      filament: selectionState.filament,
      amount: filamentAmount,
      printer: selectionState.printer,
      time: printTime,
      overhead: overhead,
    });
  }, [selectionState.filament, selectionState.printer, filamentAmount, printTime, overhead]);

  function updateOverhead(event) {
    const {name, value} = event.target;
    setOverhead(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function filamentList() {
    return filament.map(doc => {
      if ((doc.size.toString() === filtersState.size || filtersState.size === "") &&
          (doc.material === filtersState.material || filtersState.material === "") &&
          (doc.brand === filtersState.brand || filtersState.brand === "") &&
          (doc.color === filtersState.color || filtersState.color === "")) {
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
            selected={selectionState.filament._id === doc._id}
            handleOnChange={() => setSelectedFilament(doc)}
          />
        );
      } else {
        return null;
      }
    }).filter(item => item !== null);
  }

  function printerList() {
    return printers.map(doc => {
      let details = [
        `${(doc.cost/doc.life).toFixed(3)} $/hr`,
        `${doc.type} | ${doc.motion} | ${doc.drive}`,
        <Fragment>{doc.maxPrintTemp}&deg;C / {doc.maxBedTemp}&deg;C</Fragment>,
      ];
      return (
        <SelectableCard
          key={doc._id}
          id={doc._id}
          name={'printer'}
          title={doc.make + " " + doc.name}
          body={details}
          selected={selectionState.printer._id === doc._id}
          handleOnChange={e => setSelectedPrinter(doc)}
          disable={(minPrintTemp > doc.maxPrintTemp) || (minBedTemp > doc.maxBedTemp) || !(doc.size === (selectionState.filament !== "" ? selectionState.filament.size : doc.size))}
        />
      );
    });
  }

  return (
    <div>
      <PriceDisplay price={totalPrice} />
      <div className="container">
        <br/>
        <h2>Filament</h2>
        <hr/>
        <div className="form-group">
          <MaterialSelect firstOption={"All"} value={filtersState.material} onChange={e => setFilter("material", e.target.value)} />
          <BrandSelect value={filtersState.brand} brands={dataLists.brand !== undefined ? dataLists.brand : []} onChange={e => setFilter("brand", e.target.value)}
          />
          <ColorSelect value={filtersState.color} colors={dataLists.color !== undefined ? dataLists.color : []} onChange={e => setFilter("color", e.target.value)} />
          <SizeSelect firstOption={"All"} value={filtersState.size} onChange={e => setFilter("size", e.target.value)} />
          <button className="btn btn-primary" onClick={resetFilters}>Reset</button>
        </div>
        <CardSelect cards={filamentList()} />
        <br/>
        <h2>Printer</h2>
        <hr/>
        <CardSelect cards={printerList()} />
        <br/>
        <h2>Print</h2>
        <hr/>
        <div className="form-group">
          <label>Filament Used:
            <input className="form-control" type="number" name="filamentUsed" value={filamentAmount} placeholder="grams" min="0" onChange={(e) => setFilamentAmount(e.target.value)}/>
          </label>
        </div>
        <div className="form-group">
          <label>Print Time:
            <input className="form-control" type="number" name="printTime" value={printTime} placeholder="hours" min="0" onChange={(e) => setPrintTime(e.target.value)}/>
          </label>
        </div>
        <br/>
        <h2>Overhead</h2>
        <hr/>
        <div className="form-group">
          <label className="mr-4">Maintenance:
            <input className="form-control" type="number" name="maintenance" value={overhead.maintenance} placeholder="percentage" min="0" max="100" onChange={updateOverhead}/>
          </label>
          <label>Failed prints:
            <input className="form-control" type="number" name="failRate" value={overhead.failRate} placeholder="percentage" min="0" max="100" onChange={updateOverhead}/>
          </label>
        </div>
      </div>
    </div>
  );
}
