const express = require('express');
const router = express.Router();
const { Result, validateResult } = require('../models/result');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const validateObjectId = require('../middleware/validateObjectId');
const calculateKPIs = require('../middleware/results/calculateKPIs');
const addMetainfos = require('../middleware/results/addMetainfos');

router.get('/', async (req, res) => {
	const results = await Result.find(req.query);
	res.send(results);
});

router.post('/', [auth, validate(validateResult), addMetainfos, calculateKPIs], async (req, res) => {
	const result = new Result(req.body);
	result.save();

	res.send(result);
});

router.get('/:id', validateObjectId, async (req, res) => {
	const result = await Result.findById(req.params.id);
	if (!result) return res.status(404).send(`Result with given ID ${req.params.id} could not be found.`);

	console.log(result._id.getTimestamp());

	res.send(result);	
});

router.put('/:id', [auth, validateObjectId, validate(validateResult), addMetainfos, calculateKPIs], async (req, res) => {
	const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!result) return res.status(404).send(`Result with given ID ${req.params.id} could not be found.`);

	res.send(result);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
	const result = await Result.findByIdAndRemove(req.params.id);
	if (!result) return res.status(404).send(`Result with given ID ${req.params.id} could not be found.`);

	res.send(result);
});

module.exports = router;