FROM node:24

WORKDIR /globetrotter

COPY backend/package*.json ./backend/

WORKDIR /globetrotter/backend

RUN npm install

COPY backend/ .

EXPOSE 5000

CMD ["npm", "start"]