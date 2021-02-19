FROM node:lts-alpine3.10

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

EXPOSE 3000

CMD ["npm", "run", "dev"]