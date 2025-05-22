"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userResolver_1 = require("./resolvers/userResolver");
const typeDefs_1 = require("./schema/typeDefs");
dotenv_1.default.config();
async function startServer() {
    const app = (0, express_1.default)();
    await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/users_db');
    const server = new server_1.ApolloServer({ typeDefs: typeDefs_1.typeDefs, resolvers: userResolver_1.resolvers });
    await server.start();
    //@ts-ignore
    app.use('/graphql', (0, cors_1.default)(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server));
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
    });
}
startServer();
