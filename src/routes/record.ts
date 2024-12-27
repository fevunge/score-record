import { FastifyInstance } from "fastify";

export async function recordRoutes(app: FastifyInstance) {
    app.get('/', () => {
        return ('oi')
    })
}