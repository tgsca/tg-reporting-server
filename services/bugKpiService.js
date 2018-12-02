function getBasicData(input = {}) {
    const basis = {
        closed: {},
        inRetest: {},
        inInstallation: {},
        inImplementation: {},
        inClarification: {},
        new: {},
        rejected: {},
        open: {},
        fixed: {},
        totalCount: {}
    };

    const { closed: c } = input;
    basis['closed']['urgent'] = c.urgent ? c.urgent : 0;
    basis['closed']['high'] = c.high ? c.high : 0;
    basis['closed']['medium'] = c.medium ? c.medium : 0;
    basis['closed']['low'] = c.low ? c.low : 0;
    basis['closed']['unrated'] = c.unrated ? c.unrated : 0;
    basis['closed']['sum'] = basis.closed.urgent + basis.closed.high + basis.closed.medium + basis.closed.low + basis.closed.unrated;

    const { inRetest: iR } = input;
    basis['inRetest']['urgent'] = iR.urgent ? iR.urgent : 0;
    basis['inRetest']['high'] = iR.high ? iR.high : 0;
    basis['inRetest']['medium'] = iR.medium ? iR.medium : 0;
    basis['inRetest']['low'] = iR.low ? iR.low : 0;
    basis['inRetest']['unrated'] = iR.unrated ? iR.unrated : 0;
    basis['inRetest']['sum'] =
        basis.inRetest.urgent + basis.inRetest.high + basis.inRetest.medium + basis.inRetest.low + basis.inRetest.unrated;

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
        basis.rejected.urgent + basis.rejected.high + basis.rejected.medium + basis.rejected.low + basis.rejected.unrated;

    basis['open']['urgent'] =
        basis.inRetest.urgent +
        basis.inInstallation.urgent +
        basis.inImplementation.urgent +
        basis.inClarification.urgent +
        basis.new.urgent;
    basis['open']['high'] =
        basis.inRetest.high + basis.inInstallation.high + basis.inImplementation.high + basis.inClarification.high + basis.new.high;
    basis['open']['medium'] =
        basis.inRetest.medium +
        basis.inInstallation.medium +
        basis.inImplementation.medium +
        basis.inClarification.medium +
        basis.new.medium;
    basis['open']['low'] =
        basis.inRetest.low + basis.inInstallation.low + basis.inImplementation.low + basis.inClarification.low + basis.new.low;
    basis['open']['unrated'] =
        basis.inRetest.unrated +
        basis.inInstallation.unrated +
        basis.inImplementation.unrated +
        basis.inClarification.unrated +
        basis.new.unrated;
    basis['open']['sum'] = basis.open.urgent + basis.open.high + basis.open.medium + basis.open.low + basis.open.unrated;

    basis['fixed']['urgent'] = basis.closed.urgent + basis.inRetest.urgent + basis.inInstallation.urgent;
    basis['fixed']['high'] = basis.closed.high + basis.inRetest.high + basis.inInstallation.high;
    basis['fixed']['medium'] = basis.closed.medium + basis.inRetest.medium + basis.inInstallation.medium;
    basis['fixed']['low'] = basis.closed.low + basis.inRetest.low + basis.inInstallation.low;
    basis['fixed']['unrated'] = basis.closed.unrated + basis.inRetest.unrated + basis.inInstallation.unrated;
    basis['fixed']['sum'] = basis.fixed.urgent + basis.fixed.high + basis.fixed.medium + basis.fixed.low + basis.fixed.unrated;

    basis['totalCount']['urgent'] =
        basis.closed.urgent +
        basis.inRetest.urgent +
        basis.inInstallation.urgent +
        basis.inImplementation.urgent +
        basis.inClarification.urgent +
        basis.new.urgent +
        basis.rejected.urgent;
    basis['totalCount']['high'] =
        basis.closed.high +
        basis.inRetest.high +
        basis.inInstallation.high +
        basis.inImplementation.high +
        basis.inClarification.high +
        basis.new.high +
        basis.rejected.high;
    basis['totalCount']['medium'] =
        basis.closed.medium +
        basis.inRetest.medium +
        basis.inInstallation.medium +
        basis.inImplementation.medium +
        basis.inClarification.medium +
        basis.new.medium +
        basis.rejected.medium;
    basis['totalCount']['low'] =
        basis.closed.low +
        basis.inRetest.low +
        basis.inInstallation.low +
        basis.inImplementation.low +
        basis.inClarification.low +
        basis.new.low +
        basis.rejected.low;
    basis['totalCount']['unrated'] =
        basis.closed.unrated +
        basis.inRetest.unrated +
        basis.inInstallation.unrated +
        basis.inImplementation.unrated +
        basis.inClarification.unrated +
        basis.new.unrated +
        basis.rejected.unrated;
    basis['totalCount']['sum'] =
        basis.totalCount.urgent + basis.totalCount.high + basis.totalCount.medium + basis.totalCount.low + basis.totalCount.unrated;

    return basis;
}

