# Build de Angular 20
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --configuration=production

# NGINX
FROM nginx:alpine

# Copia archivos contruidos
COPY --from=builder /app/dist/ammo-app/browser /usr/share/nginx/html