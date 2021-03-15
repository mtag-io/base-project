FROM node:slim

ARG NODE_ENV=DEVELOPMENT
ENV NODE_ENV="${NODE_ENV}"

WORKDIR /home/node
RUN cd /home/node

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install
RUN yarn build

COPY . .

CMD ["node", "/home/node/dist/main.js"]