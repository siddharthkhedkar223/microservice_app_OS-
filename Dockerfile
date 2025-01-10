# Use a specific version of Node.js
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Expose the port the app runs on
EXPOSE 8080

# Start the app
CMD ["npm", "start"]