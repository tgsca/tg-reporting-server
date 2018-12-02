function getBasicData(input = {}) {
    const basis = {};

    basis['passed'] = input.passed ? input.passed : 0;
    basis['failed'] = input.failed ? input.failed : 0;
    basis['executed'] = basis.passed + basis.failed;

    basis['blocked'] = input.blocked ? input.blocked : 0;
    basis['notCompleted'] = input.notCompleted ? input.notCompleted : 0;
    basis['noRun'] = input.noRun ? input.noRun : 0;
    basis['unexecuted'] = basis.notCompleted + basis.blocked + basis.noRun;

    basis['totalCount'] = basis.executed + basis.unexecuted;

    return basis;
}

const f = 3;

function getExecutedRatio(input = {}) {
    const { totalCount, executed } = getBasicData(input);
    return totalCount !== 0 ? Number(((executed / totalCount) * 100).toFixed(f)) : 0;
}

function getPassedRatioAbs(input = {}) {
    const { totalCount, passed } = getBasicData(input);
    return totalCount !== 0 ? Number(((passed / totalCount) * 100).toFixed(f)) : 0;
}

function getPassedRatioRel(input = {}) {
    const { executed, passed } = getBasicData(input);
    return executed !== 0 ? Number(((passed / executed) * 100).toFixed(f)) : 0;
}

function getFailedRatioAbs(input = {}) {
    const { totalCount, failed } = getBasicData(input);
    return totalCount !== 0 ? Number(((failed / totalCount) * 100).toFixed(f)) : 0;
}

function getFailedRatioRel(input = {}) {
    const { executed, failed } = getBasicData(input);
    return executed !== 0 ? Number(((failed / executed) * 100).toFixed(f)) : 0;
}

function getUnexecutedRatio(input = {}) {
    const { totalCount, unexecuted } = getBasicData(input);
    return totalCount !== 0 ? Number(((unexecuted / totalCount) * 100).toFixed(f)) : 0;
}

function getBlockedRatioAbs(input = {}) {
    const { totalCount, blocked } = getBasicData(input);
    return totalCount !== 0 ? Number(((blocked / totalCount) * 100).toFixed(f)) : 0;
}

function getBlockedRatioRel(input = {}) {
    const { unexecuted, blocked } = getBasicData(input);
    return unexecuted !== 0 ? Number(((blocked / unexecuted) * 100).toFixed(f)) : 0;
}

function getNotCompletedRatioAbs(input = {}) {
    const { totalCount, notCompleted } = getBasicData(input);
    return totalCount !== 0 ? Number(((notCompleted / totalCount) * 100).toFixed(f)) : 0;
}

function getNotCompletedRatioRel(input = {}) {
    const { unexecuted, notCompleted } = getBasicData(input);
    return unexecuted !== 0 ? Number(((notCompleted / unexecuted) * 100).toFixed(f)) : 0;
}

function getNoRunRatioAbs(input = {}) {
    const { totalCount, noRun } = getBasicData(input);
    return totalCount !== 0 ? Number(((noRun / totalCount) * 100).toFixed(f)) : 0;
}

function getNoRunRatioRel(input = {}) {
    const { unexecuted, noRun } = getBasicData(input);
    return unexecuted !== 0 ? Number(((noRun / unexecuted) * 100).toFixed(f)) : 0;
}

exports.getBasicData = getBasicData;
exports.getExecutedRatio = getExecutedRatio;
exports.getPassedRatioAbs = getPassedRatioAbs;
exports.getPassedRatioRel = getPassedRatioRel;
exports.getFailedRatioAbs = getFailedRatioAbs;
exports.getFailedRatioRel = getFailedRatioRel;
exports.getUnexecutedRatio = getUnexecutedRatio;
exports.getBlockedRatioAbs = getBlockedRatioAbs;
exports.getBlockedRatioRel = getBlockedRatioRel;
exports.getNotCompletedRatioAbs = getNotCompletedRatioAbs;
exports.getNotCompletedRatioRel = getNotCompletedRatioRel;
exports.getNoRunRatioAbs = getNoRunRatioAbs;
exports.getNoRunRatioRel = getNoRunRatioRel;
