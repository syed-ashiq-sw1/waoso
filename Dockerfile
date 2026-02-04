# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:prod

# Runtime stage
FROM node:18-alpine

WORKDIR /app

RUN npm install -g http-server

COPY --from=builder /app/dist/leave-application ./dist

EXPOSE 8080

CMD ["http-server", "dist", "-p", "8080", "--gzip", "-c-1"]
