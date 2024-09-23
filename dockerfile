FROM node:14.21.3-bullseye

# # Install some packages for easier work in docker
RUN     yes | apt-get install nano \
    &&  yes | apt-get install curl;

# # Prod dependencies
RUN npm i http-server -g;