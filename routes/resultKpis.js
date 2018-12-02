const express = require('express');
const router = express.Router();
const moment = require('moment');
const { Result } = require('../models/result');
const resultKpis = require('../services/resultKpiService');
const validateObjectId = require('../middleware/validateObjectId');

function getResultKpiResponse(result) {
    const { totalCount, executed, unexecuted, passed, failed, blocked, notCompleted, noRun } = resultKpis.getBasicData(result);
    return {
        _id: result._id,
        reportingDate: moment(result.reportingDate).valueOf(),
        cycle: {
            _id: result.cycle._id,
            name: result.cycle.name,
            project: {
                _id: result.cycle.project._id,
                name: result.cycle.project.name
            }
        },
        totalCount,
        executed,
        executedRatio: resultKpis.getExecutedRatio(result),
        passed,
        passedRatioAbs: resultKpis.getPassedRatioAbs(result),
        passedRatioRel: resultKpis.getPassedRatioRel(result),
        failed,
        failedRatioAbs: resultKpis.getFailedRatioAbs(result),
        failedRatioRel: resultKpis.getFailedRatioRel(result),
        unexecuted,
        unexecutedRatio: resultKpis.getUnexecutedRatio(result),
        blocked,
        blockedRatioAbs: resultKpis.getBlockedRatioAbs(result),
        blockedRatioRel: resultKpis.getBlockedRatioRel(result),
        notCompleted,
        notCompletedRatioAbs: resultKpis.getNotCompletedRatioAbs(result),
        notCompletedRatioRel: resultKpis.getNotCompletedRatioRel(result),
        noRun,
        noRunRatioAbs: resultKpis.getNoRunRatioAbs(result),
        noRunRatioRel: resultKpis.getNoRunRatioRel(result)
    };
}

router.get('/', async (req, res) => {
    const results = await Result.find(req.query).sort('reportingDate');
    const kpis = [];
    for (let result of results) {
        kpis.push(getResultKpiResponse(result));
    }

    res.send(kpis);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const result = await Result.findById(req.params.id);
    if (!result) return res.status(404).send(`Result with given ID ${req.params.id} could not be found.`);

    res.send(getResultKpiResponse(result));
});

module.exports = router;
