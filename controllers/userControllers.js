const userService = require('../services/userServices');
const { userSchema } = require('../validation/userValidation');

/**
 * Controller to get user by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to create a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.createUser = async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to update user by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.updateUserById = async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const updatedUser = await userService.updateUserById(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to delete user by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUserById(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to fetch all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.fetchUsers = async (req, res) => {
    try {
        const users = await userService.fetchUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};