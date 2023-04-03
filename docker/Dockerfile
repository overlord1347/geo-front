FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /app
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=frontend-docker-app /app/dist .
COPY ./docker/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /entrypoint.sh
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["/entrypoint.sh", "nginx", "-g", "daemon off;"]
