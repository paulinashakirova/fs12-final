import React, { useState } from "react";
import axios from "axios";
import { WebcamCapture } from "./Webcam";

export default function UserRegistration() {
	const [input, setInput] = useState([
		{
			name: "",
			address: "",
			phone: "",
			profile_photo: "",
			email: "",
			password: "",
			trusted_name: "",
			trusted_contact: "",
			longitude: "0",
			latitude: "0",
		},
	]);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const handleChange = (event) => {
		const { name, value } = event.target;
		setInput((state) => ({ ...state, [name]: value }));
	};

	const onFileChange = (event) => {
		// Update the state
		setInput((state) => ({ ...state, profile_photo: event.target.files[0] }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		//console.log("submit button clicked");

		const formData = new FormData();

		formData.append("name", input.name);
		formData.append("address", input.address);
		formData.append("phone", input.phone);
		formData.append(
			"profile_photo",
			input.profile_photo,
			input.profile_photo.name
		);
		formData.append("email", input.email);
		formData.append("password", input.password);
		formData.append("trusted_name", input.trusted_name);
		formData.append("trusted_contact", input.trusted_contact);
		formData.append("latitude", input.latitude);
		formData.append("longitude", input.longitude);

		try {
			const response = await axios.post("/users/register", formData, {
				headers: {
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
			<h3 className="text-center fw-bold mb-4">Create Your Safemme Account</h3>
			<form className="row g-3">
				<div className="col-12">
					<label className="form-label">Name</label>
					<input
						type="text"
						className="form-control"
						name="name"
						value={input.name}
						onChange={handleChange}
					/>
				</div>
				<div className="col-12">
					<label className="form-label">Address</label>
					<input
						type="text"
						className="form-control"
						name="address"
						value={input.address}
						onChange={handleChange}
					/>
				</div>
				<div className="col-md-12">
					<label className="form-label">Contact Number</label>
					<input
						type="text"
						className="form-control"
						name="phone"
						value={input.phone}
						onChange={handleChange}
					/>
				</div>
				<div className="col-md-12">
					<label htmlFor="formFile" className="form-label">
						Profile Photo
					</label>
					<input
						className="form-control"
						type="file"
						name="profile_photo"
						accept="image/*"
						defaultValue={input.profile_photo}
						onChange={onFileChange}
					/>
				</div>
				<div>
					Photo for verification
					<WebcamCapture />
				</div>
				<div className="col-md-6">
					<label className="form-label">Email</label>
					<input
						type="email"
						className="form-control"
						name="email"
						value={input.email}
						onChange={handleChange}
					/>
				</div>

				<div className="col-md-6">
					<label className="form-label">Password</label>
					<input
						type="password"
						className="form-control"
						name="password"
						value={input.password}
						onChange={handleChange}
					/>
				</div>
				<div className="col-md-6">
					<label className="form-label">Trusted Person Name</label>
					<input
						type="trusted_name"
						className="form-control"
						name="trusted_name"
						value={input.trusted_name}
						onChange={handleChange}
					/>
				</div>
				<div className="col-md-6">
					<label className="form-label">Trusted Contact</label>
					<input
						type="trusted_contact"
						className="form-control"
						name="trusted_contact"
						value={input.trusted_contact}
						onChange={handleChange}
					/>
				</div>
				<div className="col-12">
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							id="gridCheck"
						/>
						<label className="form-check-label" required>
							Agree to Terms and Conditions
						</label>
					</div>
				</div>
				<div className="d-grid gap-2 d-md-flex justify-content-md-center">
					<button
						type="button"
						className="btn btn-primary"
						onClick={(event) => handleSubmit(event)}
					>
						Submit
					</button>
				</div>
				<div className="col-12">
					{message && <div className="alert alert-success">{message}</div>}
					{error && <div className="alert alert-danger">{error}</div>}
				</div>
			</form>
		</div>
	);
}
