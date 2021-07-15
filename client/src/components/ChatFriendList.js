import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useRouteMatch, useParams } from 'react-router-dom';

export default function ChatFriendList() {
  const [item, setItem] = useState([]);
  const [user, setUser] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    getUsers();
  }, [id]);

  const getUsers = async () => {
    try {
      const response = await axios(`/api/users`, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });

      setItem(response.data);
      getUserId();
    } catch (err) {
      console.log(err);
    }
  };
  const getUserId = async () => {
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
    <div className='list-group users-list'>
      <div>Hi {user.name}</div>
      {item
        .filter((e) => e.id !== user.id)
        .map((list, index) => (
          <NavLink to={`/chatPage/chat/${list.id}`} key={index}>
            <h6 className='my-0'>{list.name}</h6>
          </NavLink>
        ))}
    </div>
  );
}
