FROM node
EXPOSE 8080
COPY . /app
WORKDIR /app

RUN cd /app; npm install
#RUN cd /app; npm run server
#RUN cd /app; npm run webpack-devserver
CMD ["npm", "run", "server"]
#["node", "server/app.js"]

