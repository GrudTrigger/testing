import { Types } from "mongoose";


import {
  UserArgs,
  UsersArgs,
  CreateUserArgs,
  UpdateUserArgs,
  DeleteUserArgs,
} from "./types/user.type.resolver";
import { UserModel } from "../models/user/User";

export const resolvers = {
  Query: {
    user: async (_: unknown, { id }: UserArgs) => {
      return await UserModel.findById(id);
    },
    users: async (_: unknown, { skip = 0, limit = 10, filter }: UsersArgs) => {
      const query: any = {};
      if (filter?.search) {
        const regex = new RegExp(filter.search, "i");
        query.$or = [{ name: regex }, { email: regex }];
      }
      return await UserModel.find(query).skip(skip).limit(limit);
    },
  },

  Mutation: {
    createUser: async (_: unknown, { input }: CreateUserArgs) => {
      const user = new UserModel(input);
      return await user.save();
    },
    updateUser: async (_: unknown, { id, input }: UpdateUserArgs) => {
      return await UserModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteUser: async (_: unknown, { id }: DeleteUserArgs) => {
      return await UserModel.findByIdAndDelete(id);
    },
  },

  User: {
    id: (parent: { _id: Types.ObjectId | string }) => parent._id.toString(),
  },
};
