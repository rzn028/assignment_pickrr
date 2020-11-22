import React, { useEffect, useState, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin, Space, Card, Row } from 'antd';
import { EditOutlined, EllipsisOutlined, HeartOutlined } from '@ant-design/icons';
import { BeersContext } from '../context/BeersContext';

const { Meta } = Card;

const Beers = () => {
	const { beers, hasNext, setUrlQuery, favouriteBeers, setFavouriteBeers, openUpdateModal } = useContext(
		BeersContext
	);

	const loadMoreBeers = () => {
		console.log('task to load more');
		setUrlQuery((old) => {
			return {
				...old,
				page: old.page + 1
			};
		});
	};

	return (
		<div>
			<InfiniteScroll
				pageStart={0}
				dataLength={beers.length}
				next={loadMoreBeers}
				hasMore={hasNext}
				loader={
					<Row align={'middle'} justify={'center'} style={{ margin: '6rem 1rem' }}>
						<Space size="middle">
							<Spin size="large" />
						</Space>
					</Row>
				}
			>
				<Row align={'middle'} justify={'center'} key={1}>
					{beers.map((item) => {
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
			</InfiniteScroll>
		</div>
	);
};

export default Beers;