const f = 5;

function getOpenRatio(input = {}) {
    const { totalCount, open } = getBasicData(input);
    return totalCount.sum !== 0 ? Number((open.sum / totalCount.sum).toFixed(f)) : 0;
}

function getNewRatioRel(input = {}) {
    const { new: n, open } = getBasicData(input);
    return open.sum !== 0 ? Number((n.sum / open.sum).toFixed(f)) : 0;
}

function getNewRatioAbs(input = {}) {
    const { new: n, totalCount } = getBasicData(input);
    return totalCount.sum !== 0 ? Number((n.sum / totalCount.sum).toFixed(f)) : 0;
}

function getInClarificationRatioRel(input = {}) {
    const { inClarification, open } = getBasicData(input);
    return open.sum !== 0 ? Number((inClarification.sum / open.sum).toFixed(f)) : 0;
}

function getInClarificationRatioAbs(input = {}) {
    const { inClarification, totalCount } = getBasicData(input);
    return totalCount.sum !== 0 ? Number((inClarification.sum / totalCount.sum).toFixed(f)) : 0;
}

function getInImplementationRatioRel(input = {}) {
    const { inImplementation, open } = getBasicData(input);
    return open.sum !== 0 ? Number((inImplementation.sum / open.sum).toFixed(f)) : 0;
}

function getInImplementationRatioAbs(input = {}) {
    const { inImplementation, totalCount } = getBasicData(input);
    return totalCount.sum !== 0 ? Number((inImplementation.sum / totalCount.sum).toFixed(f)) : 0;
}

function getInInstallationRatioRel(input = {}) {
    const { inInstallation, open } = getBasicData(input);
    return open.sum !== 0 ? Number((inInstallation.sum / open.sum).toFixed(f)) : 0;
}

function getInInstallationRatioAbs(input = {}) {
    const { inInstallation, totalCount } = getBasicData(input);
    return totalCount.sum !== 0 ? Number((inInstallation.sum / totalCount.sum).toFixed(f)) : 0;
}

function getInRetestRatioRel(input = {}) {
    const { inRetest, open } = getBasicData(input);
    return open.sum !== 0 ? Number((inRetest.sum / open.sum).toFixed(f)) : 0;
}

function getInRetestRatioAbs(input = {}) {
    const { inRetest, totalCount } = getBasicData(input);
    return totalCount.sum !== 0 ? Number((inRetest.sum / totalCount.sum).toFixed(f)) : 0;
}

function getFixedRatio(input = {}) {
    const { fixed, totalCount } = getBasicData(input);
    return totalCount.sum !== 0 ? Number((fixed.sum / totalCount.sum).toFixed(f)) : 0;
}

function getClosedRatio(input = {}) {
    const { closed, totalCount } = getBasicData(input);
    return totalCount.sum !== 0 ? Number((closed.sum / totalCount.sum).toFixed(f)) : 0;
}

function getRejectedRatio(input = {}) {
    const { rejected, totalCount } = getBasicData(input);
    return totalCount.sum !== 0 ? Number((rejected.sum / totalCount.sum).toFixed(f)) : 0;
}

exports.getBasicData = getBasicData;
exports.getOpenRatio = getOpenRatio;
exports.getNewRatioRel = getNewRatioRel;
exports.getNewRatioAbs = getNewRatioAbs;
exports.getInClarificationRatioRel = getInClarificationRatioRel;
exports.getInClarificationRatioAbs = getInClarificationRatioAbs;
exports.getInImplementationRatioRel = getInImplementationRatioRel;
exports.getInImplementationRatioAbs = getInImplementationRatioAbs;
exports.getInInstallationRatioRel = getInInstallationRatioRel;
exports.getInInstallationRatioAbs = getInInstallationRatioAbs;
exports.getInRetestRatioRel = getInRetestRatioRel;
exports.getInRetestRatioAbs = getInRetestRatioAbs;
exports.getFixedRatio = getFixedRatio;
exports.getClosedRatio = getClosedRatio;
exports.getRejectedRatio = getRejectedRatio;
