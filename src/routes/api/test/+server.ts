import { client } from '$lib/database'
import { json } from '@sveltejs/kit'

export async function GET({ request }: any) {
	const data = (
		await client.test.findMany({
			include: {
				scores: true
			}
		})
	).reverse()
	return json({ data })
}
