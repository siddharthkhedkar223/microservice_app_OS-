const { getUserById, createUser, updateUserById, deleteUserById, fetchUsers } = require('../services/userServices');
const { User } = require('../models');

jest.mock('../models');

describe('User Services', () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getUserById', () => {
        /**
         * Test case for fetching user by ID successfully.
         */
        test('should fetch user by ID successfully', async () => {
            User.findByPk.mockResolvedValue(mockUser);

            const result = await getUserById(1);

            expect(User.findByPk).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockUser);
        });

        /**
         * Test case for user not found.
         */
        test('should return null if user not found', async () => {
            User.findByPk.mockResolvedValue(null);

            const result = await getUserById(1);

            expect(User.findByPk).toHaveBeenCalledWith(1);
            expect(result).toBeNull();
        });

        /**
         * Test case for error fetching user.
         */
        test('should throw error if fetching user fails', async () => {
            User.findByPk.mockRejectedValue(new Error('Error fetching user'));

            await expect(getUserById(1)).rejects.toThrow('Error fetching user: Error fetching user');
        });
    });

    describe('createUser', () => {
        /**
         * Test case for creating user successfully.
         */
        test('should create user successfully', async () => {
            User.create.mockResolvedValue(mockUser);

            const result = await createUser(mockUser);

            expect(User.create).toHaveBeenCalledWith(mockUser);
            expect(result).toEqual(mockUser);
        });

        /**
         * Test case for error creating user.
         */
        test('should throw error if creating user fails', async () => {
            User.create.mockRejectedValue(new Error('Error creating user'));

            await expect(createUser(mockUser)).rejects.toThrow('Error creating user: Error creating user');
        });
    });

    describe('updateUserById', () => {
        /**
         * Test case for updating user successfully.
         */
        test('should update user successfully', async () => {
            User.update.mockResolvedValue([1]);
            User.findByPk.mockResolvedValue(mockUser);

            const result = await updateUserById(1, { name: 'Jane Doe' });

            expect(User.update).toHaveBeenCalledWith({ name: 'Jane Doe' }, { where: { id: 1 } });
            expect(result).toEqual(mockUser);
        });

        /**
         * Test case for user not found.
         */
        test('should return null if user not found', async () => {
            User.update.mockResolvedValue([0]);

            const result = await updateUserById(1, { name: 'Jane Doe' });

            expect(User.update).toHaveBeenCalledWith({ name: 'Jane Doe' }, { where: { id: 1 } });
            expect(result).toBeNull();
        });

        /**
         * Test case for error updating user.
         */
        test('should throw error if updating user fails', async () => {
            User.update.mockRejectedValue(new Error('Error updating user'));

            await expect(updateUserById(1, { name: 'Jane Doe' })).rejects.toThrow('Error updating user: Error updating user');
        });
    });

    describe('deleteUserById', () => {
        /**
         * Test case for deleting user successfully.
         */
        test('should delete user successfully', async () => {
            User.destroy.mockResolvedValue(1);

            const result = await deleteUserById(1);

            expect(User.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toBeUndefined();
        });

        /**
         * Test case for user not found.
         */
        test('should return null if user not found', async () => {
            User.destroy.mockResolvedValue(0);

            const result = await deleteUserById(1);

            expect(User.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toBeNull();
        });

        /**
         * Test case for error deleting user.
         */
        test('should throw error if deleting user fails', async () => {
            User.destroy.mockRejectedValue(new Error('Error deleting user'));

            await expect(deleteUserById(1)).rejects.toThrow('Error deleting user: Error deleting user');
        });
    });

    describe('fetchUsers', () => {
        /**
         * Test case for fetching all users successfully.
         */
        test('should fetch all users successfully', async () => {
            User.findAll.mockResolvedValue([mockUser]);

            const result = await fetchUsers();

            expect(User.findAll).toHaveBeenCalled();
            expect(result).toEqual([mockUser]);
        });

        /**
         * Test case for error fetching users.
         */
        test('should throw error if fetching users fails', async () => {
            User.findAll.mockRejectedValue(new Error('Error fetching users'));

            await expect(fetchUsers()).rejects.toThrow('Error fetching users: Error fetching users');
        });
    });
});