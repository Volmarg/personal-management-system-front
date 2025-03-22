FROM node:14.21.3-bullseye

# # Install some packages for easier work in docker
RUN apt-get update && apt-get install nano curl -y;

# # Prod dependencies
RUN npm i http-server -g;