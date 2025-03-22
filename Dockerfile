FROM node:18
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build
CMD ["npm", "start"] 