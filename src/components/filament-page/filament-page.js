import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

import FilamentList from './components/filament-list';
import CreateFilament from './components/create-filament';
import UpdateFilament from './components/update-filament';

function FilamentPage() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}/`}>
        <FilamentList />
      </Route>
      <Route path={`${match.path}/new`}>
        <CreateFilament />
      </Route>
      <Route path={`${match.path}/:filamentId/update`}>
        <UpdateFilament />
      </Route>
    </Switch>
  );
}

export default FilamentPage;
