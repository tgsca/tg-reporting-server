const express = require('express');
const error = require('../middleware/error');
const users = require('../routes/users');
const auth = require('../routes/auth');
const projects = require('../routes/projects');
const cycles = require('../routes/cycles');
const results = require('../routes/results');
const milestones = require('../routes/milestones');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/projects', projects);
    app.use('/api/cycles', cycles);
    app.use('/api/results', results);
    app.use('/api/milestones', milestones);
    app.use(error);
};
