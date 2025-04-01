# Stage 1: Build React client
FROM node:16-alpine AS client-builder
WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Build TypeScript server
FROM node:22-alpine AS server-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

# Stage 3: Run application
FROM node:22-alpine
WORKDIR /app

# Copy server production dependencies
COPY package*.json ./

# Copy compiled server code from server-builder
COPY --from=server-builder /app/dist ./dist
# Copy client build to public directory
COPY --from=client-builder /app/build ./dist/public
# Copy node_modules from server-builder
COPY --from=server-builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Start the server
CMD ["node", "dist/server.js"]