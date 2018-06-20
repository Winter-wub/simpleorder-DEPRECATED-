import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  OrderList,
  OrderDetail,
} from './Components/';

export default () => (
  <Switch>
    <Route exact path="/" component={OrderList} />
    <Route path="/Order/:id" component={OrderDetail} />
  </Switch>

);
