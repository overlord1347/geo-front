#FROM node:16-alpine as builder
#
#WORKDIR /vue-ui
#
## Copy the package.json and install dependencies
#COPY package*.json ./
#RUN npm install
#
## Copy rest of the files
#COPY . .
#
## Build the project
#RUN npm run build
#
#
#FROM nginx:alpine as production-build
#COPY ./nginx.conf /etc/nginx/nginx.conf
#
### Remove default nginx index page
#RUN rm -rf /usr/share/nginx/html/*
#
## Copy from the stahg 1
#COPY --from=builder /vue-ui/dist /usr/share/nginx/html
#
#EXPOSE 80
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:16 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN npm install && npm run build
CMD ["npm", "run", "watch"]

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
