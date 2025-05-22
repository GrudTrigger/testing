import { gql } from '@apollo/client'

export const CREATE_USER = gql`
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			id
			email
			name
		}
	}
`
export const UPDATE_USER = gql`
	mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
		updateUser(id: $id, input: $input) {
			id
			email
			name
		}
	}
`
export const DELETE_USER = gql`
	mutation DeleteUser($id: ID!) {
		deleteUser(id: $id) {
			id
			email
		}
	}
`
