import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useRouteMatch, useParams } from "react-router-dom";

export default function ChatFriendList() {
	const [user, setUser] = useState([]);

	let { url } = useRouteMatch();
	let { id } = useParams();

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		try {
			const response = await axios(`/users`, {
				headers: {
					"x-access-token": localStorage.getItem("token"),
				},
			});
			console.log(response.data);
			setUser(response.data);
			console.log(id);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="list-group users-list">
			<div>Hi {user.name}</div>
			{user
				.filter((e) => e.id !== id)
				.map((list, index) => (
					<NavLink to={`/chat/:id/${list.id}`} key={index}>
						<h6 className="my-0">{list.name}</h6>
					</NavLink>
				))}
		</div>
	);
}
