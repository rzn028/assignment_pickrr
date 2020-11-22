import React, { useContext } from 'react';
import { Card, Row, Empty } from 'antd';
import { EditOutlined, EllipsisOutlined, HeartOutlined } from '@ant-design/icons';
import { BeersContext } from '../context/BeersContext';

const { Meta } = Card;

const Favourites = () => {
	const { favouriteBeers, beers, setFavouriteBeers, openUpdateModal } = useContext(BeersContext);

	return (
		<Row align={'middle'} justify={'center'} key={1}>
			{!favouriteBeers.length && <Empty style={{ margin: '5rem' }} description={'No favourites yet.'} />}
			{beers.filter((beer) => favouriteBeers.includes(beer.id)).map((item) => {
				return (
					<Card
						key={item.id}
						style={{ width: 300, margin: '10px 15px' }}
						cover={
							<img
								alt={item.name}
								style={{
									display: 'block',
									marginLeft: 'auto',
									marginRight: 'auto',
									height: '200px',
									width: 'auto',
									objectFit: 'contain',
									alignSelf: 'center'
								}}
								src={item.image_url}
							/>
						}
						hoverable={true}
						actions={[
							<HeartOutlined
								key="like"
								style={{ color: favouriteBeers.includes(item.id) ? 'red' : '#383838' }}
								onClick={() => {
									console.log(favouriteBeers);
									if (favouriteBeers.includes(item.id)) {
										setFavouriteBeers((beers) => {
											return beers.filter((beer) => beer.id === item.id);
										});
									} else {
										setFavouriteBeers((old) => [ ...old, item.id ]);
									}
								}}
							/>,
							<EditOutlined
								key="edit"
								onClick={() => {
									openUpdateModal(item.id, item.name, item.description);
								}}
							/>,
							<EllipsisOutlined key="ellipsis" />
						]}
					>
						<Meta title={item.name} description={item.description} />
					</Card>
				);
			})}
		</Row>
	);
};

export default Favourites;
