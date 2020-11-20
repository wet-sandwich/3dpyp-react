import React, { useState, useEffect, Fragment } from 'react';
import ProductCard from '../../../product-card';
import ProductList from '../../../product-list';
import DbAPI from '../../../../utils/db-api';
import { useRouteMatch } from 'react-router-dom';

var DatabaseAPI = new DbAPI();

export default function PrinterList() {
  let match = useRouteMatch();

  const [printers, setPrinters] = useState([]);

  useEffect(() => {
    DatabaseAPI.getPrinters((data) => setPrinters(data));
  }, []);

  function deletePrinter(id) {
    if (window.confirm('Do you really want to delete this printer?')) {
      DatabaseAPI.deletePrinter(id, () => {setPrinters(prev => prev.filter(doc => doc._id !== id));})
    }
  }

  function printerList() {
    return printers.map(doc => {
      let details = [
        `$${(doc.cost/doc.life).toFixed(3)} /hr`,
        `${doc.type} | ${doc.motion} | ${doc.drive}`,
        <Fragment>{doc.maxPrintTemp}&deg;C / {doc.maxBedTemp}&deg;C</Fragment>,
        `${doc.size}mm`,
      ];
      return (
        <ProductCard
          key={doc._id}
          id={doc._id}
          title={doc.make + " " + doc.name}
          body={details}
          updateUrl={`${match.url}/${doc._id}/update`}
          deleteItem={deletePrinter}
        />
      );
    });
  }

  return (
    <ProductList
      name="Printer"
      newProductUrl={`${match.url}/new`}
      products={printerList()}
    />
  );
}
