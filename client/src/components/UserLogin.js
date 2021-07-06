import React, { useState } from "react";
import axios from "axios";

function UserLogin(props) {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const handleChange = ({ target }) => {
		const { name, value } = target;

		setUser((state) => ({
			...state,
			[name]: value,
		}));
	};

	const login = async () => {
		try {
			const response = await axios("/users/login", {
				method: "POST",
				data: user,
				// body: JSON.stringify(user)
			});

			localStorage.setItem("token", response.data.token);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="container">
			<h3 className="text-center fw-bold mb-4">Log in</h3>
			<form onSubmit={login}>
				<div className="mb-3">
					<label className="form-label">Username</label>
					<input
						type="text"
						className="form-control"
						name="email"
						value={user.email}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Password</label>
					<input
						type="password"
						className="form-control"
						name="password"
						value={user.password}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3 form-check">
					<input
						type="checkbox"
						className="form-check-input"
						id="forgotpassword"
					/>
					<label className="form-check-label" name="forgotpassword">
						Forgot Password
					</label>
				</div>
				<div className="d-grid gap-2 d-md-flex justify-content-md-center">
					<button type="submit" className="btn btn-primary mb-3">
						Log in
					</button>
				</div>
			</form>
		</div>
	);
}

export default UserLogin;
