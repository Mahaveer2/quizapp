import { client } from '$lib/database'
import { json, redirect, type Handle } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, cookies, url }) => {
	// redirect user if logged in
	const session = url.searchParams.get('auth')
	const paymentId = url.searchParams.get('paymentId')
  const quantity:number = Number(url.searchParams.get('quantity'));
	const alreadyPaymentExists = await client.paymentSessions.findUnique({
		where: { paymentId: String(paymentId) }
	})
	const user = await client.student.findUnique({
		where: {
			userAuthToken: session
		}
	})

	if (!user) {
		console.log("unvalid user")
		// throw redirect(302, '/login')
	}

	if (user) {
		locals.user = {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			userId: user.id
		}
	}

	if (alreadyPaymentExists) {
		throw redirect(302, '/account')
	}

	const addCredits = async (email: string, num: number) => {
		await client.student.update({
			where: {
				email: email
			},
			data: {
				credits: {
					increment: num
				}
			}
		})
	}

	try {
		let transaction = await client.paymentSessions.create({
			data: {
				paymentId: String(paymentId),
				student: {
					connect: {
						email: user.email
					}
				}
			}
		})

		await addCredits(String(user.email), quantity)
	} catch (e) {
		console.log(e)
	}

	return {
		msg: 'success'
	}
}

