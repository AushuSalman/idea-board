# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install system dependencies (needed for prisma + pg_isready)
RUN apk add --no-cache bash postgresql-client

# Copy package files & install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 4000

# Set environment variables (default values, docker-compose will override)
ENV PORT=4000
ENV DATABASE_URL="postgresql://postgres:postgres@db:5432/ideaboard?schema=public"

# Start app
CMD npx prisma migrate deploy && npm start

