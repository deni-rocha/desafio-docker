FROM node:18.12-alpine

WORKDIR /api

COPY . .

RUN rm -rf node_modules .vscode vercel.json

RUN npm install

RUN npm run build

CMD ./scripts/start.sh

EXPOSE 3030