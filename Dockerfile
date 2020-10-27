FROM node:12-alpine
COPY package.json .
RUN npm install
COPY --chown=node:node . .
USER node
CMD npm start