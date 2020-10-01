import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

import HotendList from './components/hotend-list';
import CreateHotend from './components/create-hotend';
import UpdateHotend from './components/update-hotend';

function HotendPage() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}/`}>
        <HotendList />
      </Route>
      <Route path={`${match.path}/new`}>
        <CreateHotend />
      </Route>
      <Route path={`${match.path}/:hotendId/update`}>
        <UpdateHotend />
      </Route>
    </Switch>
  );
}

export default HotendPage;
