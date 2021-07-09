var express = require("express");
var router = express.Router();
var models = require("../models");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { Router } = require("express");
const saltRounds = 10;
var fs = require("fs/promises");
var path = require("path");
const { v4: uuidv4 } = require("uuid");
var mime = require("mime-types");

require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

/* GET users listing. */
router.get("/", async (req, res) => {
	try {
		const users = await models.User.findAll({
			attributes: [
				"id",
				"name",
				"email",
				"password",
				"address",
				"phone",
				"trusted_contact",
				"trusted_name",
				"profile_photo",
				"latitude",
				"longitude",
				"location_token",
			],
			// include: { model: models.Album, attributes: ['name'] }
		});
		res.send(users);
	} catch (err) {
		res.status(500).send(err);
	}
});

// GET one user
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await models.User.findAll({
			where: { id },
		});
		res.send(user);
	} catch (err) {
		res.status(500).send(err);
	}
});

//Get location by user id
router.get("/:id/location", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await models.User.findOne({
			where: { id },
		});
		const location = `${user.latitude}, ${user.longitude}`;
		console.log("this is the real location:", location);
		res.send(location);
		// console.log("this is the location of the user", user.latitude, user.longitude)
	} catch (err) {
		res.status(500).send(err);
	}
});

// REGISTRATION OF USER
router.post("/register", async (req, res) => {
	const {
		name,
		email,
		password,
		address,
		phone,
		trusted_contact,
		trusted_name,
		latitude,
		longitude,
		location_token,
	} = req.body;
	const { profile_photo } = req.files;

	// check the extension of the file
	const extension = mime.extension(profile_photo.mimetype);

	// create a new random name for the file
	const filename = uuidv4() + "." + extension;

	// grab the filepath for the temporary file
	const tmp_path = profile_photo.tempFilePath;

	//construct the new path for the final file
	const target_path = path.join(__dirname, "../public/img/") + filename;

	try {
		const hash = await bcrypt.hash(password, saltRounds);
		const image = await fs.rename(tmp_path, target_path);

		//console.log(image);

		console.log("this is the body", {
			name,
			email,
			password: hash,
			address,
			phone,
			trusted_contact,
			trusted_name,
			profile_photo: filename,
			latitude,
			longitude,
			location_token,
		});

		// console.log("this is the hash" , hash)

		const user = await models.User.create({
			name,
			email,
			password: hash,
			address,
			phone,
			trusted_contact,
			trusted_name,
			profile_photo: filename,
			latitude,
			longitude,
			location_token,
		});

		// console.log("this is the user",user)
		res.send(user);
	} catch (err) {
		res.status(500).send({ msg: "Please, fill in all required fields." });
	}
});

//LOGIN
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const results = await models.User.findOne({
			where: { email },
		});
		console.log("this are the results", results);
		const user = results.id; //for sequalize, we must define results.id vs mysql result.data[0]
		console.log("this is the user", user);

		if (user) {
			const user_id = user.id;

			const correctPassword = await bcrypt.compare(password, results.password);

			if (!correctPassword) throw new Error("Incorrect Password");

			const token = jwt.sign({ user_id }, supersecret);
			res.send({ message: "Login succesful, here is your token", token });
		} else {
			throw new Error("User does not exist");
		}
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
});

//UPDATE user's profile
router.put("/profile", async function (req, res, next) {
	// const { id } = req.body
	// const { user_id } = req.user_id
	const {
		name,
		email,
		password: hash,
		address,
		phone,
		trusted_contact,
		trusted_name,
		location_token,
	} = req.body;
	const { profile_photo } = req.files;

	try {
		const user = await models.User.findOne({
			where: { name },
		});
		// console.log("this is the user:", user)

		const data = await user.update({
			name,
			email,
			password: hash,
			address,
			phone,
			trusted_contact,
			trusted_name,
			profile_photo,
			location_token,
		});
		console.log("this is data:", data);
		res.send({ message: "User details was updated correctly", data: data });
	} catch (error) {
		res.status(500).send(error);
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await models.User.destroy({
			where: { id },
		});
		res.send({ msg: "User deleted" });
	} catch (err) {
		res.status(404).send(err);
	}
});

module.exports = router;
