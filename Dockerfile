FROM node:16-alpine as builder

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install

# Bundle static assets with nginx
FROM node:16-alpine as production

# Copy built assets from `builder` image
COPY . .

# Expose port
EXPOSE 4324