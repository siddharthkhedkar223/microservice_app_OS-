const { User } = require('../models'); // Correctly import the User model

/**
 * Get a user by ID.
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object>} The user object.
 * @throws {Error} If there is an error fetching the user.
 */
const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

/**
 * Create a new user.
 * @param {Object} user - The user object to create.
 * @returns {Promise<Object>} The created user object.
 * @throws {Error} If there is an error creating the user.
 */
const createUser = async (user) => {
    try {
        const newUser = await User.create(user);
        return newUser;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

/**
 * Update a user by ID.
 * @param {number} id - The ID of the user to update.
 * @param {Object} user - The user object with updated data.
 * @returns {Promise<Object>} The updated user object.
 * @throws {Error} If there is an error updating the user or the user is not found.
 */
const updateUserById = async (id, user) => {
    try {
        const [updated] = await User.update(user, {
            where: { id: id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(id);
            return updatedUser;
        }
        throw new Error('User not found');
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

/**
 * Delete a user by ID.
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<void>}
 * @throws {Error} If there is an error deleting the user or the user is not found.
 */
const deleteUserById = async (id) => {
    try {
        const deleted = await User.destroy({
            where: { id: id }
        });
        if (deleted) {
            return;
        }
        throw new Error('User not found');
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

/**
 * Fetch all users.
 * @returns {Promise<Array>} An array of user objects.
 * @throws {Error} If there is an error fetching the users.
 */
const fetchUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

module.exports = {
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    fetchUsers
};