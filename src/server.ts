import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { recordRoutes } from "./routes/record";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.register(fastifyCors, { origin: "*" })
server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)
server.register(fastifySwagger, {
    openapi: {
        info: {
            title: "online-record",
            version: "1.0.1",
        }
    }
})
server.register(fastifySwaggerUi, {
    routePrefix: "/doc",
})
server.register(recordRoutes)

server.listen({
    port: 3000
}).then(() => {
    console.log("server running!");
})