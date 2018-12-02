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

exports.getCoverageRatio = getCoverageRatio;
exports.getOnHoldRatio = getOnHoldRatio;
exports.getCoverageSum = getCoverageSum;
