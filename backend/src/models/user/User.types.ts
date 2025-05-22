import { Document } from 'mongoose'

export interface IUser extends Document {
	email: string
	name: string
}

export interface UsersFilterInput  {
	search?: string
}

export interface UsersArgs  {
	skip?: number
	limit?: number
	filter?: UsersFilterInput
}

export interface UserArgs  {
	id: string
}

export interface CreateUserInput {
	email: string
	name: string
}

export interface UpdateUserInput {
	email?: string
	name?: string
}

export interface CreateUserArgs {
	input: CreateUserInput
}

export interface UpdateUserArgs {
	id: string
	input: UpdateUserInput
}

export interface DeleteUserArgs {
	id: string
}