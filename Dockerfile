# Step 1: Use Node.js to build the app
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install frontend dependencies
RUN npm install

# Step 5: Copy the rest of the frontend application code
COPY . .

# Step 6: Expose the port for the React development server
EXPOSE 5000

# Step 7: Run the development server
CMD ["npm", "start"]
