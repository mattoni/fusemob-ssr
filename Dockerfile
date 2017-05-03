FROM node:alpine
RUN ["apk", "add", "--update", "git"]
COPY . /src
EXPOSE 80 443
WORKDIR /src
RUN ["yarn", "prod-build"]
RUN mv build/*-server.js build/server.js

FROM node:alpine
COPY --from=0 /src/build /fusemob/build
COPY --from=0 /src/node_modules /fusemob/node_modules
WORKDIR /fusemob
CMD ["node", "build/server.js"]
