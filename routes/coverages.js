const express = require('express');
const router = express.Router();
const { Coverage, validateCoverage } = require('../models/coverage');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const validateObjectId = require('../middleware/validateObjectId');
const calculateKPIs = require('../middleware/coverages/calculateKPIs');
const addMetainfos = require('../middleware/coverages/addMetainfos');

router.get('/', async (req, res) => {
    const coverages = await Coverage.find(req.query);
    res.send(coverages);
});

router.post('/', [auth, validate(validateCoverage), addMetainfos, calculateKPIs], async (req, res) => {
    const coverage = new Coverage(req.body);
    coverage.save();

    res.send(coverage);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const coverage = await Coverage.findById(req.params.id);
    if (!coverage) return res.status(404).send(`Coverage with given ID ${req.params.id} could not be found.`);

    res.send(coverage);
});

router.put(
    '/:id',
    [auth, validateObjectId, validate(validateCoverage), addMetainfos, calculateKPIs],
    async (req, res) => {
        const coverage = await Coverage.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!coverage) return res.status(404).send(`Coverage with given ID ${req.params.id} could not be found.`);

        res.send(coverage);
    }
);

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
    const coverage = await Coverage.findByIdAndRemove(req.params.id);
    if (!coverage) return res.status(404).send(`Coverage with given ID ${req.params.id} could not be found.`);

    res.send(coverage);
});

module.exports = router;
