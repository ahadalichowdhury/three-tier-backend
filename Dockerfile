# Stage 1: Build
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Accept build arguments for environment variables
ARG DATABASE

# Set environment variables inside the container
ENV DATABASE=$DATABASE

# Expose port (change if necessary)
EXPOSE 5000

# Command to run the application
CMD ["node", "server.js"]
