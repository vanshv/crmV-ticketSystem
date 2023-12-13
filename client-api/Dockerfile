
FROM node:18-slim
WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]