
const typeDefs = `
type Query {
    about: String!
}
type Mutation {
    setAboutMessage(message: String!): String
}
`;

const express = require('express');
const app = express();

const fileServerMiddleware = express.static('public');

app.use('/', fileServerMiddleware);

app.listen(3000, function () {
    console.log('App started on port 3000');
});


