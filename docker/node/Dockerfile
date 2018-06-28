FROM node:10.5.0-alpine

RUN mkdir /app
WORKDIR /app

RUN apk --no-cache add git
RUN npm upgrade 
RUN npm install --global pm2
EXPOSE 3001

CMD ["pm2-docker", "start", "dist/src/app.js", "--instances", "1"]
