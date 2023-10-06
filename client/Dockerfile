FROM node:20-alpine

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
COPY webpack.config.js .
RUN npm install

COPY . .

CMD ["npm", "start"]