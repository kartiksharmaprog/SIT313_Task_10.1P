FROM node:18

WORKDIR /app

COPY package*.json ./

# 🔥 Install ALL dependencies including devDependencies
RUN npm install --legacy-peer-deps --include=dev

COPY . .

# 🔥 Ensure local binaries (like eslint) are available
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 5000

CMD ["npm", "start"]