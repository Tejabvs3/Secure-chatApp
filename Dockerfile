# Use Node.js base image
FROM node:18

# Set working directory for the backend
WORKDIR /app

# Copy package.json and package-lock.json (to optimize caching)
COPY Backend/package*.json ./

# Install all dependencies
RUN npm install

# Copy all backend files
COPY Backend/ ./

# Expose port 5001
EXPOSE 5001

# Start the backend server
CMD ["node", "server.js"]
