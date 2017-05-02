FROM node
EXPOSE 8080
COPY . /app
WORKDIR /app

RUN chmod -R 777 /app/node_modules/
RUN cd /app; npm install
RUN chmod -Rf 777 *
#RUN cd /app; npm run server
#RUN cd /app; npm run webpack-devserver
CMD ["npm", "run", "server"]
#["node", "server/app.js"]

