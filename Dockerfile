# Stage 1

FROM node:10-alpine as build-step

WORKDIR /usr/src/app

COPY . .

# COPY /root/TempLogger/frontend-microservice/TempLoggerFront/package.json /usr/src/app
# RUN cd TempLoggerFront ??? HOW
RUN npm install


# RUN npm run build --prod

# Stage 2

# FROM nginx:1.17.1-alpine

# COPY --from=build-step /usr/src/app/docs /usr/share/nginx/html

