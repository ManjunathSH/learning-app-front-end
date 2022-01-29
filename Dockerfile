FROM node:12-alpine as builder

WORKDIR /app

COPY . .

RUN npm install && npm run ng build --prod

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/learning-ui .

EXPOSE 80
