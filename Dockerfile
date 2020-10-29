FROM node:14-alpine
COPY --chown=node:node package.json .
RUN npm install
COPY --chown=node:node . .
USER node
CMD npm start