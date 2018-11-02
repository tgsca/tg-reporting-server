const mongoose = require('mongoose');
const Joi = require('joi');

const prioSchema = new mongoose.Schema({
    urgent: { type: Number, default: 0 },
    high: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    low: { type: Number, default: 0 },
    woPrio: { type: Number, default: 0 },
    sum: { type: Number, default: 0 }
});

const defectSchema = new mongoose.Schema({
    project: {
        type: new mongoose.Schema({
            name: {
                type: String,
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
        type: prioSchema
    },
    closed: {
        type: prioSchema
    },
    inRetest: {
        type: prioSchema
    },
    inInstallation: {
        type: prioSchema
    },
    inImplementation: {
        type: prioSchema
    },
    inClarification: {
        type: prioSchema
    },
    new: {
        type: prioSchema
    },
    rejected: {
        type: prioSchema
    },
    KPIs: {
        type: new mongoose.Schema({
            fixedRatio: 'Number',
            rejectedRatio: 'Number'
        })
    }
});

const Defect = mongoose.model('Defect', defectSchema);

function validateDefect(defect) {
    const statusSchema = Joi.object({
        urgent: Joi.number().min(0),
        high: Joi.number().min(0),
        medium: Joi.number().min(0),
        low: Joi.number().min(0),
        woPrio: Joi.number().min(0)
    });

    const schema = {
        projectId: Joi.string().required(),
        reportingDate: Joi.date(),
        closed: statusSchema,
        inRetest: statusSchema,
        inInstallation: statusSchema,
        inImplementation: statusSchema,
        inClarification: statusSchema,
        new: statusSchema,
        rejected: statusSchema
    };

    return Joi.validate(defect, schema);
}

exports.Defect = Defect;
exports.validateDefect = validateDefect;
