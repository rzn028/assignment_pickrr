import React, { useContext, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Beers from './components/Beers';
import { BeersContext } from './context/BeersContext';

const App = () => {
	const { urlQuery, getBeers } = useContext(BeersContext);

	useEffect(
		() => {
			getBeers(urlQuery.page, urlQuery.search);
		},
		[ urlQuery ]
	);

	return (
		<div className="container">
			<SearchBar />
			<Beers />
		</div>
	);
};

export default App;
