FROM node:16 AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
RUN yarn install --production

RUN sed -i -e "s|\"http\:\/\/localhost\:1337\"|window._env_.STRAPI_URL|g" ./node_modules/strapi-sdk-js/dist/index.mjs

RUN sed -i -e "s|defu(options \|\| {}, defaults);|defaults;|g" ./node_modules/strapi-sdk-js/dist/index.mjs

# Copy app files
COPY . .
# Build the app
RUN yarn build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh


# Start nginx
#CMD ["nginx", "-g", "daemon off;"]
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]