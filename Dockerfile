# Use stable nginx base
FROM nginx:stable-alpine

# Remove default content (optional)
RUN rm -rf /usr/share/nginx/html/*

# Copy site files
# If your static build output is in ./dist, change the source accordingly:
COPY ./src /usr/share/nginx/html

# Copy custom nginx config if present
# If you didn't create nginx.conf, this line can be removed.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port inside container (NPM will connect to this)
EXPOSE 80

# Keep nginx running in foreground
CMD ["nginx", "-g", "daemon off;"]
