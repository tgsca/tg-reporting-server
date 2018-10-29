const mongoose = require('mongoose');
const Joi = require('joi');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const Project = mongoose.model('Project', projectSchema);

function validateProject(project) {
    const schema = {
        name: Joi.string().required(),
        description: Joi.string()
    };

    return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validateProject = validateProject;
