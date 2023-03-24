import type { Handle } from '@sveltejs/kit'
import { client } from '$lib/database'
import moment from 'moment'
import { runCreditLogic } from '$lib/hooks/credits'

export const config = {}
export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session')
	const admin_sess = event.cookies.get('admin_session')
	const adminTOM = await client.admin.findUnique({
		where: {
			email: 'tom@gmail.com'
		}
	})

	if (!admin_sess) {
		if (!session) {
			return await resolve(event)
		}
	}

	if (admin_sess) {
		const admin = await client.admin.findUnique({
			where: { userAuthToken: admin_sess },
			select: { email: true, name: true }
		})

		if (admin) {
			event.locals.admin = {
				email: admin.email,
				name: admin.name
			}
		}
	}

	// find the user based on the session
	if (session) {
		const user = await client.student.findUnique({
			where: { userAuthToken: session },
			select: {
				email: true,
				firstName: true,
				lastName: true,
				id: true,
				verified: true,
				credits: true
			}
		})

		// if `user` exists set `events.local`
		if (user) {
			event.locals.user = {
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				userId: user.id,
				credits: user.credits
			}

			if (!user.verified) {
				event.cookies.set('session', '', {
					path: '/',
					expires: new Date(0)
				})
			}

			runCreditLogic(user.email);
		}
	}

	// load page as normal
	return await resolve(event)
}
