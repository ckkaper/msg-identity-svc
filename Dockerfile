FROM node:14.16.0

ENV NODE_ENV=dev

WORKDIR /

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/src/app.js"]