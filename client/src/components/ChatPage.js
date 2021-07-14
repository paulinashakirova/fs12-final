import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Chat from "./Chat";
import ChatFriendList from "./ChatFriendList";
import "./ChatPage.css";

function ChatPage() {
  return (
    <div className="App container p-5">
      <ChatFriendList />
      <Switch>
        <div className="col-9 px-0 border-left">
          <Route path="/chatPage/chat/:receiver">
            <Chat />
          </Route>
        </div>
        Please Select A Friend To Chat With
      </Switch>
    </div>
  );
}

export default ChatPage;
