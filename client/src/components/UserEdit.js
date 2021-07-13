import React, { useState, useEffect } from "react";
import Input from "./Input";
import axios from "axios";
//import "./styles.css";

const INITIAL_STATE = {
	id: "",
	name: "",
	address: "",
	phone: "",

	email: "",
	password: "",
	trusted_name: "",
	trusted_contact: "",
	latitude: "0",
	longitude: "0",
	location_token: "0",
};
export default function UserEdit() {
	const [user, setUser] = useState(INITIAL_STATE);
	useEffect(() => {
		(async () => {
			try {
				const user = await axios.get(`api/users/id`, {
					headers: {
						"x-access-token": localStorage.getItem("token"),
					},
				});
				console.log(user.data);
				setUser(user.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const handleInput = (event) => {
		console.log(event.target.name, " : ", event.target.value);
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append("name", user.name);
		formData.append("address", user.address);
		formData.append("phone", user.phone);

		formData.append("email", user.email);
		formData.append("password", user.password);
		formData.append("trusted_name", user.trusted_name);
		formData.append("trusted_contact", user.trusted_contact);
		formData.append("latitude", user.latitude);
		formData.append("longitude", user.longitude);
		formData.append("location_token", user.location_token);

		try {
			const response = await axios.put("api/users/profile", formData, {
				headers: {
					"x-access-token": localStorage.getItem("token"),
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="container">
			<h3 className="text-center fw-bold mb-4">Hi {user.name}</h3>
			<form className="row g-3">
				<div className="col-12">
					<label className="form-label">Name</label>
					<Input
						type="text"
						name="name"
						value={user.name}
						placeholder="Your name"
						handleInput={handleInput}
					/>
				</div>
				<div className="col-12">
					<label className="form-label">Address</label>
					<Input
						type="text"
						name="name"
						value={user.address}
						placeholder="Your address"
						handleInput={handleInput}
					/>
				</div>
				<div className="col-12">
					<label className="form-label">Contact Number</label>
					<Input
						name="phone"
						type="text"
						value={user.phone}
						placeholder="Your contact number"
						handleInput={handleInput}
					/>
				</div>

				<div className="col-12">
					<label className="form-label">Email</label>
					<Input
						name="email"
						type="email"
						value={user.email}
						placeholder="Your email"
						handleInput={handleInput}
					/>
				</div>
				<div className="col-12">
					<label className="form-label">Trusted Contact Person</label>
					<Input
						name="trusted_name"
						type="text"
						value={user.trusted_name}
						placeholder="Your trusted person"
						handleInput={handleInput}
					/>
				</div>
				<div className="col-12">
					<label className="form-label">Trusted Contact Number</label>
					<Input
						name="trusted_contact"
						type="text"
						value={user.trusted_contact}
						placeholder="Your trusted person contact"
						handleInput={handleInput}
					/>
				</div>

				<button
					type="button"
					className="btn btn-primary"
					onClick={(event) => handleSubmit(event)}
				>
					Update
				</button>
			</form>
		</div>
	);
}
