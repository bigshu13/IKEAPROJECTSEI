import React, { useState, useEffect } from 'react';
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation
} from 'react-router-dom';
import styles from './App.module.scss';
import { getUser, signUp } from '../../utilities/users-services';
import * as ordersAPI from '../../utilities/order-api';
import HomeScreen from '../HomeScreen/HomeScreen';

export default function App() {
	const [pexelsData, setPexelsData] = useState([]);


	return (
		<main>
		<div>IKEA Logo</div>
			<HomeScreen pexelsData={pexelsData} setPexelsData={setPexelsData}/>
		</main>
	);
}
