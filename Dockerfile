FROM node:16.15-bullseye

RUN apt update

WORKDIR /project

# Copy package.json and package-lock.json (if available)
COPY package.json ./
#COPY package-lock.json ./ # Include this line if you have a package-lock.json file

# Install dependencies
RUN npm install

# Copy application files
COPY . .

EXPOSE 4003/tcp

CMD ["npm", "start"]
