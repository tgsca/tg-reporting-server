const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

router.post('/', validate(validateAuth), async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('User or password invalid.');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('User or password invalid.');

	const token = user.generateAuthToken();
	res.send(token);
});

function validateAuth(req) {
	const schema = {
		email: Joi.string().email().required(),
		password: Joi.string().required()
	};

	return Joi.validate(req, schema);
}

module.exports = router;