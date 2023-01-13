FROM node:latest

WORKDIR /app

COPY ["package.json", "package-lock.json*", "nodemon.json", "./"]

EXPOSE 3001

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]