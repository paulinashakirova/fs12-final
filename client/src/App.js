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
import logo from './img/logoyellow.png';

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
        <nav className='navbar navbar-expand-lg navbar-dark ' style={{ background: '#0081a7' }}>
          {localStorage.getItem('token') ? (
            <div>
              <div className='container-fluid'>
                <a className='navbar-brand' href='#'>
                  <img width='60' height='60' src={logo} alt='' />
                </a>
                <NavLink
                  active
                  className='nav-item navbar-toggler bg-gradient  text-decoration-none
									'
                  to='/'>
                  <span>Dashboard</span>
                </NavLink>
                <NavLink
                  active
                  className='nav-item navbar-toggler bg-gradient text-decoration-none red'
                  to='/chatPage'>
                  Chat
                </NavLink>
                <NavLink
                  active
                  className='nav-item navbar-toggler bg-gradient text-decoration-none red'
                  to='/userProfile'>
                  Profile
                </NavLink>
                <NavLink
                  active
                  className='nav-item navbar-toggler bg-gradient text-decoration-none red'
                  to='/userEdit'>
                  Edit Profile
                </NavLink>
                <button
                  className='btn btn-link btn-outline-success pl-0  nav-item my-2 my-sm-0 '
                  type='submit'
                  onClick={logOut}>
                  <span className='pl-3'>Log-out</span>
                </button>
                <div className='my-1 mx-2 '>
                  {user.name}
                  {user && user.profile_photo && (
                    <img style={avatarStyles} alt='User profile' src={'/img/' + user.profile_photo} />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              className='navbar gap-3 navbar-expand navbar-dark opacity-40'
              style={{ background: '#0081a7' }}>
              <div className='container-fluid'>
                <a href='#'>
                  <img width='100' height='100' src={logo} />
                </a>
                <NavLink active className='nav-item text-decoration-none red' to='/userRegistration'>
                  <span className='fs-1'>Register</span>
                </NavLink>
                <NavLink active className='nav-item text-decoration-none red' to='/userLogin'>
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
