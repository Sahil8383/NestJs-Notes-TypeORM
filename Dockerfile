FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y wait-for-it

CMD ["sh", "-c", "wait-for-it postgres:5432 -- npm run migration:run && npm run start:prod"]

EXPOSE 3000
