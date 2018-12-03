const express = require('express');
const error = require('../middleware/error');
const users = require('../routes/users');
const auth = require('../routes/auth');
const projects = require('../routes/projects');
const cycles = require('../routes/cycles');
const cycleKpis = require('../routes/cycleKpis');
const results = require('../routes/results');
const resultKpis = require('../routes/resultKpis');
const milestones = require('../routes/milestones');
const coverages = require('../routes/coverages');
const coverageKpis = require('../routes/coverageKpis');
const bugs = require('../routes/bugs');
const bugKpis = require('../routes/bugKpis');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/projects', projects);
    app.use('/api/cycles', cycles);
    app.use('/api/cycleKpis', cycleKpis);
    app.use('/api/results', results);
    app.use('/api/resultKpis', resultKpis);
    app.use('/api/milestones', milestones);
    app.use('/api/coverages', coverages);
    app.use('/api/coverageKpis', coverageKpis);
    app.use('/api/bugs', bugs);
    app.use('/api/bugKpis', bugKpis);
    app.use(error);
};
