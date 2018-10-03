const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

userSchema.methods.bcryptPassword = async function() {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
}

userSchema.methods.generateAuthToken = function() {
	return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = {
		name: Joi.string().min(2).required(),
		email: Joi.string().email().required(),
		password: Joi.string().required()
	};

	return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;