import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import Header from './components/Header';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import SurveryNew from './components/SurveryNew';

function App(props) {
	useEffect(() => {
		props.fetchUser();
	});

	return (
		<BrowserRouter>
			<div className='container'>
				<Header />
				<Switch>
					<Route exact path='/' render={() => <Landing />}></Route>
					<Route
						exact
						path='/surveys'
						render={() => <Dashboard />}
					></Route>
					<Route
						exact
						path='/surveys/new'
						render={() => <SurveryNew />}
					></Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default connect(
	null,
	actions
)(App);
