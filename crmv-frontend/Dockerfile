
#STAGE 1
FROM node:18-slim AS build
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . /app/frontend
RUN npm run build

#STAGE 2
FROM node:18-slim
WORKDIR /app/frontend
RUN npm install -g webserver.local
COPY --from=build /app/frontend/build ./build
CMD webserver.local -d ./build