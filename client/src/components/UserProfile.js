import React, { useEffect, useState } from "react";
import axios from "axios";

const errorMessage = "There was a problem. Please try again later";

export default function Profile() {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		try {
			const response = await axios(`/users/18`, {
				headers: {
					"x-access-token": localStorage.getItem("token"),
				},
			});
			setUsers(response.data);
			console.log(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<h3 className="text-center fw-bold mb-4">User Profile</h3>
			<div className="container emp-profile">
				{users.map((item) => (
					<form method="post" key={item.id}>
						<div className="row">
							<div className="col-md-4">
								<div className="profile-img">
									<img src={item.profile_photo} alt="" />
									<div className="file btn btn-lg btn-primary">
										Change Photo
										<input type="file" name="file" />
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="profile-head">
									<h5>Hi {item.name}</h5>
									<h6>Welcome to your profile page</h6>
									<p className="proile-rating"></p>
									<ul className="nav nav-tabs" id="myTab" role="tablist">
										<li className="nav-item">
											<a
												className="nav-link active"
												id="home-tab"
												data-toggle="tab"
												href="#home"
												role="tab"
												aria-controls="home"
												aria-selected="true"
											>
												About Me
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-4"></div>
							<div className="col-md-8">
								<div className="tab-content profile-tab" id="myTabContent">
									<div
										className="tab-pane fade show active"
										id="home"
										role="tabpanel"
										aria-labelledby="home-tab"
									>
										<div className="row">
											<div className="col-md-3 text-left">
												<label>ID</label>
											</div>
											<div className="col-md-9 text-left">
												<p>{item.id}</p>
											</div>
										</div>
										<div className="row">
											<div className="col-md-3 text-left">
												<label>Name</label>
											</div>
											<div className="col-md-9 text-left">
												<p>{item.name}</p>
											</div>
										</div>
										<div className="row">
											<div className="col-md-3 text-left">
												<label>Address</label>
											</div>
											<div className="col-md-9 text-left">
												<p>{item.address}</p>
											</div>
											<div className="row">
												<div className="col-md-3 text-left">
													<label>Email</label>
												</div>
												<div className="col-md-9 text-left">
													<p> {item.email}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-3 text-left">
													<label>Phone</label>
												</div>
												<div className="col-md-9 text-left">
													<p> {item.phone}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-3 text-left">
													<label>Trusted Contact Person</label>
												</div>
												<div className="col-md-9 text-left">
													<p> {item.trusted_name}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-3 text-left">
													<label>Trusted Contact Number</label>
												</div>
												<div className="col-md-9 text-left">
													<p> {item.trusted_contact}</p>
												</div>
											</div>
											<button className="btn btn-primary">
												Update Profile
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				))}
			</div>
		</div>
	);
}
