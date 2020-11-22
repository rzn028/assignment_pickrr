import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from 'antd';

import { useLocation } from 'react-router-dom';
const Header = () => {
	let location = useLocation();

	return (
		<div className="site-page-header-ghost-wrapper" style={{backgroundColor: '#424242'}}>
			<PageHeader
				ghost={true}
				onBack={() => window.history.back()}
				title={<span style={{color: '#ffffff', fontSize: '2.2rem'}}>Beans Love Beers</span>}
				subTitle={<strong style={{color: '#aeaeae'}}>Assignment</strong>}
				extra={[
                    location.pathname.toLowerCase() === '/favourites' && <Link to="/" style={{color: '#98ff8c', fontSize: '1.2rem'}} key={1}>Home</Link>,
                    location.pathname.toLowerCase() === '/' && <Link to="/favourites" style={{color: '#8cb8ff', fontSize: '1.2rem'}} key={2}>Favourites</Link>
                ]}
                backIcon={false}
			>
			</PageHeader>
		</div>
	);
};

export default Header;
