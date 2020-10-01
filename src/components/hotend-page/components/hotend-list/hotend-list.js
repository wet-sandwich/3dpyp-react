import React, { useState, useEffect, Fragment } from 'react';
import ProductCard from '../../../product-card';
import ProductList from '../../../product-list';
import { useRouteMatch } from 'react-router-dom';
import DbAPI from '../../../../utils/db-api';

var DatabaseAPI = new DbAPI();

export default function HotendList() {
  let match = useRouteMatch();

  const [hotends, setHotends] = useState([]);

  useEffect(() => {
    DatabaseAPI.getHotends((data) => setHotends(data));
  }, []);

  function deleteHotend(id) {
    if (window.confirm('Do you really want to delete this hotend?')) {
      DatabaseAPI.deleteHotend(id, () => setHotends(prev => prev.filter(doc => doc._id !== id)));
    }
  }

  function hotendList() {
    return hotends.map(doc => {
      let details = [
        `${doc.size}mm`,
        doc.heatbreak,
        <Fragment>{doc.maxTemp}&deg;C</Fragment>,
      ];
      return (
        <ProductCard
          key={doc._id}
          id={doc._id}
          title={`${doc.make} ${doc.name}`} body={details}
          updateUrl={`${match.url}/${doc._id}/update`}
          deleteItem={deleteHotend}
        />
      );
    });
  }

  return (
    <ProductList
      name="Hotend"
      newProductUrl={`${match.url}/new`}
      products={hotendList()}
    />
  );
}
