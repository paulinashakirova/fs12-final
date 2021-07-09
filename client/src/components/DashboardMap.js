import React, { useState, useEffect } from "react";
import Map from "./Map";
import ShareMyLocation from "./ShareMyLocation";

export default function DashboardMap() {
	const [position, setPosition] = useState({
		lat: 0,
		lng: 0,
	});
	const [status, setStatus] = useState(null);
	useEffect(() => {
		getLocation();
	}, []);

	//ask the user for their current location
	const getLocation = () => {
		if (!navigator.geolocation) {
			setStatus("Geolocation is not supported by your browser");
		} else {
			setStatus("Locating...");
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setStatus(null);
					setPosition({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				() => {
					setStatus("Unable to retrieve your location");
				}
			);
		}
	};

	return (
		<div className="container">
			<div className="row">
				<button onClick={getLocation} className="btn btn-info mb-2">
					Find me
				</button>
				<ShareMyLocation position={position} getLocation={getLocation} />
				<Map position={position}></Map>
			</div>
		</div>
	);
}
