FROM node:21.5.0-slim as build

ARG SERVER_URL_CALC_API

ENV VITE_SERVER_URL_CALC_API=${SERVER_URL_CALC_API}

RUN echo ${SERVER_URL_CALC_API}

WORKDIR /build
COPY . /build

RUN npm install
RUN npm run build

FROM node:21.5.0-alpine3.18 as deploy

ENV NODE_ENV=production

WORKDIR /app
COPY --from=build /build/package.json /app
COPY --from=build /build/server.js /app
COPY --from=build /build/dist /app/dist

RUN npm install --ommit=dev

CMD node server
