const mongoose = require('mongoose');
const Joi = require('joi');

const coverageSchema = new mongoose.Schema({
    cycle: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            version: {
                type: String
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
    covered: {
        type: Number,
        default: 0
    },
    onHold: {
        type: Number,
        default: 0
    },
    inProgress: {
        type: Number,
        default: 0
    },
    open: {
        type: Number,
        default: 0
    },
    KPIs: {
        type: new mongoose.Schema({
            coverageRatio: 'Number',
            onHoldRatio: 'Number',
            timeElapsedRatio: 'Number',
            timeAvailableRatio: 'Number'
        })
    }
});

const Coverage = mongoose.model('Coverage', coverageSchema);

function validateCoverage(coverage) {
    const schema = {
        cycleId: Joi.string().required(),
        reportingDate: Joi.date(),
        covered: Joi.number().min(0),
        onHold: Joi.number().min(0),
        inProgress: Joi.number().min(0),
        open: Joi.number().min(0)
    };

    return Joi.validate(coverage, schema);
}

exports.Coverage = Coverage;
exports.validateCoverage = validateCoverage;
