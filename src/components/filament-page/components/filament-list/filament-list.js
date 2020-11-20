import React, { useState, useEffect } from 'react';
import ProductCard from '../../../product-card';
import ProductList from '../../../product-list';
import { useRouteMatch } from 'react-router-dom';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function FilamentList() {
  let match = useRouteMatch();

  const [filaments, setFilaments] = useState([]);

  useEffect(() => {
    DatabaseAPI.getFilaments((data) => setFilaments(data));
  }, []);

  function deleteFilament(id) {
    if (window.confirm('Do you really want to delete this filament?')) {
      DatabaseAPI.deleteFilament(id, () => {setFilaments(prev => prev.filter(doc => doc._id !== id));})
    }
  }

  function filamentList() {
    return filaments.map(doc => {
      let details = [
        doc.brand,
        `${doc.material} (${doc.size}mm)`,
        `$${doc.cost}/kg`,
      ];
      return (
        <ProductCard
          key={doc._id}
          id={doc._id}
          title={`${doc.color} ${doc.name ? doc.name : doc.material}`}
          body={details}
          updateUrl={`${match.url}/${doc._id}/update`}
          deleteItem={deleteFilament}
        />
      );
    });
  }

  return (
    <ProductList
      name="Filament"
      newProductUrl={`${match.url}/new`}
      products={filamentList()}
    />
  );
}
