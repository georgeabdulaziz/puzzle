FROM node:12-alpine
RUN apk add --no-cache python g++ make
WORKDIR /puzzle
COPY . .
RUN yarn install --production
CMD ["node", "index.js"]