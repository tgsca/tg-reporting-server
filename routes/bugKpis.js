const express = require('express');
const router = express.Router();
const moment = require('moment');
const { Bug } = require('../models/bug');
const bugKpis = require('../services/bugKpiService');
const validateObjectId = require('../middleware/validateObjectId');

function getBugKpiResponse(bug) {
    const {
        totalCount,
        open,
        new: n,
        inClarification,
        inImplementation,
        inInstallation,
        inRetest,
        fixed,
        closed,
        rejected
    } = bugKpis.getBasicData(bug);
    return {
        _id: bug._id,
        reportingDate: moment(bug.reportingDate).valueOf(),
        project: { _id: bug.project._id, name: bug.project.name },
        totalCount: totalCount.sum,
        open: open.sum,
        openRatio: bugKpis.getOpenRatio(bug),
        new: n.sum,
        newRatioRel: bugKpis.getNewRatioRel(bug),
        newRatioAbs: bugKpis.getNewRatioAbs(bug),
        inClarification: inClarification.sum,
        inClarificationRatioRel: bugKpis.getInClarificationRatioRel(bug),
        inClarificationRatioAbs: bugKpis.getInClarificationRatioAbs(bug),
        inImplementation: inImplementation.sum,
        inImplementationRatioRel: bugKpis.getInImplementationRatioRel(bug),
        inImplementationRatioAbs: bugKpis.getInImplementationRatioAbs(bug),
        inInstallation: inInstallation.sum,
        inInstallationRatioRel: bugKpis.getInInstallationRatioRel(bug),
        inInstallationRatioAbs: bugKpis.getInInstallationRatioAbs(bug),
        inRetest: inRetest.sum,
        inRetestRatioRel: bugKpis.getInRetestRatioRel(bug),
        inRetestRatioAbs: bugKpis.getInRetestRatioAbs(bug),
        closed: closed.sum,
        closedRatio: bugKpis.getClosedRatio(bug),
        fixed: fixed.sum,
        fixedRatio: bugKpis.getFixedRatio(bug),
        rejected: rejected.sum,
        rejectedRatio: bugKpis.getRejectedRatio(bug)
    };
}

router.get('/', async (req, res) => {
    const bugs = await Bug.find(req.query).sort('reportingDate');
    const kpis = [];
    for (let bug of bugs) {
        kpis.push(getBugKpiResponse(bug));
    }

    res.send(kpis);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).send(`Bug with given ID ${req.params.id} could not be found.`);

    res.send(getBugKpiResponse(bug));
});

module.exports = router;
