var express = require("express");
var router = express.Router();
require("dotenv").config();
var Pusher = require("pusher");
var Message = require("../models/message");
const Sequelize = require("sequelize");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const Op = Sequelize.Op;
var models = require("../models");

var channels_client = new Pusher({
	appId: process.env.PUSHER_APP_ID,
	key: process.env.PUSHER_KEY,
	secret: process.env.PUSHER_SECRET,
	cluster: "ap1",
	useTLS: true,
});

// https://pusher.com/docs/channels/server_api/authenticating-users
router.post("/pusher/auth", function (req, res) {
	const socketId = req.body.socket_id;
	const channel = req.body.channel_name;

	// https://pusher.com/docs/channels/library_auth_reference/auth-signatures
	// You would first check that the user (authenticated via token) has permission to access channel
	const [_, __, id1, id2] = channel.split("-");
	// if the user has access to this channel because they're either the sender or the receiver
	if (id1 === req.user_id || id2 === req.user_id) {
		// if (true) {
		// all good
		const auth = channels_client.authenticate(socketId, channel);
		res.send(auth);
	} else {
		// no good, the user is not authorized to listen to this channel. Send error!
		res.status(401).send({ message: "Please log in" });
	}
});

router.post("/:sender_id/:receiver_id", (req, res) => {
	let { sender_id, receiver_id } = req.params;
	let text = req.body.data.message;

	try {
		//store in DB
		Message.create({ text, sender_id, receiver_id });
	} catch (err) {
		res.status(500).send(err);
	}

	const ids = [sender_id, receiver_id].sort();
	let channel = `private-chat-${ids[0]}-${ids[1]}`;

	//send to Pusher
	channels_client.trigger(channel, "message", {
		text,
		sender_id,
		receiver_id,
	});

	res.send({ msg: "Sent" });
});

router.get("/:id1/:id2", async (req, res) => {
	let { id1, id2 } = req.params;
	let messages = await Message.findAll({
		where: {
			sender_id: {
				[Op.in]: [id1, id2],
			},
			receiver_id: {
				[Op.in]: [id1, id2],
			},
		},
		limit: 100,
		order: [["id", "DESC"]],
	});

	res.send(messages.reverse());
});

module.exports = router;
