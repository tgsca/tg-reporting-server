const express = require('express');
const router = express.Router();
const { Defect, validateDefect } = require('../models/defect');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const validateObjectId = require('../middleware/validateObjectId');
const calculateKPIs = require('../middleware/defects/calculateKPIs');
const addMetainfos = require('../middleware/defects/addMetainfos');

router.get('/', async (req, res) => {
    const defects = await Defect.find(req.query);
    res.send(defects);
});

router.post('/', [auth, validate(validateDefect), addMetainfos, calculateKPIs], async (req, res) => {
    const defect = new Defect(req.body);
    defect.save();

    res.send(defect);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const defect = await Defect.findById(req.params.id);
    if (!defect) return res.status(404).send(`Defect with given ID ${req.params.id} could not be found.`);

    res.send(defect);
});

router.put(
    '/:id',
    [auth, validateObjectId, validate(validateDefect), addMetainfos, calculateKPIs],
    async (req, res) => {
        const defect = await Defect.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!defect) return res.status(404).send(`Defect with given ID ${req.params.id} could not be found.`);

        res.send(defect);
    }
);

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
    const defect = await Defect.findByIdAndRemove(req.params.id);
    if (!defect) return res.status(404).send(`Defect with given ID ${req.params.id} could not be found.`);

    res.send(defect);
});

module.exports = router;
