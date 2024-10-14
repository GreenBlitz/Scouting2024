FROM node:22-alpine3.19

WORKDIR /app
COPY . .

RUN npm i

CMD ["npm", "run", "full", "--", "--host"]
