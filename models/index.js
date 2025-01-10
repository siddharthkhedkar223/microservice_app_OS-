const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./userModel')(sequelize, Sequelize.DataTypes);

const db = {
    User,
    sequelize,
    Sequelize
};

module.exports = db;