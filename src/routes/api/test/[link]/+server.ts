import { json } from '@sveltejs/kit'
import type { RequestEvent } from '../$types'
import { client } from '$lib/database'

export async function POST({ params, request }: RequestEvent) {
	const { link } = params
	const shareLink = link;
	const form = await request.formData()

	interface Question {
    questionText: string;
    correctAnswer: string;
    marks:number;
  }

	const questions = JSON.parse(form.get('questions'))
	const modifiedQuestions : Question[] = questions.map(({ id, testId, ...rest }) => rest);

	try {
		const data = await client.test.findUnique({
			where: {
				shareLink: link
			}
		})

		if (data) {

			await client.question.deleteMany({
				where: {
					test: {
						shareLink: shareLink
					}
				}
			})

			const test = await client.test.update({
				data: {
					name: String(form.get('name')),
					questions: {
						create: modifiedQuestions
					}
				},
				where: {
					shareLink: shareLink
				},
			})

      return json({
				status: 200
			})
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
