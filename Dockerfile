FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

COPY apps/server-old/package.json ./apps/server/package.json

RUN npm i 

COPY . .

EXPOSE 8080

CMD [ "node", "apps/server/dist/index.js"]
