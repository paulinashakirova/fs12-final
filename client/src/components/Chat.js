import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Pusher from 'pusher-js';

Pusher.logToConsole = true;

Pusher.logToConsole = true;

const pusherKey = process.env.REACT_APP_PUSHER_KEY;

export default function Chat() {
<<<<<<< HEAD
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  let { sender, receiver } = useParams();
=======
  const sender = localStorage.getItem("user_id");
  // const [sender, setSender] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  let { receiver } = useParams();

  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };

  // useEffect(() => {
  //   getSender();
  // }, []);
>>>>>>> d5e3dbfe9c5ef03c1f9ab61f0ade2d74465daf55

  useEffect(() => {
    setMessages([]);
    getMessages();

    Pusher.logToConsole = true;

<<<<<<< HEAD
    var pusher = new Pusher('28f10c936cccdf0afe24', {
      cluster: 'ap1',
      forceTLS: true,
      authEndpoint: '/chat/pusher/auth',
      auth: {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      }
    });

    const ids = [sender, receiver].sort();
    // private channels must start with private-
    const channelName = `private-chat-${ids[0]}-${ids[1]}`;

    var channel = pusher.subscribe(channelName);
    channel.bind('message', function (data) {
      console.log(data);
=======
    var pusher = new Pusher(pusherKey, {
      cluster: "ap1",
      forceTLS: true,
      authEndpoint: "/api/chat/pusher/auth",
      auth: {
        headers,
      },
    });

    const ids = [sender, receiver].sort();

    const channelName = `private-chat-${ids[0]}-${ids[1]}`;

    var channel = pusher.subscribe(channelName);
    channel.bind("message", function (data) {
      // console.log(data);
>>>>>>> d5e3dbfe9c5ef03c1f9ab61f0ade2d74465daf55
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      pusher.unsubscribe(channelName);
    };
  }, [receiver, sender]);

<<<<<<< HEAD
  const sendMessage = async () => {
    await axios.post(`/chat/${sender}/${receiver}`, {
      data: { message: input }
    });

    setInput('');
  };

  const getMessages = async () => {
    let { data } = await axios(`/chat/${sender}/${receiver}`);
=======
  // const getSender = async () => {
  //   try {
  //     const response = await axios(`/api/users/id`, {
  //       headers: {
  //         "x-access-token": localStorage.getItem("token"),
  //       },
  //     });
  //     setSender(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const sendMessage = async () => {
    await axios.post(
      `/api/chat/${receiver}`,
      {
        data: { message: input },
      },
      {
        headers,
      }
    );

    setInput("");
  };

  const getMessages = async () => {
    let { data } = await axios.get(`/api/chat/${receiver}`, {
      headers,
    });
>>>>>>> d5e3dbfe9c5ef03c1f9ab61f0ade2d74465daf55

    setMessages((messages) => [...messages, ...data]);
  };

  return (
<<<<<<< HEAD
    <div className='d-flex flex-column h-100'>
      <div className='flex-grow-1 p-3'>
        {messages.map((message, index) => (
          <div key={index} className={message.sender_id === sender ? 'text-right my-2' : 'text-left my-2'}>
            <div className=''>
              <span
                className={`px-2 py-1 rounded text-white ${
                  message.sender_id === sender ? 'bg-primary' : 'bg-secondary'
                }`}>
=======
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 p-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender_id === sender
                ? "text-right my-2"
                : "text-left my-2"
            }
          >
            <div className="">
              <span
                className={`px-2 py-1 rounded text-white ${
                  message.sender_id === sender ? "bg-primary" : "bg-secondary"
                }`}
              >
>>>>>>> d5e3dbfe9c5ef03c1f9ab61f0ade2d74465daf55
                {message.text}
              </span>
            </div>
          </div>
        ))}
      </div>

<<<<<<< HEAD
      <div className='bg-light p-4 border-top'>
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <div className='input-group-append'>
            <button onClick={sendMessage} className='btn btn-outline-primary'>
=======
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
>>>>>>> d5e3dbfe9c5ef03c1f9ab61f0ade2d74465daf55
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
