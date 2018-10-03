const request = require('supertest');
const { User } = require('../../../models/user');

let server;

describe('/api/users', () => {

	beforeEach(() => { server = require('../../../index'); });

	afterEach( async () => {
		await server.close();
		await User.remove({});
	});

	describe('POST /', () => {

		let payload;

		beforeEach(() => {
			payload = {
				name: "12",
				email: "andreas@sczepanski.de",
				password: "p"
			};
		});

		const exec = () => request(server).post('/api/users').send(payload);

		it('should return 400 if name is missing', async () => {
			delete payload.name;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"name\" is required/);
		});

		it('should return 400 if name is too short', async () => {
			payload.name = '1';

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"name\" length must be at least 2 characters long/);
		});

		it('should return 400 if name is not a string', async () => {
			payload.name = true;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"name\" must be a string/);
		});

		it('should return 400 if email is missing', async () => {
			delete payload.email;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"email\" is required/);
		});

		it('should return 400 if email is not valid', async () => {
			payload.email = 'e';

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"email\" must be a valid email/);
		});

		it('should return 400 if email is not a string', async () => {
			payload.email = true;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"email\" must be a string/);
		});

		it('should return 400 if password is missing', async () => {
			delete payload.password;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"password\" is required/);
		});

		it('should return 400 if password is not a string', async () => {
			payload.password = true;

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/\"password\" must be a string/);
		});

		it('should return 400 if email is already registered', async () => {
			const user = new User(payload);
			await user.save();

			const res = await exec();

			expect(res.status).toBe(400);
			expect(res.text).toMatch(/User with e-mail 'andreas@sczepanski.de' already registered./);
		});

		it('should return 200 if user is registered successfully', async () => {
			const res = await exec();

			expect(res.status).toBe(200);
		});

		it('should return x-auth-token if user is registered successfully', async () => {
			const res = await exec();

			expect(res.header).toHaveProperty('x-auth-token');
		});

		it('should return user without password if user is registered successfully', async () => {
			const res = await exec();

			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('name');
			expect(res.body).toHaveProperty('email');
			expect(res.body).not.toHaveProperty('password');
		});
	});

	describe('GET /me', () => {
		// return current user without password
	});

});