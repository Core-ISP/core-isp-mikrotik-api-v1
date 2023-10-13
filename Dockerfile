FROM node:16-alpine

# Copy app files
COPY . .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install

# Copy built assets from `builder` image
COPY . .

# Expose port
EXPOSE 4324

CMD ["npm", "start"]