const kpi = require('../../services/bugKpiService');

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
        open,
        fixed,
        totalCount
    } = kpi.getBasicData(req.body);

    req.body.new = { ...n };
    req.body.inClarification = { ...inClarification };
    req.body.inImplementation = { ...inImplementation };
    req.body.inInstallation = { ...inInstallation };
    req.body.inRetest = { ...inRetest };
    req.body.closed = { ...closed };
    req.body.rejected = { ...rejected };
    req.body.open = { ...open };
    req.body.fixed = { ...fixed };
    req.body.sum = { ...totalCount };

    next();
};
