const moment = require('moment');
const { Result } = require('../../models/result');
const kpi = require('../../services/kpiService');

module.exports = async (req, res, next) => {
    if (req.params.id) {
        const query = Result.find({ 'cycle._id': req.params.id });

        query.exec(function(err, results) {
            for (let result of results) {
                const timeElapsedRatio = kpi.getTimeElapsed(
                    req.body.startDate,
                    req.body.endDate,
                    result.reportingDate
                );
                const timeAvailableRatio = kpi.getTimeAvailable(
                    req.body.startDate,
                    req.body.endDate,
                    result.reportingDate
                );

                result.KPIs['timeElapsedRatio'] = timeElapsedRatio;
                result.KPIs['timeAvailableRatio'] = timeAvailableRatio;

                result.save();
            }
        });
    }

    next();
};
