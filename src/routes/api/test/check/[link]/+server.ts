import { json } from '@sveltejs/kit'
import type { RequestEvent } from '../$types'
import { client } from '$lib/database'

export async function GET({ params }: RequestEvent) {
	const { link } = params

	try {
		const data = await client.test.findUnique({
			where: {
				shareLink: link
			}
		})

		if (data) {
      return json({status:200})
		} else {
			return json({
				status: 500,
				message: 'Sharelink is expired or invalid!'
			})
		}
	} catch (e) {
		console.log(e)
		return json(e)
	}

	return json({
		status: 500,
		message: 'Invalid ShareLink!'
	})
}
