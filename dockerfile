FROM ubuntu:jammy

# Required else the ubuntu installation qill ask for timezone in interactive mode
ARG DEBIAN_FRONTEND=noninteractive;

# Need to fix acces to bin/sh for the node installer.
SHELL ["/bin/bash", "-c"]

# Requirement to be able to install any packages at all
RUN yes | apt-get update;

# Install some packages for easier work in docker
RUN     yes | apt-get install nano \
    &&  yes | apt-get install curl;

# Installing specific node version
RUN     touch ~/.bash_profile \
    &&  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash \
    &&  source ~/.nvm/nvm.sh \
    &&  nvm install v14.18.1;

# Need to expose internal container port to allow mapping it to some port that will be accesible outside of container
EXPOSE 4001 80 8080

RUN ln -s /root/.nvm/versions/node/v14.18.1/bin/npm  /usr/bin/npm;
RUN ln -s /root/.nvm/versions/node/v14.18.1/bin/npx  /usr/bin/npx;
RUN ln -s /root/.nvm/versions/node/v14.18.1/bin/node /usr/bin/node;

# Solves issue with not being able to run globally installed npm packages
ENV PATH="${PATH}:/root/.nvm/versions/node/v14.18.1/bin/"

# Prod dependencies
RUN npm i http-server -g;