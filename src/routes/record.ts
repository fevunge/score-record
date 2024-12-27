import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();  

export async function recordRoutes(app: FastifyInstance) {
    app.get('/', () => {
        return ('oi')
    })
}