const request = require('supertest');

let server;

describe('/api/auth', () => {
	let payload;

	beforeEach(() => {
		server = require('../../../index');
		payload = {
			email: 'andreas@sczepanski.de',
			password: '1234'
		};
	});

	afterEach(async () => {
		await server.close();
	});

	const exec = () => {
		return request(server).post('/api/auth').send(payload);
	};

	it('should return 400 if email is missing', async () => {
		delete payload.email;

		const res = await exec();

		expect(res.status).toBe(400);
	});

	it('should return 400 if password is missing', async () => {
		delete payload.password;

		const res = await exec();

		expect(res.status).toBe(400);
	});
});

// return 400 if user is not found
// return 400 if password is incorrect
// return 200 if request is valid
// return token if request is valid
