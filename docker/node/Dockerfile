FROM node:8.12.0-alpine
RUN mkdir /app
WORKDIR /app
RUN apk --no-cache add git
EXPOSE 3001
CMD ["pm2-docker", "start", "dist/src/app.js", "--instances", "1"]
