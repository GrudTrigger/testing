import { UserModel } from '../models/User'

export const resolvers = {
	Query: {
		user: async (_: any, { id }: { id: string }) => {
			return await UserModel.findById(id)
		},
		users: async (
			_: any,
			{
				skip = 0,
				limit = 10,
				filter,
			}: { skip?: number; limit?: number; filter?: { search?: string } }
		) => {
			const query: any = {}
			if (filter?.search) {
				const regex = new RegExp(filter.search, 'i')
				query.$or = [{ name: regex }, { email: regex }]
			}
			return await UserModel.find(query).skip(skip).limit(limit)
		},
	},

	Mutation: {
		createUser: async (_: any, { input }: any) => {
			const user = new UserModel(input)
			return await user.save()
		},
		updateUser: async (_: any, { id, input }: any) => {
			return await UserModel.findByIdAndUpdate(id, input, { new: true })
		},
		deleteUser: async (_: any, { id }: { id: string }) => {
			return await UserModel.findByIdAndDelete(id)
		},
	},

	User: {
		id: (parent: any) => parent._id.toString(),
	},
}
