const { Project } = require('../../models/project');

module.exports = async (req, res, next) => {
    const project = await Project.findOne({ _id: req.body.projectId }).exec();
    req.body.project = {
        _id: project._id,
        name: project.name
    };

    next();
};
