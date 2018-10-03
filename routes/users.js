const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	res.send(user);
});

router.post('/', validate(validateUser), async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send(`User with e-mail '${req.body.email}' already registered.`);

	user = new User(_.pick(req.body, ['name', 'email', 'password']));
	await user.bcryptPassword();
	await user.save();

	const token = user.generateAuthToken();
	res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;