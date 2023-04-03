import { VITE_QSTASH_TOKEN, VITE_QSTASH_SECRET, DOMAIN } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export async function POST({ request }: RequestHandler) {
	const { studentId, secret } = await request.json()
	if (secret != VITE_QSTASH_SECRET) {
		return json('Error')
	}

	fetch(`https://qstash.upstash.io/v1/publish/${DOMAIN}api/credits/add`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${VITE_QSTASH_TOKEN}`,
			'Upstash-Delay': '7d',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			studentID: studentId,
			secret: VITE_QSTASH_SECRET
		})
	})
		.then((response) => {
			// Handle the response here
		})
		.catch((error) => {
			// Handle any errors here
			console.log(error)
		})

		return json("added cronjob Submitted succesfully!")
}
