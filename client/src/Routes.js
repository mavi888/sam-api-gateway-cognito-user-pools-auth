import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';

import Home from './containers/Home';
import NotFound from './containers/NotFound';

export default ({ childProps }) => (
	<Switch>
		<AppliedRoute path="/" exact component={Home} props={childProps} />
		{/* Finally, catch all unmatched routes */}
		<Route component={NotFound} />
	</Switch>
);
