const { Cycle } = require('../../models/cycle');
const kpi = require('../../services/resultKpiService');
const moment = require('moment');

module.exports = async (req, res, next) => {
    /**
     * Prepare Time KPIs
     */
    const cycle = await Cycle.findOne({ _id: req.body.cycle._id }).exec();

    const current = new moment(req.body.reportingDate);
    const start = new moment(cycle.startDate);
    const end = new moment(cycle.endDate);

    const cycleDuration = moment.duration(start.diff(end));
    const elapsedDuration = start < current ? moment.duration(start.diff(current)) : 0;
    const availableDuration = current < end ? moment.duration(current.diff(end)) : 0;

    const timeElapsedRatio = cycleDuration !== 0 ? (elapsedDuration / cycleDuration).toFixed(2) : 0;
    const timeAvailableRatio = cycleDuration !== 0 ? (availableDuration / cycleDuration).toFixed(2) : 0;

    /**
     * Add SUM
     */
    req.body.sum = kpi.getResultSum(req.body);

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
