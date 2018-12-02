const express = require('express');
const router = express.Router();
const { Bug, validateBug } = require('../models/bug');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const validateObjectId = require('../middleware/validateObjectId');
const calculateKPIs = require('../middleware/bugs/calculateKPIs');
const addMetainfos = require('../middleware/bugs/addMetainfos');

router.get('/', async (req, res) => {
    const bugs = await Bug.find(req.query).sort('reportingDate');
    res.send(bugs);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).send(`Bug with given ID ${req.params.id} could not be found.`);

    res.send(bug);
});

router.post('/', [auth, validate(validateBug), addMetainfos, calculateKPIs], async (req, res) => {
    const bug = new Bug(req.body);
    bug.save();

    res.send(bug);
});

router.put('/:id', [auth, validateObjectId, validate(validateBug), addMetainfos, calculateKPIs], async (req, res) => {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (!bug) return res.status(404).send(`Bug with given ID ${req.params.id} could not be found.`);

    res.send(bug);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
    const bug = await Bug.findByIdAndRemove(req.params.id);
    if (!bug) return res.status(404).send(`Bug with given ID ${req.params.id} could not be found.`);

    res.send(bug);
});

module.exports = router;
