FROM node:10.9.0
COPY ./ .
RUN ["npm", "install", "."]
CMD ["node", "."]
