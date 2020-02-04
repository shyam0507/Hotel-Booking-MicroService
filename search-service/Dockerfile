# Docker Parent Image with Node and Typescript
FROM node:13.4.0

# Create Directory for the Container
WORKDIR /app

COPY package*.json ./

RUN npm install --quiet

COPY . .

# Expose the port outside of the container
EXPOSE 3022

CMD ["node", "app.js"]

