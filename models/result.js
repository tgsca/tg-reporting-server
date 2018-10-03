const mongoose = require('mongoose');
const Joi = require('joi');

const resultSchema = new mongoose.Schema({
	cycle: {
		type: new mongoose.Schema({
			name: {
				type: String,
				required: true
			},
			version: {
				type: String,
				required: true
			},
			project: {
				type: new mongoose.Schema({
					name: {
						type: String,
						required: true		
					}
				}),
				required: true
			}
		}),
		required: true
	},
	reportingDate: {
		type: Date,
		default: Date.now()
	},
	sum: {
		type: Number,
		default: 0
	},
	passed: {
		type: Number,
		default: 0
	},
	failed: {
		type: Number,
		default: 0
	},
	notCompleted: {
		type: Number,
		default: 0
	},
	blocked: {
		type: Number,
		default: 0
	},
	noRun: {
		type: Number,
		default: 0
	},
	KPIs: {
		type: new mongoose.Schema({
			executionRatio: 'Number',
			passedRatio: 'Number',
			failedRatio: 'Number',
			blockedRatio: 'Number',
			timeElapsedRatio: 'Number',
			timeAvailableRatio: 'Number'
		})
	}
});

const Result = mongoose.model('Result', resultSchema);

function validateResult(result) {
	const schema = {
		cycleId: Joi.string().required(),
		reportingDate: Joi.date(),
		passed: Joi.number().min(0),
		failed: Joi.number().min(0),
		notCompleted: Joi.number().min(0),
		blocked: Joi.number().min(0),
		noRun: Joi.number().min(0),
	}

	return Joi.validate(result, schema);
}

exports.Result = Result;
exports.validateResult = validateResult;