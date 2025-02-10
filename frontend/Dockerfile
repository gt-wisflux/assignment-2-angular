# Use Node.js as base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose Angular's development server port
EXPOSE 4200

# Start the Angular app in development mode with live reload
CMD ["npm", "run", "start"]

