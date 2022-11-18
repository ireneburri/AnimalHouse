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

function App() {
	return (
		<div className="app" style={{ height: '100%', width: '100%' }}>
			<Router>
				{/* < CartContext.Provider value={{cart, setCart}}> */}
					<Routes>
						<Route exact path="/" element={<HomePage />} />
						<Route exact path="/signup" element={<SignUp />} />
						<Route exact path="/commerce" element={<Commerce />} />
						<Route exact path="/singleproduct:id" element={<SingleProduct />} />
						<Route exact path="/pinboards" element={<Pinboards />} />
						<Route exact path="/services:service" element={<Services />} />
						<Route exact path="/singleservice:id" element={<SingleService />} />
						<Route exact path="/locations" element={<Locations />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/cart" element={<Cart />} />


						<Route element={<ProtectedRoutes />}>
							<Route exact path="/pinboard:page" element={<SinglePinboard />} />
							<Route exact path="/form:category" element={<Form />} />
							<Route exact path="/singlepost:post" element={<SinglePost />} />
							<Route exact path="/account" element={<ProfilePage />} />
							<Route exact path="/thanks" element={<Thanks />} />
						</Route>
					</Routes>
			</Router>
		</div>
	);
}

export default App;
