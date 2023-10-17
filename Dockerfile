FROM mhart/alpine-node:latest

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY .template.env /app

RUN node -v
RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm", "start"]