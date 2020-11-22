import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../App';
import Favourites from '../components/Favourites';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import { BeersContext } from '../context/BeersContext';
import axios from '../api/Handler';

import { Button, Modal, Form, Input, Alert, message } from 'antd';

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
};

const tailLayout = {
	wrapperCol: { offset: 8, span: 16 }
};

const AppRouter = () => {
	const [ beers, setBeers ] = useState([]);
	const [ favouriteBeers, setFavouriteBeers ] = useState([]);
	const [ hasNext, setHasNext ] = useState(true);
	const [ urlQuery, setUrlQuery ] = useState({
		page: 1,
		search: ''
	});
	const [ showUpdateModal, setShowUpdateModal ] = useState(false);
	const [ updateForm ] = Form.useForm();
	const [ updates, setUpdates ] = useState({
		id: '',
		name: '',
		description: ''
	});

	const getBeers = (page = 1, search = '') => {
		axios
			.get(`beers?page=${page}${search ? '&beer_name=' + search : ''}`)
			.then((res) => {
				if (!res.data.length) {
					setHasNext(false);
				}
				if (res.data) {
					setHasNext(true);
				}
				if (page > 1) setBeers((oldBeers) => [ ...oldBeers, ...res.data ]);
				if (page === 1) setBeers([ ...res.data ]);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {});
	};

	const updateValues = (values) => {
		const { name, description } = values;
		const { id } = updates;
		let newUpdates = {};
		if (!name.trim() && !description.trim()) {
			message.error('Please provide atlest one input');
			return;
		}
		if (name) {
			newUpdates.name = name;
		}
		if(description) {
			newUpdates.description = description;
		}
		setBeers((beers) =>
			beers.map((beer) => {
				if (beer.id === id) {
					return {
						...beer,
						...newUpdates
					};
				}
				return { ...beer };
			})
		);
		setShowUpdateModal(true);
		message.success('Successfully updated');
		
	};

	const deleteItem = (id) => {
		setBeers(beers => beers.filter(beer => beer.id !== id));
	}

	const onFinishFailed = (errorInfo) => {
		// console.log('Failed:', errorInfo);
	};

	const openUpdateModal = (id, name, description) => {
		setUpdates({
			id,
			name,
			description
		});
		setShowUpdateModal(true);
	};

	return (
		<BeersContext.Provider
			value={{
				beers,
				setBeers,
				favouriteBeers,
				setFavouriteBeers,
				hasNext,
				setHasNext,
				urlQuery,
				setUrlQuery,
				getBeers,
				openUpdateModal,
				deleteItem
			}}
		>
			<Router>
				<Header />
				<Switch>
					<Route component={App} path="/" exact={true} />
					<Route component={Favourites} path="/favourites" exact={true} />
					<Route component={NotFoundPage} />
				</Switch>
			</Router>
			<Modal
				title="Edit beer details"
				visible={showUpdateModal}
				footer={[
					<Button
						key="back"
						onClick={() => {
							updateForm.resetFields();
							setShowUpdateModal(false);
						}}
					>
						Close
					</Button>
				]}
				onCancel={() => {
					updateForm.resetFields();
					setShowUpdateModal(false);
				}}
			>
			<Alert message="Leave the input blank in case on no updates." type="info" style={{marginBottom: '1.5rem'}} />
				<Form
					{...layout}
					form={updateForm}
					name="basic"
					onFinish={updateValues}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						label="Name"
						name="name"
						rules={[ { required: false, message: 'Please input beer name!' } ]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Description"
						name="description"
						rules={[ { required: false, message: 'Please input beer description!' } ]}
					>
						<Input />
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</BeersContext.Provider>
	);
};

export default AppRouter;
