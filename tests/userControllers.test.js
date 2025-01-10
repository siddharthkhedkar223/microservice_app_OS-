const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const userService = require('../services/userServices');

jest.mock('../services/userServices');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('User Controllers', () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/users/:id', () => {
        /**
         * Test case for fetching user by ID successfully.
         */
        test('should fetch user by ID successfully', async () => {
            userService.getUserById.mockResolvedValue(mockUser);

            const response = await request(app).get('/api/users/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
        });

        /**
         * Test case for user not found.
         */
        test('should return 404 if user not found', async () => {
            userService.getUserById.mockResolvedValue(null);

            const response = await request(app).get('/api/users/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'User not found' });
        });

        /**
         * Test case for error fetching user.
         */
        test('should return 500 if fetching user fails', async () => {
            userService.getUserById.mockRejectedValue(new Error('Error fetching user'));

            const response = await request(app).get('/api/users/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error fetching user' });
        });
    });

    describe('POST /api/users', () => {
        /**
         * Test case for creating user successfully.
         */
        test('should create user successfully', async () => {
            userService.createUser.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/api/users')
                .send(mockUser);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockUser);
        });

        /**
         * Test case for validation failure.
         */
        test('should return 400 if validation fails', async () => {
            const invalidUser = { name: 'JD', email: 'invalid-email', role: 'Admin' };

            const response = await request(app)
                .post('/api/users')
                .send(invalidUser);

            expect(response.status).toBe(400);
            expect(response.body.message).toBeDefined();
        });

        /**
         * Test case for error creating user.
         */
        test('should return 500 if creating user fails', async () => {
            userService.createUser.mockRejectedValue(new Error('Error creating user'));

            const response = await request(app)
                .post('/api/users')
                .send(mockUser);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error creating user' });
        });
    });

    describe('PUT /api/users/:id', () => {
        /**
         * Test case for updating user successfully.
         */
        test('should update user successfully', async () => {
            userService.updateUserById.mockResolvedValue(mockUser);

            const response = await request(app)
                .put('/api/users/1')
                .send({ name: 'Jane Doe' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
        });

        /**
         * Test case for validation failure.
         */
        test('should return 400 if validation fails', async () => {
            const invalidUser = { name: 'JD', email: 'invalid-email', role: 'Admin' };

            const response = await request(app)
                .put('/api/users/1')
                .send(invalidUser);

            expect(response.status).toBe(400);
            expect(response.body.message).toBeDefined();
        });

        /**
         * Test case for user not found.
         */
        test('should return 404 if user not found', async () => {
            userService.updateUserById.mockResolvedValue(null);

            const response = await request(app)
                .put('/api/users/1')
                .send({ name: 'Jane Doe' });

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'User not found' });
        });

        /**
         * Test case for error updating user.
         */
        test('should return 500 if updating user fails', async () => {
            userService.updateUserById.mockRejectedValue(new Error('Error updating user'));

            const response = await request(app)
                .put('/api/users/1')
                .send({ name: 'Jane Doe' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error updating user' });
        });
    });

    describe('DELETE /api/users/:id', () => {
        /**
         * Test case for deleting user successfully.
         */
        test('should delete user successfully', async () => {
            userService.deleteUserById.mockResolvedValue(undefined);

            const response = await request(app).delete('/api/users/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'User deleted successfully' });
        });

        /**
         * Test case for user not found.
         */
        test('should return 404 if user not found', async () => {
            userService.deleteUserById.mockResolvedValue(null);

            const response = await request(app).delete('/api/users/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'User not found' });
        });

        /**
         * Test case for error deleting user.
         */
        test('should return 500 if deleting user fails', async () => {
            userService.deleteUserById.mockRejectedValue(new Error('Error deleting user'));

            const response = await request(app).delete('/api/users/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error deleting user' });
        });
    });

    describe('GET /api/users', () => {
        /**
         * Test case for fetching all users successfully.
         */
        test('should fetch all users successfully', async () => {
            userService.fetchUsers.mockResolvedValue([mockUser]);

            const response  = await request(app).get('/api/users');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([mockUser]);
        });

        /**
         * Test case for error fetching users.
         */
        test('should return 500 if fetching users fails', async () => {
            userService.fetchUsers.mockRejectedValue(new Error('Error fetching users'));

            const response = await request(app).get('/api/users');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error fetching users' });
        });
    });
});