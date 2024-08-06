ARG NODE_VERSION=22.5.1

FROM node:${NODE_VERSION}-alpine3.20

WORKDIR /home/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . /home/app

RUN npx prisma generate

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && yarn dev"]
