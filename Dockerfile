# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies w/ yarn
COPY package.json ./
COPY yarn.lock ./
RUN yarn --silent
RUN yarn add react-scripts@3.4.1 -g --silent

# install dependencies w/ npm
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent


# add app
COPY . ./

# start app w/ yarn
CMD ["yarn", "start"]

# start app w/ npm
# CMD ["npm", "start"]
