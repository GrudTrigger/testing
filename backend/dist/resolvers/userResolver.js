"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const User_1 = require("../models/User");
exports.resolvers = {
    Query: {
        user: async (_, { id }) => {
            return await User_1.UserModel.findById(id);
        },
        users: async (_, { skip = 0, limit = 10, filter, }) => {
            const query = {};
            if (filter?.search) {
                const regex = new RegExp(filter.search, 'i');
                query.$or = [{ name: regex }, { email: regex }];
            }
            return await User_1.UserModel.find(query).skip(skip).limit(limit);
        },
    },
    Mutation: {
        createUser: async (_, { input }) => {
            const user = new User_1.UserModel(input);
            return await user.save();
        },
        updateUser: async (_, { id, input }) => {
            return await User_1.UserModel.findByIdAndUpdate(id, input, { new: true });
        },
        deleteUser: async (_, { id }) => {
            return await User_1.UserModel.findByIdAndDelete(id);
        },
    },
    User: {
        id: (parent) => parent._id.toString(),
    },
};
