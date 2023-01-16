# FROM node:16.13

# WORKDIR /usr/src/app

# COPY . . 

# CMD ["node","index.js"]

FROM node:12.19-alpine as Builder

LABEL stage=Builder 

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN apk add --update git openssh-client && npm install

COPY --chown=node:node . ./

RUN npm run webpack-dev

# # RUN APPLICATION

FROM node:12.19-alpine  as Runner

WORKDIR /usr/src/app

COPY --chown=node:node --from=Builder /usr/src/app/node_modules ./node_modules

COPY --chown=node:node --from=Builder /usr/src/app/dist ./dist

COPY --chown=node:node ./builds ./dist/builds

RUN mkdir -p logs && chown -R node:node logs && mkdir -p uploads && chown -R node:node uploads

EXPOSE 7983

USER node

CMD ["node", "./dist/app.bundle.js"]