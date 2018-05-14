FROM node:8.11.1-slim

WORKDIR /home/app

COPY . ${WORKDIR}

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org \
    && cnpm install

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]