# syntax=docker/dockerfile:1
   
FROM node:19-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -D nodemon
CMD ["npx","nodemon","app"]
EXPOSE 4000