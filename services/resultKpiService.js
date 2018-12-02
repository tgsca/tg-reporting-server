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

exports.getExecutionRatio = getExecutionRatio;
exports.getPassedRatio = getPassedRatio;
exports.getFailedRatio = getFailedRatio;
exports.getBlockedRatio = getBlockedRatio;
exports.getResultSum = getResultSum;
