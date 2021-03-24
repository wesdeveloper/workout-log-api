FROM node:12
WORKDIR /app
COPY . /app
RUN npm ci && npm run build
CMD ["npm", "start"]
