const kpi = require('../../services/kpiService');

module.exports = async (req, res, next) => {
    /**
     * Add SUM
     */
    const {
        new: n,
        inClarification,
        inImplementation,
        inInstallation,
        inRetest,
        closed,
        rejected,
        sum
    } = kpi.getCalculatedDefectBody(req.body);
    req.body.new = { ...n };
    req.body.inClarification = { ...inClarification };
    req.body.inImplementation = { ...inImplementation };
    req.body.inInstallation = { ...inInstallation };
    req.body.inRetest = { ...inRetest };
    req.body.closed = { ...closed };
    req.body.rejected = { ...rejected };
    req.body.sum = { ...sum };

    /**
     * Add other KPIs
     */
    const kpis = {
        fixedRatio: kpi.getFixedRatio(req.body),
        rejectedRatio: kpi.getRejectedRatio(req.body)
    };
    req.body.KPIs = kpis;

    next();
};
