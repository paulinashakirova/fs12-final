import './App.css';
import Dashboard from './components/Dashboard';
import React, { useEffect, useState } from 'react';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import UserProfile from './components/UserProfile';
import Chat from './components/Chat';
import UserEdit from './components/UserEdit';
import ChatPage from './components/ChatPage';
import ChatFriendList from './components/ChatFriendList';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import GuestView from './components/GuestView';
import logo from './img/logo.png';

function App() {
	const avatarStyles = {
		height: '36px',
		width: '36px',
		borderRadius: '50%',
		marginLeft: '10px'
	};
	const logOut = (e) => {
		localStorage.clear();
		window.location.href = '/userLogin';
	};
	const [user, setUser] = useState([]);

	useEffect(() => {
		if (localStorage.getItem('token')) getUsers();
	}, [localStorage.getItem('token')]);

	const getUsers = async () => {
		try {
			const response = await axios(`/api/users/id`, {
				headers: {
					'x-access-token': localStorage.getItem('token')
				}
			});
			setUser(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='App'>
			<Router>
				<nav>
					{localStorage.getItem('token') ? (
						<div className='navbar gap-3 navbar-expand'>
							<div className='mr-auto'>
								{user.name}
								{user && user.profile_photo && (
									<img style={avatarStyles} alt='User profile' src={'/img/' + user.profile_photo} />
								)}
							</div>
							<NavLink className='nav-item' to='/'>
								Dashboard
							</NavLink>
							<NavLink className='nav-item' to='/chatPage'>
								Chat
							</NavLink>
							<NavLink className='nav-item' to='/userProfile'>
								Profile
							</NavLink>
							<NavLink className='nav-item' to='/userEdit'>
								Edit Profile
							</NavLink>
							<button className='btn btn-link pl-0 nav-item' onClick={logOut}>
								Log-out
							</button>
						</div>
					) : (
						<div
							className='navbar gap-3 navbar-expand navbar-dark opacity-40'
							style={{ background: '#00afb9' }}>
							<div className='container-fluid'>
								<a href='#'>
									<img width='100' height='100' src={logo} />
								</a>
								<NavLink active className='nav-item text-decoration-none orange' to='/userRegistration'>
									<span className='fs-1'>Register</span>
								</NavLink>
								<NavLink active className='nav-item text-decoration-none orange' to='/userLogin'>
									<span className='fs-1 mr-5'>Login</span>
								</NavLink>
							</div>
						</div>
					)}
				</nav>

				<Switch>
					<Route path='/userLogin'>
						<UserLogin />
					</Route>
					<Route path='/userRegistration'>
						<UserRegistration />
					</Route>
					<Route path='/guestview/:id'>
						<GuestView />
					</Route>

					{localStorage.getItem('token') && (
						<div>
							<Route path='/' exact>
								<Dashboard />
							</Route>
							<Route path='/userProfile'>
								<UserProfile />
							</Route>
							<Route path='/chatPage'>
								<ChatPage />
							</Route>
							<Route path='/userEdit'>
								<UserEdit />
							</Route>
						</div>
					)}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
