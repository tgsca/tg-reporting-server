const express = require('express');
const router = express.Router();
const { Cycle, validateCycle } = require('../models/cycle');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const validateObjectId = require('../middleware/validateObjectId');
const addMetainfos = require('../middleware/cycles/addMetainfos');

router.get('/', async (req, res) => {
	const cycles = await Cycle.find( req.query );
	res.send(cycles);
});

router.post('/', [auth, validate(validateCycle), addMetainfos], async (req, res) => {
	const cycle = new Cycle(req.body);
	cycle.save();

	res.send(cycle);
});

router.get('/:id', validateObjectId, async (req, res) => {
	const cycle = await Cycle.findById(req.params.id);
	if (!cycle) return res.status(404).send(`Cycle with given ID ${req.params.id} could not be found.`);

	res.send(cycle);	
});

router.put('/:id', [auth, validateObjectId, validate(validateCycle), addMetainfos], async (req, res) => {
	const cycle = await Cycle.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!cycle) return res.status(404).send(`Cycle with given ID ${req.params.id} could not be found.`);

	res.send(cycle);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
	const cycle = await Cycle.findByIdAndRemove(req.params.id);
	if (!cycle) return res.status(404).send(`Cycle with given ID ${req.params.id} could not be found.`);

	res.send(cycle);
});

module.exports = router;