import { fastify } from "fastify";
import { recordRoutes } from "./routes/record";

const server = fastify()
server.register(recordRoutes)

server.listen({
    port: 3000
}).then(() => {
    console.log("server running!");
})