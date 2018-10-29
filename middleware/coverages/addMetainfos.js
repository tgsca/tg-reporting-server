const { Project } = require('../../models/project');
const { Cycle } = require('../../models/cycle');

module.exports = async (req, res, next) => {
    const cycle = await Cycle.findOne({ _id: req.body.cycleId }).exec();
    const project = await Project.findOne({ _id: cycle.project._id }).exec();
    req.body.cycle = {
        _id: cycle._id,
        name: cycle.name,
        version: cycle.version,
        project: {
            _id: project._id,
            name: project.name
        }
    };

    next();
};
