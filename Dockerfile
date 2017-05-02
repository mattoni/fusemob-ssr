FROM node:alpine

RUN ["apk", "add", "--update", "git"]

COPY . /src

EXPOSE 80 443

WORKDIR /src

RUN ["yarn", "prod-build"]
RUN mv build/*-server.js build/server.js
CMD ["node", "build/server.js"]
