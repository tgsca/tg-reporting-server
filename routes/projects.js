const express = require('express');
const router = express.Router();
const { Project, validateProject } = require('../models/project');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const validateObjectId = require('../middleware/validateObjectId');

router.get('/', async (req, res) => {
    const projects = await Project.find();
    res.send(projects);
});

router.post('/', [auth, validate(validateProject)], async (req, res) => {
    const project = new Project(req.body);
    project.save();

    res.send(project);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project)
        return res
            .status(404)
            .send(`Project with given ID ${req.params.id} could not be found.`);

    res.send(project);
});

router.put(
    '/:id',
    [auth, validateObjectId, validate(validateProject)],
    async (req, res) => {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description
            },
            { new: true }
        );
        if (!project)
            return res
                .status(404)
                .send(
                    `Project with given ID ${req.params.id} could not be found.`
                );

        res.send(project);
    }
);

// TODO: delete assigned cycles and results as well
router.delete('/:id', [auth, validateObjectId], async (req, res) => {
    const project = await Project.findByIdAndRemove(req.params.id);
    if (!project)
        return res
            .status(404)
            .send(`Project with given ID ${req.params.id} could not be found.`);

    res.send(project);
});

module.exports = router;
