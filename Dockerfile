# syntax=docker/dockerfile:1

# BUILD IMAGE
FROM node:slim as build-image
## define build dir
WORKDIR /build-output
## kopi package*.json dan install module 
COPY package*.json ./
RUN npm install
# kopi seluruh proyek ke dalam direktori
COPY . .
## build server, ini akan menghasilkan output di .next/standalone
RUN npm run build


# SERVING IMAGE
FROM node:slim AS prod-image
## define serving directory
WORKDIR /surreal-server
## kopi hasil build ke dalam serving image direktori
COPY --from=build-image /build-output/.next/standalone/* .
## kopi aset statik ke dalam serving image direktori
COPY --from=build-image /build-output/.next/static .
## set ENV flag aplikasi berjalan dalam kontainer
ENV DALAM_KONTAINER true
## set nilai environment kontainer dari secrets repo github
RUN --mount=type=secret,id=NAMA_DOMAIN \
    --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=REDIS_USER \
    --mount=type=secret,id=REDIS_PASS \
    --mount=type=secret,id=REDIS_HOST \
    --mount=type=secret,id=REDIS_PORT \
    export NAMA_DOMAIN=$(cat /run/secrets/NAMA_DOMAIN) && \
    export DATABASE_URL=$(cat /run/secrets/DATABASE_URL) && \
    export REDIS_USER=$(cat /run/secrets/REDIS_USER) && \
    export REDIS_PASS=$(cat /run/secrets/REDIS_PASS) && \
    export REDIS_HOST=$(cat /run/secrets/REDIS_HOST) && \
    export REDIS_PORT=$(cat /run/secrets/REDIS_PORT) && \
    export NODE_ENV=production
## expose port untuk serving
EXPOSE 3000
## jalankan server
ENTRYPOINT ["node", "server.js"]

