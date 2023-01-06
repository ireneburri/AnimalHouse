import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/style/globalStyle.css'
import ProtectedRoutes from './ProtectedRoutes';

//Pages
import HomePage from './pages/HomePage';
import SignUp from './pages/Login';
import Commerce from './pages/Commerce';
import SingleProduct from './pages/SingleProduct';
import Pinboards from './pages/Pinboards';
import SinglePinboard from './pages/SinglePinboard';
import SinglePost from './pages/SinglePost';
import Form from './pages/PostForm';
import Services from './pages/Services';
import SingleService from './pages/SingleService';
import Locations from './pages/Locations';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import Cart from './pages/Cart';
import Thanks from './pages/Thanks';
import AnimalCommerce from './pages/AnimalCommerce';
import SingleAnimal from './pages/SingleAnimal';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/home" element={<HomePage />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/commerce" element={<Commerce />} />
					<Route path="/animalcommerce" element={<AnimalCommerce />} />
					<Route path="/singleproduct:id" element={<SingleProduct />} />
					<Route path="/animal:id" element={<SingleAnimal />} />
					<Route path="/pinboards" element={<Pinboards />} />
					<Route path="/services:service" element={<Services />} />
					<Route path="/singleservice:name" element={<SingleService />} />
					<Route path="/locations" element={<Locations />} />
					<Route path="/login" element={<Login />} />
					<Route path="/cart" element={<Cart />} />

					<Route element={<ProtectedRoutes />}>
						<Route path="/pinboard:page" element={<SinglePinboard />} />
						<Route path="/form:category" element={<Form />} />
						<Route path="/singlepost:post" element={<SinglePost />} />
						<Route path="/account" element={<ProfilePage />} />
						<Route path="/thanks" element={<Thanks />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
