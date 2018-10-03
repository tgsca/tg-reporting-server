const { Project } = require('../../models/project');

module.exports = async (req, res, next) => {
	const project = await Project.findById(req.body.projectId);
	req.body.project = {
		_id: project._id,
		name: project.name
	};

	next();
};