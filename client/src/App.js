import "./App.css";
import React from "react";
import UserRegistration from "./components/UserRegistration";
import UserLogin from "./components/UserLogin";
import UserValidation from "./components/UserValidation";
import UserProfile from "./components/UserProfile";
import Chat from "./components/Chat";
import UserEdit from "./components/UserEdit";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
} from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<nav className="navbar navbar-expand">
					<NavLink className="nav-item" to="/userRegistration">
						Register
					</NavLink>
					<NavLink className="nav-item" to="/userLogin">
						Login
					</NavLink>
					<NavLink className="nav-item" to="/userProfile">
						Profile
					</NavLink>
					<NavLink className="nav-item" to="/chat">
						Chat
					</NavLink>
					<NavLink className="nav-item" to="/userEdit">
						Edit Profile
					</NavLink>
				</nav>

				<Switch>
					<Route path="/userRegistration">
						<UserRegistration />
					</Route>
					<Route path="/userLogin">
						<UserLogin />
					</Route>
					<Route path="/userValidation">
						<UserValidation />
					</Route>
					<Route path="/userProfile">
						<UserProfile />
					</Route>
					<Route path="/chat">
						<Chat />
					</Route>
					<Route path="/userEdit">
						<UserEdit />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
