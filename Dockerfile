FROM node:18-alpine3.15 as build

RUN REACT_APP_API_URL=http://localhost:4000

COPY . /opt/app

WORKDIR /opt/app

RUN npm install --legacy-peer-deps

RUN npm run build

FROM nginx:1.23.2-alpine

COPY --from=build /opt/app/build /usr/share/nginx/html


