const express = require('express');
const userController = require('../controllers/userControllers');

const router = express.Router();

router.get('/users', userController.fetchUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;