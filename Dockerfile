    FROM node:alpine
    WORKDIR /home/node/app
    COPY package.json .
    RUN npm install
    COPY . .
    RUN npm run build
    CMD ["node", "./dist/index.js"]
