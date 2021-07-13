var express = require("express");
var router = express.Router();
require("dotenv").config();
var Pusher = require("pusher");
//var Message = require("../models/message");
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

router.post("/:receiver_id", userShouldBeLoggedIn, async (req, res) => {
	let { receiver_id } = req.params;
	let { text } = req.body;

	try {
		//store in DB
		Message.create({
			text,
			sender_id,
			receiver_id,
			where: { sender_id: user.id },
		});
	} catch (err) {
		res.status(500).send(err);
	}

	const ids = [sender_id, receiver_id].sort();
	let channel = `chat-${ids[0]}-${ids[1]}`;

	//send to Pusher
	channels_client.trigger(channel, "message", {
		text,
		sender_id,
		receiver_id,
	});

	res.send({ msg: "Sent" });
});

router.get("/:receiver_id", userShouldBeLoggedIn, async (req, res) => {
	let { receiver_id } = req.params;
	let messages = await Message.findAll({
		where: {
			sender_id: {
				[Op.in]: [sender_id, receiver_id],
			},
			receiver_id: {
				[Op.in]: [receiver_id, sender_id],
			},
		},
		limit: 10,
		order: [["id", "DESC"]],
	});

	res.send(messages.reverse());
});

module.exports = router;
