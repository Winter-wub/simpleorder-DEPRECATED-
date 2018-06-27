import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  OrderList,
  OrderDetail,
  SetCost,
} from './Components/';

export default () => (
  <Switch>
    <Route exact path="/" component={OrderList} />
    <Route path="/Order/:id" component={OrderDetail} />
    <Route path="/Sum/:id" component={SetCost} />
  </Switch>

);
