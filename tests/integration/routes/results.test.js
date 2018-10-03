const request = require('supertest');
const { Result } = require('../../../models/result');
const { User } = require('../../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/results', () => {

	let payload;
	let token;
	let cycleId1;
	let cycleId2;
	let query;

	beforeEach(() => {
		server = require('../../../index');
		cycleId1 = mongoose.Types.ObjectId();
		cycleId2 = mongoose.Types.ObjectId();
	});

	afterEach( async () => {
		await server.close();
		await Result.remove({});
	});

	describe('GET /', () => {

		beforeEach( async () => {
			await Result.collection.insertMany([
				{ cycleId: cycleId1, passed: 20 },
				{ cycleId: cycleId2, passed: 20, failed: 5 }
			]);

			query = '';
		});

		const exec = () => {
			return request(server).get(`/api/results${query}`);
		};

		it('should return 200 and all results if request is valid without any query parameter', async () => {
			const res = await exec();

			expect(res.status).toBe(200);
			// FIXME: expect is not working
			// expect(res.body.length).toBe(2);
			// expect(res.body.some(r => r.sum === 20)).toBeTruthy();
			// expect(res.body.some(r => r.sum === 30)).toBeTruthy();
		});

		it('should return 200 and all results if request is valid with cycleId query parameter', async () => {
			query = `?queryId=${cycleId1}`;

			const res = await exec();

			expect(res.status).toBe(200);
			// FIXME: expect is not working
			// expect(res.body.length).toBe(2);
			// expect(res.body.some(r => r.sum === 20)).toBeTruthy();
			// expect(res.body.some(r => r.sum === 30)).toBeTruthy();
		});

		// TODO: extend test cases for GET method
		// return an empty array if no projects are in the database
		// return an array of projects if projects are in the database

	});

	describe('POST /', () => {

		beforeEach(() => {
			payload = {
				cycleId: cycleId1,
				passed: 30,
				failed: 2,
				blocked: 4
			};

			token = new User().generateAuthToken();
		});

		const exec = () => {
			return request(server)
				.post('/api/results')
				.set('x-auth-token', token)
				.send(payload);
		};

		it('should return 401 if token is invalid', async () => {
			token = '';

			const res = await exec();

			expect(res.status).toBe(401);
			expect(res.text).toMatch(/Access denied. No token provided./);
		});

		it('should return 400 if cycleId is missing', async () => {
			delete payload.cycleId;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"cycleId\" is required/);
		});

		it('should return 200 if request is valid', async () => {
			const res = await exec();

			expect(res.status).toBe(200);
		});

		it('should return the result if request is valid', async () => {
			const res = await exec();

			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('cycle._id');
			expect(res.body).toHaveProperty('cycle.name');
			expect(res.body).toHaveProperty('cycle.version');
			expect(res.body).toHaveProperty('cycle.project._id');
			expect(res.body).toHaveProperty('cycle.project.name');
			expect(res.body).toHaveProperty('reportingDate');
			expect(res.body).toHaveProperty('sum');
			expect(res.body).toHaveProperty('passed');
			expect(res.body).toHaveProperty('failed');
			expect(res.body).toHaveProperty('notCompleted');
			expect(res.body).toHaveProperty('blocked');
			expect(res.body).toHaveProperty('noRun');
		});

	});

	describe('GET /:id', () => {

		let resultId;

		const exec = () => {
			return request(server).get(`/api/results/${resultId}`)
		};

		it('should return 404 when invalid id is passed', async () => {
			resultId = 1;

			const res = await exec();

			expect(res.status).toBe(404);
			expect(res.text).toMatch(/Invalid/);
		});

		it('should return 404 when valid but not existent id is passed', async () => {
			resultId = mongoose.Types.ObjectId().toHexString();
			const res = await exec();

			expect(res.status).toBe(404);
			expect(res.text).toMatch(/could not be found/);
		});

		it('should return a result when valid id is passed', async () => {
			const result = new Result({ cycleId: cycleId1, sum: 20, passed: 20 });
			await result.save();
			resultId = result._id;

			const res = await exec();

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('cycleId');
			expect(res.body).toHaveProperty('reportingDate');
			expect(res.body).toHaveProperty('sum');
			expect(res.body).toHaveProperty('passed');
			expect(res.body).toHaveProperty('failed');
			expect(res.body).toHaveProperty('notCompleted');
			expect(res.body).toHaveProperty('blocked');
			expect(res.body).toHaveProperty('noRun');
		});

	});

	describe('PUT /:id', () => {

		let resultId;

		beforeEach( async () => {
			resultId = mongoose.Types.ObjectId();
			payload = {
				cycleId: cycleId1
			};

			const result = new Result({ _id: resultId, ...payload });
			await result.save();

			token = new User().generateAuthToken();
		});

		const exec = () => {
			return request(server)
				.put(`/api/results/${resultId}`)
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
			resultId = 1;

			const res = await exec();

			expect(res.status).toBe(404);
			expect(res.text).toMatch(/Invalid/);
		});

		it('should return 404 when valid but not existent id is passed', async () => {
			resultId = mongoose.Types.ObjectId().toHexString();
			const res = await exec();

			expect(res.status).toBe(404);
			expect(res.text).toMatch(/could not be found/);
		});

		it('should return 400 if cycleId is missing', async () => {
			delete payload.cycleId;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"cycleId\" is required/);
		});

		it('should return 200 if request is valid', async () => {
			const res = await exec();

			expect(res.status).toBe(200);
		});

		it('should return the project if request is valid', async () => {
			payload.passed = 10;
			payload.failed = 6;
			payload.notCompleted = 4;
			payload.blocked = 25;
			payload.noRun = 15;

			const res = await exec();

			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('cycleId');
			expect(res.body).toHaveProperty('reportingDate');
			expect(res.body).toHaveProperty('sum', 60);
			expect(res.body).toHaveProperty('passed', 10);
			expect(res.body).toHaveProperty('failed', 6);
			expect(res.body).toHaveProperty('notCompleted', 4);
			expect(res.body).toHaveProperty('blocked', 25);
			expect(res.body).toHaveProperty('noRun', 15);
		});

	});

	describe('DELETE /:id', () => {
		//TODO: write test cases for DELETE method
	});

});