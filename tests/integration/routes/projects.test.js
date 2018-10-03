const request = require('supertest');
const { Project } = require('../../../models/project');
const { User } = require('../../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/projects', () => {

	let payload;
	let token;

	beforeEach(() => { server = require('../../../index'); });

	afterEach( async () => {
		await server.close();
		await Project.remove({});
	});

	describe('GET /', () => {

		const exec = () => request(server).get('/api/projects');

		it('should return 200 if request is valid', async () => {
			const res = await exec();

			expect(res.status).toBe(200);
		});

		// return an empty array if no projects are in the database
		// return an array of projects if projects are in the database

	});

	describe('POST /', () => {

		beforeEach(() => {
			payload = {
				name: "1",
				description: "1"
			};

			token = new User().generateAuthToken();
		});

		const exec = () => {
			return request(server)
				.post('/api/projects')
				.set('x-auth-token', token)
				.send(payload);
		};

		it('should return 401 if token is invalid', async () => {
			token = '';

			const res = await exec();

			expect(res.status).toBe(401);
			expect(res.text).toMatch(/Access denied. No token provided./);
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

		it('should return 400 if description is not a string', async () => {
			payload.description = true;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"description\" must be a string/);
		});

		it('should return 200 if request is valid', async () => {
			const res = await exec();

			expect(res.status).toBe(200);
		});

		it('should return the project if request is valid', async () => {
			const res = await exec();

			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('name');
		});

	});

	describe('GET /:id', () => {

		let projectId;

		const exec = () => {
			return request(server).get(`/api/projects/${projectId}`)
		};

		it('should return 404 when invalid id is passed', async () => {
			projectId = 1;

			const res = await exec();

			expect(res.status).toBe(404);
			expect(res.text).toMatch(/Invalid/);
		});

		it('should return 404 when valid but not existent id is passed', async () => {
			projectId = mongoose.Types.ObjectId().toHexString();
			const res = await exec();

			expect(res.status).toBe(404);
			expect(res.text).toMatch(/could not be found/);
		});

		it('should return a project when valid id is passed', async () => {
			const project = new Project({ name: 'project1', description: 'descr' });
			await project.save();
			projectId = project._id;

			const res = await exec();

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('name', project.name);
			expect(res.body).toHaveProperty('description', project.description);
		});

	});

	describe('PUT /:id', () => {

		let projectId;

		beforeEach( async () => {
			projectId = mongoose.Types.ObjectId();
			payload = {
				name: "1",
				description: "1"
			};

			const project = new Project({ _id: projectId, ...payload });
			await project.save();

			token = new User().generateAuthToken();
		});

		const exec = () => {
			return request(server)
				.put(`/api/projects/${projectId}`)
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
			projectId = 1;

			const res = await exec();

			expect(res.status).toBe(404);
			expect(res.text).toMatch(/Invalid/);
		});

		it('should return 404 when valid but not existent id is passed', async () => {
			projectId = mongoose.Types.ObjectId().toHexString();
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

		it('should return 400 if description is not a string', async () => {
			payload.description = true;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"description\" must be a string/);
		});

		it('should return 200 if request is valid', async () => {
			const res = await exec();

			expect(res.status).toBe(200);
		});

		it('should return the project if request is valid', async () => {
			payload.name = 'changedName';
			payload.description = 'changedDescription';

			const res = await exec();

			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('name', payload.name);
			expect(res.body).toHaveProperty('description', payload.description);
		});

	});

	describe('DELETE /:id', () => {
		//TODO
	});

});