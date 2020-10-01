import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

import PricingInputs from './components/pricing-inputs';

function PricingPage() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}/`}>
        <PricingInputs />
      </Route>
    </Switch>
  );
}

export default PricingPage;
