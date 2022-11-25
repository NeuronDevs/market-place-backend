FROM node:16
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y python
RUN npm install
RUN npm rebuild bcrypt --build-from-source
CMD ["node","server.js"]
EXPOSE 4000
