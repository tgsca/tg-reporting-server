function getBasicData(input = {}) {
    const basis = {};

    basis['covered'] = input.covered ? input.covered : 0;

    basis['blocked'] = input.onHold ? input.onHold : 0;
    basis['inProgress'] = input.inProgress ? input.inProgress : 0;
    basis['open'] = input.open ? input.open : 0;
    basis['uncovered'] = basis.blocked + basis.inProgress + basis.open;

    basis['totalCount'] = basis.covered + basis.uncovered;

    return basis;
}

const f = 5;

function getCoverageRatio(input = {}) {
    const { covered, totalCount } = getBasicData(input);
    return totalCount !== 0 ? Number((covered / totalCount).toFixed(f)) : 0;
}

function getUncoveredRatio(input = {}) {
    const { uncovered, totalCount } = getBasicData(input);
    return totalCount !== 0 ? Number((uncovered / totalCount).toFixed(f)) : 0;
}

function getBlockedRatioAbs(input = {}) {
    const { blocked, totalCount } = getBasicData(input);
    return totalCount !== 0 ? Number((blocked / totalCount).toFixed(f)) : 0;
}

function getBlockedRatioRel(input = {}) {
    const { blocked, uncovered } = getBasicData(input);
    return uncovered !== 0 ? Number((blocked / uncovered).toFixed(f)) : 0;
}

function getInProgressRatioAbs(input = {}) {
    const { inProgress, totalCount } = getBasicData(input);
    return totalCount !== 0 ? Number((inProgress / totalCount).toFixed(f)) : 0;
}

function getInProgressRatioRel(input = {}) {
    const { inProgress, uncovered } = getBasicData(input);
    return uncovered !== 0 ? Number((inProgress / uncovered).toFixed(f)) : 0;
}

function getOpenRatioAbs(input = {}) {
    const { open, totalCount } = getBasicData(input);
    return totalCount !== 0 ? Number((open / totalCount).toFixed(f)) : 0;
}

function getOpenRatioRel(input = {}) {
    const { open, uncovered } = getBasicData(input);
    return uncovered !== 0 ? Number((open / uncovered).toFixed(f)) : 0;
}

exports.getBasicData = getBasicData;
exports.getCoverageRatio = getCoverageRatio;
exports.getUncoveredRatio = getUncoveredRatio;
exports.getBlockedRatioAbs = getBlockedRatioAbs;
exports.getBlockedRatioRel = getBlockedRatioRel;
exports.getInProgressRatioAbs = getInProgressRatioAbs;
exports.getInProgressRatioRel = getInProgressRatioRel;
exports.getOpenRatioAbs = getOpenRatioAbs;
exports.getOpenRatioRel = getOpenRatioRel;
