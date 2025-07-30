# Use the official Node.js 20.17.0 slim image
FROM node:20.17.0-slim

# Create and set the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker caching for dependencies
COPY WebFrontend/temple-app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY WebFrontend/temple-app/ ./

# Create and set permissions for the node_modules cache folder
#RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# Build the Next.js app
#RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "dev"]

