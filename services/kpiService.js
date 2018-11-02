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

/**
 * DEFECT KPI Functions
 * @param {*} input
 */

function getDefectCalculationBasis(input = {}) {
    const basis = {
        closed: {},
        inRetest: {},
        inInstallation: {},
        inImplementation: {},
        inClarification: {},
        new: {},
        rejected: {},
        sum: {}
    };

    const { closed: c } = input;
    basis['closed']['urgent'] = c.urgent ? c.urgent : 0;
    basis['closed']['high'] = c.high ? c.high : 0;
    basis['closed']['medium'] = c.medium ? c.medium : 0;
    basis['closed']['low'] = c.low ? c.low : 0;
    basis['closed']['unrated'] = c.unrated ? c.unrated : 0;
    basis['closed']['sum'] =
        basis.closed.urgent + basis.closed.high + basis.closed.medium + basis.closed.low + basis.closed.unrated;

    const { inRetest: iR } = input;
    basis['inRetest']['urgent'] = iR.urgent ? iR.urgent : 0;
    basis['inRetest']['high'] = iR.high ? iR.high : 0;
    basis['inRetest']['medium'] = iR.medium ? iR.medium : 0;
    basis['inRetest']['low'] = iR.low ? iR.low : 0;
    basis['inRetest']['unrated'] = iR.unrated ? iR.unrated : 0;
    basis['inRetest']['sum'] =
        basis.inRetest.urgent +
        basis.inRetest.high +
        basis.inRetest.medium +
        basis.inRetest.low +
        basis.inRetest.unrated;

    const { inInstallation: iInst } = input;
    basis['inInstallation']['urgent'] = iInst.urgent ? iInst.urgent : 0;
    basis['inInstallation']['high'] = iInst.high ? iInst.high : 0;
    basis['inInstallation']['medium'] = iInst.medium ? iInst.medium : 0;
    basis['inInstallation']['low'] = iInst.low ? iInst.low : 0;
    basis['inInstallation']['unrated'] = iInst.unrated ? iInst.unrated : 0;
    basis['inInstallation']['sum'] =
        basis.inInstallation.urgent +
        basis.inInstallation.high +
        basis.inInstallation.medium +
        basis.inInstallation.low +
        basis.inInstallation.unrated;

    const { inImplementation: iImpl } = input;
    basis['inImplementation']['urgent'] = iImpl.urgent ? iImpl.urgent : 0;
    basis['inImplementation']['high'] = iImpl.high ? iImpl.high : 0;
    basis['inImplementation']['medium'] = iImpl.medium ? iImpl.medium : 0;
    basis['inImplementation']['low'] = iImpl.low ? iImpl.low : 0;
    basis['inImplementation']['unrated'] = iImpl.unrated ? iImpl.unrated : 0;
    basis['inImplementation']['sum'] =
        basis.inImplementation.urgent +
        basis.inImplementation.high +
        basis.inImplementation.medium +
        basis.inImplementation.low +
        basis.inImplementation.unrated;

    const { inClarification: iC } = input;
    basis['inClarification']['urgent'] = iC.urgent ? iC.urgent : 0;
    basis['inClarification']['high'] = iC.high ? iC.high : 0;
    basis['inClarification']['medium'] = iC.medium ? iC.medium : 0;
    basis['inClarification']['low'] = iC.low ? iC.low : 0;
    basis['inClarification']['unrated'] = iC.unrated ? iC.unrated : 0;
    basis['inClarification']['sum'] =
        basis.inClarification.urgent +
        basis.inClarification.high +
        basis.inClarification.medium +
        basis.inClarification.low +
        basis.inClarification.unrated;

    const { new: n } = input;
    basis['new']['urgent'] = n.urgent ? n.urgent : 0;
    basis['new']['high'] = n.high ? n.high : 0;
    basis['new']['medium'] = n.medium ? n.medium : 0;
    basis['new']['low'] = n.low ? n.low : 0;
    basis['new']['unrated'] = n.unrated ? n.unrated : 0;
    basis['new']['sum'] = basis.new.urgent + basis.new.high + basis.new.medium + basis.new.low + basis.new.unrated;

    const { rejected: rej } = input;
    basis['rejected']['urgent'] = rej.urgent ? rej.urgent : 0;
    basis['rejected']['high'] = rej.high ? rej.high : 0;
    basis['rejected']['medium'] = rej.medium ? rej.medium : 0;
    basis['rejected']['low'] = rej.low ? rej.low : 0;
    basis['rejected']['unrated'] = rej.unrated ? rej.unrated : 0;
    basis['rejected']['sum'] =
        basis.rejected.urgent +
        basis.rejected.high +
        basis.rejected.medium +
        basis.rejected.low +
        basis.rejected.unrated;

    basis['sum']['urgent'] =
        basis.closed.urgent +
        basis.inRetest.urgent +
        basis.inInstallation.urgent +
        basis.inImplementation.urgent +
        basis.inClarification.urgent +
        basis.new.urgent +
        basis.rejected.urgent;
    basis['sum']['high'] =
        basis.closed.high +
        basis.inRetest.high +
        basis.inInstallation.high +
        basis.inImplementation.high +
        basis.inClarification.high +
        basis.new.high +
        basis.rejected.high;
    basis['sum']['medium'] =
        basis.closed.medium +
        basis.inRetest.medium +
        basis.inInstallation.medium +
        basis.inImplementation.medium +
        basis.inClarification.medium +
        basis.new.medium +
        basis.rejected.medium;
    basis['sum']['low'] =
        basis.closed.low +
        basis.inRetest.low +
        basis.inInstallation.low +
        basis.inImplementation.low +
        basis.inClarification.low +
        basis.new.low +
        basis.rejected.low;
    basis['sum']['unrated'] =
        basis.closed.unrated +
        basis.inRetest.unrated +
        basis.inInstallation.unrated +
        basis.inImplementation.unrated +
        basis.inClarification.unrated +
        basis.new.unrated +
        basis.rejected.unrated;
    basis['sum']['sum'] = basis.sum.urgent + basis.sum.high + basis.sum.medium + basis.sum.low + basis.sum.unrated;

    return basis;
}

function getFixedRatio(input = {}) {
    const { closed, inRetest, inInstallation, sum } = getDefectCalculationBasis(input);
    const fixed = closed.sum + inRetest.sum + inInstallation.sum;

    return sum.sum !== 0 ? (fixed / sum.sum).toFixed(2) : 0;
}

function getRejectedRatio(input = {}) {
    const { rejected, sum } = getDefectCalculationBasis(input);

    return sum.sum !== 0 ? (rejected.sum / sum.sum).toFixed(2) : 0;
}

function getDefectSum(input = {}) {
    const { sum } = getDefectCalculationBasis(input);
    return sum;
}

function getCalculatedDefectBody(input = {}) {
    return getDefectCalculationBasis(input);
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

exports.getFixedRatio = getFixedRatio;
exports.getRejectedRatio = getRejectedRatio;
exports.getDefectSum = getDefectSum;
exports.getCalculatedDefectBody = getCalculatedDefectBody;
