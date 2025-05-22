import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { resolvers } from './resolvers/userResolver'
import { typeDefs } from './schema/typeDefs'

dotenv.config()

async function startServer() {
	const app = express()

	await mongoose.connect(
		process.env.MONGODB_URI || 'mongodb://localhost:27017/users_db'
	)

	const server = new ApolloServer({ typeDefs, resolvers })
	await server.start()
	app.use(
		'/graphql',
		cors({
			origin: 'http://localhost:5173',
			credentials: true,
		}),
		express.json(),
		expressMiddleware(server)
	)

	const PORT = process.env.PORT || 4000
	app.listen(PORT, () => {
		console.log(`🚀 Server running on http://localhost:${PORT}/graphql`)
	})
}

startServer()
