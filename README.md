# Microservice App

This is a simple microservice application built with Node.js, Express, Sequelize, and MySQL. The application provides basic CRUD operations for managing users, with validation using Joi and testing using Jest and Supertest.

## Features

- Create, read, update, and delete users
- Input validation with Joi
- Unit and integration tests with Jest and Supertest
- Environment variable management with dotenv
- Database connection and ORM with Sequelize and MySQL

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MySQL (v5.7 or higher)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/microservice_app.git
cd microservice_app
npm install 
```
### Generate Databases and Tables
Run the following command to create the database and tables:
```bash 
npx sequelize-cli db:migrate

npm start
```

## API Endpoints 
### Create user 
```bash 
curl -X POST http://localhost:8080/api/users \
     -H "Content-Type: application/json" \
     -d '{
           "name": "John Doe",
           "email": "john.doe@example.com",
           "role": "Admin"
         }'
         
```

### Get All Users 
```bash 
curl -X GET http://localhost:8080/api/users
         
```
### Get  User by ID 
```bash 
curl -X GET http://localhost:8080/api/users/1
         
 ```
### Update a User by ID

```bash 
curl -X PUT http://localhost:8080/api/users/1 \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Jane Doe",
           "email": "jane.doe@example.com",
           "role": "User"
         }'
```
### Delete a User by ID

```bash 
curl -X DELETE http://localhost:8080/api/users/1         
 ```

## Running Tests
```bash 
npm test 
```

## Project structure 

microservice_app/
├── config/
│   └── db.js                # Database configuration and connection
├── controllers/
│   └── userControllers.js   # User controller functions
├── middlewares/
│   └── errorHandler.js      # Custom error handling middleware
├── migrations/
│   └── 20250109114032-update-column-lengths.js  # Database migration files
├── models/
│   ├── index.js             # Sequelize model index
│   └── userModel.js         # User model definition
├── routes/
│   └── userRoutes.js        # User routes definition
├── services/
│   └── userServices.js      # User service functions
├── tests/
│   ├── userControllers.test.js  # Unit tests for user controllers
│   └── userServices.test.js     # Unit tests for user services
├── validation/
│   └── userValidation.js    # Joi validation schemas
├── .env                     # Environment variables
├── .sequelizerc             # Sequelize CLI configuration
├── index.js                 # Entry point of the application
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Lockfile for project dependencies
└── README.md                # Project documentation




## Use of Github Copilot 
GitHub Copilot  helped to  generate JSDoc comments for  functions.
GitHub Copilot  helped to  unit tests .




## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements
Node.js
Express
Sequelize
MySQL
Joi
Jest
Supertest
GitHub Copilot
