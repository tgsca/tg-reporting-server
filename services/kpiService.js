const moment = require('moment');

/**
 * GENERAL TIME KPI Functions
 * @param {*} startDate
 * @param {*} endDate
 * @param {*} currentDate
 */

function getTimeElapsed(startDate, endDate, currentDate) {
    const current = new moment(currentDate);
    const start = new moment(startDate);
    const end = new moment(endDate);

    const cycleDuration = moment.duration(start.diff(end));
    const elapsedDuration = start < current ? moment.duration(start.diff(current)) : 0;

    return cycleDuration !== 0 ? (elapsedDuration / cycleDuration).toFixed(2) : 0;
}

function getTimeAvailable(startDate, endDate, currentDate) {
    const current = new moment(currentDate);
    const start = new moment(startDate);
    const end = new moment(endDate);

    const cycleDuration = moment.duration(start.diff(end));
    const availableDuration = current < end ? moment.duration(current.diff(end)) : 0;

    return cycleDuration !== 0 ? (availableDuration / cycleDuration).toFixed(2) : 0;
}

/**
 * RESULT KPI Functions
 * @param {*} input
 */

function getResultCalculationBasis(input = {}) {
    const basis = {};

    basis['passed'] = input.passed ? input.passed : 0;
    basis['failed'] = input.failed ? input.failed : 0;
    basis['notCompleted'] = input.notCompleted ? input.notCompleted : 0;
    basis['blocked'] = input.blocked ? input.blocked : 0;
    basis['noRun'] = input.noRun ? input.noRun : 0;

    basis['executed'] = basis.passed + basis.failed;
    basis['unexecuted'] = basis.notCompleted + basis.blocked + basis.noRun;
    basis['sum'] = basis.executed + basis.unexecuted;

    return basis;
}

function getExecutionRatio(input = {}) {
    const { sum, executed } = getResultCalculationBasis(input);
    return sum !== 0 ? (executed / sum).toFixed(2) : 0;
}

function getPassedRatio(input = {}) {
    const { executed, passed } = getResultCalculationBasis(input);
    return executed !== 0 ? (passed / executed).toFixed(2) : 0;
}

function getFailedRatio(input = {}) {
    const { executed, failed } = getResultCalculationBasis(input);
    return executed !== 0 ? (failed / executed).toFixed(2) : 0;
}

function getBlockedRatio(input = {}) {
    const { sum, blocked } = getResultCalculationBasis(input);
    return sum !== 0 ? (blocked / sum).toFixed(2) : 0;
}

function getResultSum(input = {}) {
    const { sum } = getResultCalculationBasis(input);
    return sum;
}

/**
 * COVERAGE KPI Functions
 * @param {*} input
 */

function getCoverageCalculationBasis(input = {}) {
    const basis = {};

    basis['covered'] = input.covered ? input.covered : 0;
    basis['onHold'] = input.onHold ? input.onHold : 0;
    basis['inProgress'] = input.inProgress ? input.inProgress : 0;
    basis['open'] = input.open ? input.open : 0;

    basis['sum'] = basis.covered + basis.onHold + basis.inProgress + basis.open;

    return basis;
}

function getCoverageRatio(input = {}) {
    const { covered, sum } = getCoverageCalculationBasis(input);
    return sum !== 0 ? (covered / sum).toFixed(2) : 0;
}

function getOnHoldRatio(input = {}) {
    const { onHold, covered, sum } = getCoverageCalculationBasis(input);
    return sum > covered ? (onHold / (sum - covered)).toFixed(2) : 0;
}

function getCoverageSum(input = {}) {
    const { sum } = getCoverageCalculationBasis(input);
    return sum;
}

exports.getTimeElapsed = getTimeElapsed;
exports.getTimeAvailable = getTimeAvailable;
exports.getExecutionRatio = getExecutionRatio;
exports.getPassedRatio = getPassedRatio;
exports.getFailedRatio = getFailedRatio;
exports.getBlockedRatio = getBlockedRatio;
exports.getResultSum = getResultSum;
exports.getCoverageRatio = getCoverageRatio;
exports.getOnHoldRatio = getOnHoldRatio;
exports.getCoverageSum = getCoverageSum;
