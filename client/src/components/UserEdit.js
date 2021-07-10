import React, { useState, useEffect } from "react";
import Input from "./Input";
import axios from "axios";
//import "./styles.css";

const INITIAL_STATE = {
	id: "",
	name: "",
	address: "",
	phone: "",
	profile_photo: "",
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
				const user = await axios.get(`/users/id`, {
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

	const handleInput = (e) => {
		console.log(e.target.name, " : ", e.target.value);
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const onFileInput = (e) => {
		//console.log(e.target.name, " : ", e.target.value);
		setUser({ ...user, profile_photo: e.target.files[0] });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("Data for update : ", user);
			const response = await axios.put(`users/profile`, user);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="container">
			<h3 className="text-center fw-bold mb-4">Hi {user.name}</h3>
			<form className="row g-3" onSubmit={handleSubmit}>
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
					<label className="form-label">Profile Photo</label>
					<Input
						name="profile_photo"
						type="text"
						value={user.profile_photo}
						placeholder="Your profile photo"
						handleInput={onFileInput}
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

				<button type="submit" className="btn btn-primary">
					Update
				</button>
			</form>
		</div>
	);
}
