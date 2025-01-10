const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Use user routes
app.use('/api', userRoutes);

// Use custom error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});