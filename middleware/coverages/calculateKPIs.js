const { Cycle } = require('../../models/cycle');
const kpi = require('../../services/coverageKpiService');
const moment = require('moment');

module.exports = async (req, res, next) => {
    /**
     * Add SUM
     */
    const { totalCount } = kpi.getBasicData(req.body);
    req.body.sum = totalCount;

    next();
};
