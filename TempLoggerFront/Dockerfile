FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package.json package-lock.json

RUN npm cache clean --force
RUN npm i

# Bundle app source
COPY . .
CMD ["npm", "run", "start"]
# RUN npm run start

