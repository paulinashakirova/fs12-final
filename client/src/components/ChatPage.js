import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Chat from "./Chat";
import ChatFriendList from "./ChatFriendList";
import "./ChatPage.css";

function ChatPage() {
	return (
		<div className="App container p-5">
			<Router>
				<Switch>
					<Route path="/chat">
						<div className="col-9 px-0 border-left">
							<Route path="/chat/:sender/:receiver">
								<Chat />
							</Route>
						</div>
					</Route>
					<Route path="/">
						Please Select A Friend To Chat With
						<ChatFriendList />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default ChatPage;
