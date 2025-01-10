const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4'
    },
    logging: false, // Disable logging for tests
});

const connectWithRetry = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('Database & tables created!');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    }
};

connectWithRetry();

module.exports = sequelize;