import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

import PrinterList from './components/printer-list';
import CreatePrinter from './components/create-printer';
import UpdatePrinter from './components/update-printer';

function PrinterPage() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}/`}>
        <PrinterList />
      </Route>
      <Route path={`${match.path}/new`}>
        <CreatePrinter />
      </Route>
      <Route path={`${match.path}/:printerId/update`}>
        <UpdatePrinter />
      </Route>
    </Switch>
  );
}

export default PrinterPage;
