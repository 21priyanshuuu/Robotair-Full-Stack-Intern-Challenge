# Use the official Node.js image from the Docker Hub
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the React app
COPY . /app

# Expose the port that React will run on
EXPOSE 3000

# Run the React app
CMD ["npm", "start"]
