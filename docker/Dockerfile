FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /app
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=frontend-docker-app /app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
