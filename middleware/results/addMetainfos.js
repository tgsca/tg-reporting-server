const { Project } = require('../../models/project');
const { Cycle } = require('../../models/cycle');

module.exports = async (req, res, next) => {
	const cycle = await Cycle.findById(req.body.cycleId);
	const project = await Project.findById(cycle.project._id);
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