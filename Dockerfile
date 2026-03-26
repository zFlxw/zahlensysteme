# Stage 1: Build the SvelteKit app
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package info and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of your source code and build
COPY . .
RUN npm run build

# Stage 2: Serve the static files using Nginx
FROM nginx:alpine
# Copy the built assets from Stage 1 to Nginx's public folder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
