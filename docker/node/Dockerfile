FROM node:8.10-alpine

RUN mkdir /app
WORKDIR /app

RUN apk --no-cache add git
RUN npm install --global pm2

CMD ["pm2-docker", "start", "dist/src/app.js", "--instances", "1"]
