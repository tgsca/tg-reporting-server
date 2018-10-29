const express = require('express');
const router = express.Router();
const { Milestone, validateMilestone } = require('../models/milestone');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const validateObjectId = require('../middleware/validateObjectId');
const addMetainfos = require('../middleware/milestones/addMetainfos');

router.get('/', async (req, res) => {
    const milestones = await Milestone.find(req.query);
    res.send(milestones);
});

router.post(
    '/',
    [auth, validate(validateMilestone), addMetainfos],
    async (req, res) => {
        const milestone = new Milestone(req.body);
        milestone.save();

        res.send(milestone);
    }
);

router.get('/:id', validateObjectId, async (req, res) => {
    const milestone = await Milestone.findById(req.params.id);
    if (!milestone)
        return res
            .status(404)
            .send(
                `Milestone with given ID ${req.params.id} could not be found.`
            );

    res.send(milestone);
});

router.put(
    '/:id',
    [auth, validateObjectId, validate(validateMilestone), addMetainfos],
    async (req, res) => {
        const milestone = await Milestone.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );
        if (!milestone)
            return res
                .status(404)
                .send(
                    `Milestone with given ID ${
                        req.params.id
                    } could not be found.`
                );

        res.send(milestone);
    }
);

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
    const milestone = await Milestone.findByIdAndRemove(req.params.id);
    if (!milestone)
        return res
            .status(404)
            .send(
                `Milestone with given ID ${req.params.id} could not be found.`
            );

    res.send(milestone);
});

module.exports = router;
