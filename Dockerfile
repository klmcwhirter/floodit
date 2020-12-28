FROM nginx:alpine

COPY ./dist/floodit /usr/share/nginx/app
COPY ./etc /etc
