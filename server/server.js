
const fs = require('fs');
const express = require('express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { ApolloServer, UserInputError } = require('apollo-server-express');

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
	return value.toISOString();
    },
    parseLiteral(ast) {
	if (ast.kind == Kind.STRING) {
	    const value = new Date(ast.value);
	    return isNaN(value) ? undefined : value;
	}
    },
    parseValue(value) {
	const dateValue = new Date(value);
	return isNaN(dateValue) ? undefined : dateValue;
    }
});

const resolvers = {
    Query: {
	about: () => aboutMessage,
	issueList,
    },
    Mutation: {
	setAboutMessage,
	issueAdd,
    },
    GraphQLDate, 
};

const issuesDB = [
    {
	id: 1, status: 'New', owner: 'Ravan', effort: 5,
	created: new Date('2019-01-15'), due: undefined,
	title: 'Error in console when clicking Add',
    },
    {
	id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
	created: new Date('2019-01-16'), due: new Date('2019-02-01'),
	title: 'Missing bottom border on panel'
    }
];

function issueValidate(issue) {
    const errors = [];
    if (issue.title.length < 3) {
	errors.push('Field "title" must be at least 3 characters long.');
    }
    if (issue.status == 'Assigned' && !issue.owner) {
	errors.push('Field "owner" is required when status is "Assigned"');
    }
    if (errors.length > 0) {
	throw new UserInputError('Invalid input(s)', { errors });
    }
}

function issueAdd(_, { issue }) {
    issueValidate(issue);
    issue.created = new Date();
    issue.id = issuesDB.length + 1;
    if (issue.status == undefined) issue.status = 'New';
    issuesDB.push(issue);
    return issue;
}

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

function issueList() {
    return issuesDB;
}

let aboutMessage = "IssueTracker API v1.0";

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
	console.log(error);
	return error;
    }
});
const app = express();
const fileServerMiddleware = express.static('public');

app.use('/', fileServerMiddleware);

server.applyMiddleware({ app, path: '/graphql'} );

app.listen(3000, function () {
    console.log('App started on port 3000');
});


