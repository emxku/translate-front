# =============================================================================
# Stage 1: Builder
# =============================================================================
FROM --platform=linux/amd64 node:22-alpine AS builder

# Install dependencies for node-gyp (if needed)
RUN apk add --no-cache libc-dev

WORKDIR /app

# Copy dependency files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --prefer-offline

# Copy source code
COPY . .

# Build the application
RUN npm run build

# =============================================================================
# Stage 2: Runner
# =============================================================================
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Use non-root user (nginx runs as nginx by default)
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
