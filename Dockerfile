# Use Node.js as the base image
FROM node:18

# Install system dependencies required for Cypress
RUN apt-get update && apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and Cypress
RUN npm install
RUN npx cypress install

# Copy the rest of the application
COPY . .

# Set display port to avoid crash
ENV DISPLAY=:99

# Command to run Cypress
CMD ["npm", "run", "cypress:run"] 