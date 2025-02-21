FROM node:22-alpine

WORKDIR /app
COPY . .

# build the app
RUN npm install
RUN npm run build

CMD [ "npm", "run", "start" ]
