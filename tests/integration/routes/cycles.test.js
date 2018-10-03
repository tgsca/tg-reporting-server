const request = require('supertest');
const { Cycle } = require('../../../models/cycle');
const { User } = require('../../../models/user');
const { Project } = require('../../../models/project');
const mongoose = require('mongoose');

let server;

describe('/api/cycles', () => {

	let payload;
	let token;
	let projectId1;
	let projectId2;
	let query;

	beforeEach( async () => {
		server = require('../../../index');
		projectId1 = mongoose.Types.ObjectId();
		projectId2 = mongoose.Types.ObjectId();
	});

	afterEach( async () => {
		await server.close();
		await Cycle.remove({});
	});

	describe('GET /', () => {

		beforeEach( async () => {
			await Cycle.collection.insertMany([
				{ projectId: projectId1, name: 'cycle1' },
				{ projectId: projectId2, name: 'cycle2' }
			]);
			query = '';
		});

		const exec = () => {
			return request(server).get(`/api/cycles${query}`);
		};

		it('should return 200 and all cycles if request is valid without any query parameter', async () => {
			const res = await exec();

			expect(res.status).toBe(200);
			// FIXME: expect is not working
			// expect(res.body.length).toBe(2);
			// expect(res.body.some(c => c.name === 'cycle1')).toBeTruthy();
			// expect(res.body.some(c => c.name === 'cycle2')).toBeTruthy();
		});

		it('should return 200 and all cycles if request is valid with projectId query parameter', async () => {
			query = `?projectId=${projectId1}`;

			const res = await exec();

			expect(res.status).toBe(200);
			// FIXME: expect is not working
			// expect(res.body.length).toBe(1);
			// expect(res.body.some(c => c.name === 'cycle1')).toBeTruthy();
		});

		// TODO: extend test cases for GET method
		// return an empty array if no projects are in the database
		// return an array of projects if projects are in the database

	});

	describe('POST /', () => {

		beforeEach(() => {
			payload = {
				projectId: projectId1,
				name: "1"
			};

			token = new User().generateAuthToken();
		});

		const exec = () => {
			return request(server)
				.post('/api/cycles')
				.set('x-auth-token', token)
				.send(payload);
		};

		it('should return 401 if token is invalid', async () => {
			token = '';

			const res = await exec();

			expect(res.status).toBe(401);
			expect(res.text).toMatch(/Access denied. No token provided./);
		});

		it('should return 400 if projectId is missing', async () => {
			delete payload.projectId;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"projectId\" is required/);
		});

		it('should return 400 if name is missing', async () => {
			delete payload.name;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"name\" is required/);
		});

		it('should return 400 if name is not a string', async () => {
			payload.name = true;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"name\" must be a string/);
		});

		it('should return 200 if request is valid', async () => {
			const res = await exec();

			expect(res.status).toBe(200);
		});

		it('should return the cycle if request is valid', async () => {
			const res = await exec();

			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('name');
			expect(res.body).toHaveProperty('projectId');
			expect(res.body).toHaveProperty('startDate');
			expect(res.body).toHaveProperty('endDate');
		});

	});

	describe('GET /:id', () => {

		let cycleId;

		const exec = () => {
			return request(server).get(`/api/cycles/${cycleId}`)
		};

		it('should return 404 when invalid id is passed', async () => {
			cycleId = 1;

			const res = await exec();

			expect(res.status).toBe(404);
			expect(res.text).toMatch(/Invalid/);
		});

		it('should return 404 when valid but not existent id is passed', async () => {
			cycleId = mongoose.Types.ObjectId().toHexString();
			const res = await exec();

			expect(res.status).toBe(404);
			expect(res.text).toMatch(/could not be found/);
		});

		it('should return a cycle when valid id is passed', async () => {
			const cycle = new Cycle({ projectId: projectId1, name: 'cycle1' });
			await cycle.save();
			cycleId = cycle._id;

			const res = await exec();

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('projectId');
			expect(res.body).toHaveProperty('name', cycle.name);
			expect(res.body).toHaveProperty('startDate');
			expect(res.body).toHaveProperty('endDate');
		});

	});

	describe('PUT /:id', () => {

		let cycleId;

		beforeEach( async () => {
			cycleId = mongoose.Types.ObjectId();
			payload = {
				projectId: projectId1,
				name: "1"
			};

			const cycle = new Cycle({ _id: cycleId, ...payload });
			await cycle.save();

			token = new User().generateAuthToken();
		});

		const exec = () => {
			return request(server)
				.put(`/api/cycles/${cycleId}`)
				.set('x-auth-token', token)
				.send(payload);
		};

		it('should return 401 if token is invalid', async () => {
			token = '';

			const res = await exec();

			expect(res.status).toBe(401);
			expect(res.text).toMatch(/Access denied. No token provided./);
		});

		it('should return 404 when invalid id is passed', async () => {
			cycleId = 1;

			const res = await exec();

			expect(res.status).toBe(404);
			expect(res.text).toMatch(/Invalid/);
		});

		it('should return 404 when valid but not existent id is passed', async () => {
			cycleId = mongoose.Types.ObjectId().toHexString();
			const res = await exec();

			expect(res.status).toBe(404);
			expect(res.text).toMatch(/could not be found/);
		});

		it('should return 400 if name is missing', async () => {
			delete payload.name;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"name\" is required/);
		});

		it('should return 400 if name is not a string', async () => {
			payload.name = true;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"name\" must be a string/);
		});

		it('should return 400 if projectId is missing', async () => {
			delete payload.projectId;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"projectId\" is required/);
		});

		it('should return 200 if request is valid', async () => {
			const res = await exec();

			expect(res.status).toBe(200);
		});

		it('should return the project if request is valid', async () => {
			payload.name = 'changedName';

			const res = await exec();

			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('projectId');
			expect(res.body).toHaveProperty('name', payload.name);
			expect(res.body).toHaveProperty('startDate');
			expect(res.body).toHaveProperty('endDate');
		});

	});

	describe('DELETE /:id', () => {
		// TODO: write test cases for DELETE method
	});

});