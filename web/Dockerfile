#build image
FROM node:18.20-alpine as BUILD_IMAGE

#declare build time environment variables
#ARG SERVER_BASE_URL

#set defaul values for environment variables
#ENV SERVER_BASE_URL=$SERVER_BASE_URL

#build app
WORKDIR /app/react-app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build 


#production image
FROM nginx:stable-alpine3.20 as PRODUCTION_IMAGE

WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=BUILD_IMAGE /app/react-app/dist . 

WORKDIR /etc/nginx/conf.d
COPY --from=BUILD_IMAGE /app/react-app/nginx-config/default.conf .

WORKDIR /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

