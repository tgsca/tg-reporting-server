const { Cycle } = require('../../models/cycle');
const moment = require('moment');

module.exports = async (req, res, next) => {
	/**
	 * Prepare Count KPIs
	 */
	const passed = (req.body.passed) ? req.body.passed : 0;
	const failed = (req.body.failed) ? req.body.failed : 0;
	const notCompleted = (req.body.notCompleted) ? req.body.notCompleted : 0;
	const blocked = (req.body.blocked) ? req.body.blocked : 0;
	const noRun = (req.body.noRun) ? req.body.noRun : 0;

	const executed = passed + failed;
	const unexecuted = notCompleted + blocked + noRun;
	const sum = executed + unexecuted;

	/**
	 * Prepare Time KPIs
	 */
	const cycle = await Cycle.findById(req.body.cycle._id);
	const now = new moment();
	const start = new moment(cycle.startDate);
	const end = new moment(cycle.endDate);
	const cycleDuration = moment.duration(start.diff(end));
	const elapsedDuration = (start < now) ? moment.duration(start.diff(now)) : 0;
	const availableDuration = (now < end) ? moment.duration(now.diff(end)) : 0;

	/**
	 * Add SUM
	 */
	req.body.sum = sum;

	/**
	 * Add other KPIs
	 */
	const kpis = {
		executionRatio: (sum !== 0 ) ? (executed / sum).toFixed(2) : 0,
		passedRatio: (executed !== 0) ? (passed / executed).toFixed(2) : 0,
		failedRatio: (executed !== 0) ? (failed / executed).toFixed(2) : 0,
		blockedRatio: (sum !== 0) ? (blocked / sum).toFixed(2) : 0,
		timeElapsedRatio: (cycleDuration !== 0) ? (elapsedDuration / cycleDuration).toFixed(2) : 0,
		timeAvailableRatio: (cycleDuration !== 0) ? (availableDuration / cycleDuration).toFixed(2) : 0
	};
	req.body.KPIs = kpis;

	next();
};