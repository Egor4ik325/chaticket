FROM node
COPY ./package.json /code/package.json
COPY ./package-lock.json /code/package-lock.json
WORKDIR /code
RUN npm install
COPY . /code