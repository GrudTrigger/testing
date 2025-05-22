import mongoose, { Schema } from 'mongoose'
import { IUser } from './User.types'

const UserSchema = new Schema<IUser>({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
})

export const UserModel = mongoose.model<IUser>('User', UserSchema)
