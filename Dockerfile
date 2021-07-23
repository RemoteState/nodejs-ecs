# docker image of node 14-alpine
# insted of 14-alpine use the docker SHA digest, this will always insure deterministic nature
# ref for why we should do this https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
FROM node:14-alpine@sha256:fb6cb918cc72869bd625940f42a7d8ae035c4e786d08187b94e8b91c6a534dfd

# Set the timezone in docker
RUN apk add --no-cache tzdata
ENV TZ Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install dumb init
RUN apk add dumb-init

# Create Directory for the Container
WORKDIR /usr/src/app

# Set user rights
COPY --chown=node:node . /usr/src/app

# Copy package info to directory
COPY package.json .
COPY package-lock.json .

# Do not copy source, only build
COPY dist/ .

# Set node env type to production
ENV NODE_ENV production

# Install all Packages of production version
RUN npm ci --only=production

# Set user
USER node

# Start
CMD [ "dumb-init", "node", "dist/src/index.js" ]
EXPOSE 3000
