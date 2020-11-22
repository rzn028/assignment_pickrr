import React, { useContext } from 'react';
import { Input } from 'antd';
import { BeersContext } from '../context/BeersContext';

const { Search } = Input;
const SearchBar = () => {
	const { setUrlQuery } = useContext(BeersContext);
    return (
        <div style={{padding: '0 15rem 2.5rem'}}>
        <Search placeholder="Search for beers..." onSearch={(text) => {
            setUrlQuery({
                page: 1,
                search: text
            });
        }} enterButton />
        </div>
    );
}

export default SearchBar;