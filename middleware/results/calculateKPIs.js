const { Cycle } = require('../../models/cycle');
const kpi = require('../../services/kpiService');

module.exports = async (req, res, next) => {
    /**
     * Prepare Time KPIs
     */
    const cycle = await Cycle.findById(req.body.cycle._id);
    const timeElapsedRatio = kpi.getTimeElapsed(
        cycle.startDate,
        cycle.endDate,
        req.body.reportingDate || null
    );
    const timeAvailableRatio = kpi.getTimeAvailable(
        cycle.startDate,
        cycle.endDate,
        req.body.reportingDate || null
    );

    /**
     * Add SUM
     */
    req.body.sum = kpi.getSum(req.body);

    /**
     * Add other KPIs
     */
    const kpis = {
        executionRatio: kpi.getExecutionRatio(req.body),
        passedRatio: kpi.getPassedRatio(req.body),
        failedRatio: kpi.getFailedRatio(req.body),
        blockedRatio: kpi.getBlockedRatio(req.body),
        timeElapsedRatio: timeElapsedRatio,
        timeAvailableRatio: timeAvailableRatio
    };
    req.body.KPIs = kpis;

    next();
};
