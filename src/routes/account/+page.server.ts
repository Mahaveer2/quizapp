import type { RequestEvent } from '../$types'
import paypal from 'paypal-rest-sdk'
import { VITE_PAYPAL_CLIENT, VITE_PAYPAL_SECRET, DOMAIN, DEBUG } from '$env/static/private'
import { json, redirect, fail, error } from '@sveltejs/kit'
import { client } from '$lib/database'
import type { Action, Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const credits: any = await client.student.findUnique({
		where: {
			email: locals.user.email
		},
		select: {
			credits: true
		}
	})
	// redirect user if logged in
	if (!locals.user) {
		throw redirect(302, '/')
	}

	return {
		credits: credits
	}
}

const pay: Action = async ({ request, cookies }) => {
	const session = cookies.get('session')
	const form = await request.formData()
	const quantity: number = Number(form.get('amount'))
	const user = await client.student.findUnique({ where: { email: form.get('email') } })
	if (!user) {
		throw error(500, 'Invalid')
	}

	paypal.configure({
		mode: 'sandbox', //sandbox or live
		client_id: VITE_PAYPAL_CLIENT,
		client_secret: VITE_PAYPAL_SECRET
	})

	const siteUrl = DEBUG ? 'http://localhost:5173/' : DOMAIN

	const create_payment_json = {
		intent: 'sale',
		payer: {
			payment_method: 'paypal'
		},
		redirect_urls: {
			return_url: siteUrl + 'credit/success' + '?auth=' + session + '&quantity=' + quantity,
			cancel_url: siteUrl + 'credit/error'
		},
		transactions: [
			{
				item_list: {
					items: [
						{
							name: 'Test Credit',
							sku: '001',
							price: '1.00',
							currency: 'USD',
							quantity: quantity
						}
					]
				},
				amount: {
					currency: 'USD',
					total: quantity
				},
				description: 'Credits for profbot.'
			}
		]
	}

	const paymentPromise = new Promise<string>((resolve, reject) => {
		paypal.payment.create(create_payment_json, function (error, payment) {
			if (error) {
				reject(error)
			} else {
				for (let i = 0; i < payment.links.length; i++) {
					if (payment.links[i].rel === 'approval_url') {
						resolve(payment.links[i].href)
					}
				}
			}
		})
	})

	const url = await paymentPromise

	throw redirect(302, url)
}

export const actions: Actions = { pay }
