import { client } from '$lib/database'
import { json } from '@sveltejs/kit'

export async function POST({ request }: any) {
	const formData = await request.formData()

	const data = await client.chat.findMany({
		where:{
			studentId:Number(formData.get('studentId')),
		},
	})

	return json({data});
}
