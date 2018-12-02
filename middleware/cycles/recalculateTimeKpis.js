const moment = require('moment');
const { Result } = require('../../models/result');

module.exports = async (req, res, next) => {
    if (req.params.id) {
        const query = Result.find({ 'cycle._id': req.params.id });

        query.exec(function(err, results) {
            for (let result of results) {
                const current = new moment(req.body.reportingDate);
                const start = new moment(cycle.startDate);
                const end = new moment(cycle.endDate);

                const cycleDuration = moment.duration(start.diff(end));
                const elapsedDuration = start < current ? moment.duration(start.diff(current)) : 0;
                const availableDuration = current < end ? moment.duration(current.diff(end)) : 0;

                const timeElapsedRatio = cycleDuration !== 0 ? (elapsedDuration / cycleDuration).toFixed(2) : 0;
                const timeAvailableRatio = cycleDuration !== 0 ? (availableDuration / cycleDuration).toFixed(2) : 0;

                result.KPIs['timeElapsedRatio'] = timeElapsedRatio;
                result.KPIs['timeAvailableRatio'] = timeAvailableRatio;

                result.save();
            }
        });
    }

    next();
};
