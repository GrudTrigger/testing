"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.typeDefs = (0, graphql_tag_1.gql) `
	scalar Email

	type Query {
		user(id: ID!): User!
		users(skip: Int = 0, limit: Int = 10, filter: UsersFilterInput): [User]
	}

	input UsersFilterInput {
		search: String
	}

	type Mutation {
		createUser(input: CreateUserInput!): User!
		updateUser(id: ID!, input: UpdateUserInput!): User!
		deleteUser(id: ID!): User!
	}

	type User {
		id: ID!
		email: Email!
		name: String!
	}

	input CreateUserInput {
		email: Email!
		name: String!
	}

	input UpdateUserInput {
		email: Email
		name: String
	}
`;
