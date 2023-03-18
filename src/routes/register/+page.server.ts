import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import { PrismaClient } from '@prisma/client'
import { client } from '$lib/database'

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, '/')
	}
}

function validateEmail(email: string) {
	const domain = '@torontoMU.ca'
	return email.endsWith(domain)
}

const register: Action = async ({ cookies, request }) => {
	const data = await request.formData()
	const email: string = String(data.get('email'))
	const fname: string = String(data.get('fname'))
	const lname: string = String(data.get('lname'))
	const password: string = String(data.get('password'))

	const alreadyExists = await client.student.findUnique({ where: { email: email } })

	if (alreadyExists) {
		return fail(400, { credentials: true })
	}

	// if (!validateEmail(email)) {
	// 	return fail(500, { invalidEmail: true })
	// }

	// function validateEmail(email: string) {
	// 	const regex = /^[^\s@]+@torontoMU\.ca$/i
	// 	return regex.test(email)
	// }

	if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
		return fail(400, { invalid: true })
	}

	const user = await client.student.create({
		data: {
			email: email,
			firstName: fname,
			lastName: lname,
			password: password,
			userAuthToken: crypto.randomUUID(),
			verified:true
		}
	})

	cookies.set('session', user.userAuthToken, {
		// send cookie for every page
		path: '/',
		// server side only cookie so you can't use `document.cookie`
		httpOnly: true,
		// only requests from same site can send cookies
		// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
		// sameSite: 'strict',
		// only sent over HTTPS in production
		secure: process.env.NODE_ENV === 'production',
		// set cookie to expire after a month
		maxAge: 60 * 60 * 24 * 30
	})

	// redirect the user
	throw redirect(302, '/')
}

export const actions: Actions = { register }
