FROM node:22.5-alpine3.20

WORKDIR /home/app

COPY package.json /home/app
COPY yarn.lock /home/app

RUN yarn install

COPY . /home/app

RUN npx prisma generate

CMD ["sh", "-c", "npx prisma migrate deploy && yarn dev"]
