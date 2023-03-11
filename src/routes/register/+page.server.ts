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

const register: Action = async ({ cookies, request }) => {
	const data = await request.formData()
	const email = data.get('email')
  const fname = data.get('fname')
  const lname = data.get('lname')
	const password = data.get('password')

  const alreadyExists = await client.student.findUnique({where:{email:email}})

  if(alreadyExists){
    return fail(400, { credentials: true })
  }

	function validateEmail(email:string) {
		const regex = /^[^\s@]+@torontoMU\.ca$/i
		return regex.test(email)
	}

	if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
		return fail(400, { invalid: true })
	
  }

  const user = await client.student.create({
    data:{
      email:email,
      firstName:fname,
      lastName:lname,
			password:password,
      userAuthToken: crypto.randomUUID(),
    }
  })

	// redirect the user
	throw redirect(302, '/')
}

export const actions: Actions = { register }