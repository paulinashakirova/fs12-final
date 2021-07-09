import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";
import axios from "axios";

export default function Chat() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");

	let { sender, receiver } = useParams();

	useEffect(() => {
		setMessages([]);
	}, [receiver, sender]);

	const sendMessage = async () => {};

	return (
		<div className="d-flex flex-column h-100">
			<div className="flex-grow-1 p-3">{/* Render messages here */}</div>

			<div className="bg-light p-4 border-top">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === "Enter") sendMessage();
						}}
					/>
					<div className="input-group-append">
						<button onClick={sendMessage} className="btn btn-outline-primary">
							Send
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
