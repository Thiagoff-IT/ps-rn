# Simple Docker setup for Expo React Native app
# Based on Node LTS

FROM node:18-alpine

# create app directory
WORKDIR /app

# copy package files first to install dependencies
COPY package.json package-lock.json* ./

# install expo-cli globally and project deps
RUN npm install -g expo-cli && npm install

# copy remaining sources
COPY . .

# expose typical Expo ports
EXPOSE 19000 19001 19002

# start metro bundler; iOS devices can connect if network config allows
CMD ["npm", "start"]
