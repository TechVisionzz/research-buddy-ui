FROM node:16
# Installing libvips-dev for sharp compatability
RUN apt-get update && apt-get install libvips-dev -y
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./
#COPY ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH
ENV NODE_ENV=production
RUN yarn config set network-timeout 600000 -g
RUN yarn install
WORKDIR /opt/app
COPY ./ .
RUN yarn build
EXPOSE 1337
CMD ["yarn", "start"]
