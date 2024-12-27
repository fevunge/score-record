import { PrismaClient } from '@prisma/client';
import { FastifyTypedInstance } from '../types';
import { z } from 'zod';

const prisma = new PrismaClient();  

export async function recordRoutes(app: FastifyTypedInstance) {
    app.get('/records', {
		schema : {
			tags: ['records'],
			description: 'list all records'
		}
	},
	async () => {	
        const records = await prisma.record.findMany(
            {
                orderBy: {
                    score: 'desc',
                },
            }
        )

        return (records.map((record) => {
            return {
                id: record.id,
                player: record.player,
                score: record.score.toString() 
            }
        }))
    })

	app.post('/records', {
		schema: {
			tags: ['records'],
			description: 'save a new record',
			body : {
				player: z.string(),
				score: z.number(),
			},
		},
	}, 
	async (request, reply) => {
		return reply.status(201).send()
	})
}