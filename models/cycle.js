const mongoose = require('mongoose');
const Joi = require('joi');

const cycleSchema = new mongoose.Schema({
	project: {
		type: new mongoose.Schema({
			name: {
				type: String,
				required: true
			}
		}),
		required: true
	},
	name: {
		type: String,
		required: true
	},
	version: {
		type: String
	},
	startDate: {
		type: Date,
		default: Date.now()
	},
	endDate: {
		type: Date,
		default: Date.now()
	}
});

const Cycle = mongoose.model('Cycle', cycleSchema);

function validateCycle(cycle) {
	const schema = {
		projectId: Joi.string().required(),
		name: Joi.string().required(),
		version: Joi.string(),
		startDate: Joi.date(),
		endDate: Joi.date()
	}

	return Joi.validate(cycle, schema);
}

exports.Cycle = Cycle;
exports.validateCycle = validateCycle;