import { client } from '$lib/database'
import { json } from '@sveltejs/kit'

export async function POST({ request }) {
	const { id } = await request.json()

	await client.student.update({
		where: {
			id: id
		},
		data: {
			credits: {
				decrement: 1
			}
		}
	})
	return json({
		status: 200
	})
}
