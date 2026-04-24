# Use official Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all backend source code
COPY . .

# Expose the port your app listens on
EXPOSE 8080

# Start command
CMD ["node", "server.js"]
