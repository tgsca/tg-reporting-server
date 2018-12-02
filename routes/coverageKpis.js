const express = require('express');
const router = express.Router();
const { Coverage } = require('../models/coverage');
const coverageKpis = require('../services/coverageKpiService');
const validateObjectId = require('../middleware/validateObjectId');

function getCoverageKpiResponse(coverage) {
    const { totalCount, covered, uncovered, blocked, inProgress, open } = coverageKpis.getBasicData(coverage);
    return {
        _id: coverage._id,
        reportingDate: coverage.reportingDate,
        cycle: {
            _id: coverage.cycle._id,
            name: coverage.cycle.name,
            project: {
                _id: coverage.cycle.project._id,
                name: coverage.cycle.project.name
            }
        },
        totalCount,
        covered,
        coverageRatio: coverageKpis.getCoverageRatio(coverage),
        uncovered,
        uncoveredRatio: coverageKpis.getUncoveredRatio(coverage),
        blocked,
        blockedRatioAbs: coverageKpis.getBlockedRatioAbs(coverage),
        blockedRatioRel: coverageKpis.getBlockedRatioRel(coverage),
        inProgress,
        inProgressRatioAbs: coverageKpis.getInProgressRatioAbs(coverage),
        inProgressRatioRel: coverageKpis.getInProgressRatioRel(coverage),
        open,
        openRatioAbs: coverageKpis.getOpenRatioAbs(coverage),
        openRatioRel: coverageKpis.getOpenRatioRel(coverage)
    };
}

router.get('/', async (req, res) => {
    const coverages = await Coverage.find(req.query);
    const kpis = [];
    for (let coverage of coverages) {
        kpis.push(getCoverageKpiResponse(coverage));
    }

    res.send(kpis);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const coverage = await Coverage.findById(req.params.id);
    if (!coverage) return res.status(404).send(`Coverage with given ID ${req.params.id} could not be found.`);

    res.send(getCoverageKpiResponse(coverage));
});

module.exports = router;
