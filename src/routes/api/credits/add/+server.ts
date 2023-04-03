import { VITE_QSTASH_TOKEN,DOMAIN, VITE_QSTASH_SECRET } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { client } from '$lib/database'

export async function POST({ request }: RequestHandler) {
	const { studentId, secret } = await request.json()
	if (secret != VITE_QSTASH_SECRET) {
		return json('Error')
	}

  await client.student.update({where:{id:studentId},data:{
    credits:{
      increment:1
    }
  }})

	fetch(`https://qstash.upstash.io/v1/publish/${DOMAIN}api/add`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${VITE_QSTASH_TOKEN}`,
			'Upstash-Delay': '7d',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			studentID: studentId,
			secret: VITE_QSTASH_SECRET,
		})
	})
		.then((response) => {
			// Handle the response here
		})
		.catch((error) => {
			// Handle any errors here
      console.log(error)
		})

		return json("fetch completed");
}
