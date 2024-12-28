import { PrismaClient } from '@prisma/client';
import { FastifyTypedInstance } from '../types';
import { z } from 'zod';

const prisma = new PrismaClient();  

export async function recordRoutes(app: FastifyTypedInstance) {
    app.get('/records', {
		schema : {
			tags: ['records'],
			description: 'LIST ALL RECORDS',
			response: {
			200: z.array(z.object({
					id: z.string(),
					player: z.string(),
					score: z.string(),
				})),
			},
		},
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
			description: 'CREATE A NEW RECORD',
			body : z.object({
				player: z.string(),
				score: z.number(),
			}),
			response: {
				201: z.null().describe('Record created'),
			},
		},
	}, 
	async (request, reply) => {
		const {player, score} = request.body
		await prisma.record.create({
			data: {
				player,
				score,
			}
		})
		return reply.status(201).send()
	})
}