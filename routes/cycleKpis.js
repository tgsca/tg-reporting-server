const express = require('express');
const router = express.Router();
const moment = require('moment');
const { Cycle } = require('../models/cycle');
const validateObjectId = require('../middleware/validateObjectId');

function getCycleKpiResponse(cycle) {
    const current = new moment();
    const start = new moment(cycle.startDate);
    const end = new moment(cycle.endDate);

    const cycleDuration = moment.duration(start.diff(end));
    const elapsedDuration = start < current ? moment.duration(start.diff(current)) : 0;
    const availableDuration = current < end ? moment.duration(current.diff(end)) : 0;

    const timeElapsedRatio = cycleDuration !== 0 ? Number(((elapsedDuration / cycleDuration) * 100).toFixed(3)) : 0;
    const timeAvailableRatio = cycleDuration !== 0 ? Number(((availableDuration / cycleDuration) * 100).toFixed(3)) : 0;

    return {
        _id: cycle._id,
        name: cycle.name,
        startDate: cycle.startDate,
        endDate: cycle.endDate,
        project: { _id: cycle.project._id, name: cycle.project.name },
        timeElapsedRatio,
        timeAvailableRatio
    };
}

router.get('/', async (req, res) => {
    const cycles = await Cycle.find(req.query);
    const kpis = [];
    for (let cycle of cycles) {
        kpis.push(getCycleKpiResponse(cycle));
    }

    res.send(kpis);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const cycle = await Cycle.findById(req.params.id);
    if (!cycle) return res.status(404).send(`Cycle with given ID ${req.params.id} could not be found.`);

    res.send(getCycleKpiResponse(cycle));
});

module.exports = router;
