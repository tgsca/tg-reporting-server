const moment = require('moment');

function getTimeElapsed(startDate, endDate, currentDate) {
    const current = new moment(currentDate);
    const start = new moment(startDate);
    const end = new moment(endDate);

    const cycleDuration = moment.duration(start.diff(end));
    const elapsedDuration =
        start < current ? moment.duration(start.diff(current)) : 0;

    return cycleDuration !== 0
        ? (elapsedDuration / cycleDuration).toFixed(2)
        : 0;
}

function getTimeAvailable(startDate, endDate, currentDate) {
    const current = new moment(currentDate);
    const start = new moment(startDate);
    const end = new moment(endDate);

    const cycleDuration = moment.duration(start.diff(end));
    const availableDuration =
        current < end ? moment.duration(current.diff(end)) : 0;

    return cycleDuration !== 0
        ? (availableDuration / cycleDuration).toFixed(2)
        : 0;
}

function getCalculationBasis(input = {}) {
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
    const { sum, executed } = getCalculationBasis(input);
    return sum !== 0 ? (executed / sum).toFixed(2) : 0;
}

function getPassedRatio(input = {}) {
    const { executed, passed } = getCalculationBasis(input);
    return executed !== 0 ? (passed / executed).toFixed(2) : 0;
}

function getFailedRatio(input = {}) {
    const { executed, failed } = getCalculationBasis(input);
    return executed !== 0 ? (failed / executed).toFixed(2) : 0;
}

function getBlockedRatio(input = {}) {
    const { sum, blocked } = getCalculationBasis(input);
    return sum !== 0 ? (blocked / sum).toFixed(2) : 0;
}

function getSum(input = {}) {
    const { sum } = getCalculationBasis(input);
    return sum;
}

exports.getTimeElapsed = getTimeElapsed;
exports.getTimeAvailable = getTimeAvailable;
exports.getExecutionRatio = getExecutionRatio;
exports.getPassedRatio = getPassedRatio;
exports.getFailedRatio = getFailedRatio;
exports.getBlockedRatio = getBlockedRatio;
exports.getSum = getSum;
