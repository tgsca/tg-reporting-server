const mongoose = require('mongoose');
const Joi = require('joi');

const milestoneSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    color: {
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
});

const Milestone = mongoose.model('Milestone', milestoneSchema);

function validateMilestone(milestone) {
    const schema = {
        projectId: Joi.string().required(),
        date: Joi.date().required(),
        label: Joi.string().required(),
        color: Joi.string()
    };

    return Joi.validate(milestone, schema);
}

exports.Milestone = Milestone;
exports.validateMilestone = validateMilestone;
