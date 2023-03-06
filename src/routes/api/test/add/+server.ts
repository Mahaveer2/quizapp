import { client } from '$lib/database'
import { json } from '@sveltejs/kit'

export async function POST({ request }: any) {
  const formData = await request.formData()
  
  interface Question {
    questionText: string;
    correctAnswer: string;
  }

  const questions : Question[] = JSON.parse(formData.get('questions'));
	try {

		const test = await client.test.create({
      data: {
        name: formData.get('name'),
        shareLink:crypto.randomUUID(),
        questions: {
          create:questions,
        },
      },
      include: { questions: true },
    })

		return json({ success: true })
	} catch (e) {
		console.log(e)
	}
}