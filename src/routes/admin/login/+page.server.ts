import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import { PrismaClient } from '@prisma/client'

export const load: PageServerLoad = async ({ locals }) => {
  // redirect user if logged in
  if (locals.admin) {
    
    throw redirect(302, '/admin')
  }
}

const logadmin: Action = async ({ cookies, request }) => {
  const db = new PrismaClient();
  const data = await request.formData()
  const email = data.get('email')
  const password = data.get('password')

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email ||
    !password
  ) {
    return fail(400, { invalid: true })
  }

  const user = await db.admin.findUnique({ where: { email } })

  if (!user) {
    return fail(400, { credentials: true })
  }

  if (user.password != password) {
    return fail(400, { credentials: true })
  }

  // generate new auth token just in case
  const authenticatedUser = await db.admin.update({
    where: { email: user.email },
    data: { userAuthToken: crypto.randomUUID() },
  })

  cookies.set('admin_session', authenticatedUser.userAuthToken, {
    // send cookie for every page
    path: '/',
    // server side only cookie so you can't use `document.cookie`
    httpOnly: true,
    // only requests from same site can send cookies
    // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
    sameSite: 'strict',
    // only sent over HTTPS in production
    secure: process.env.NODE_ENV === 'production',
    // set cookie to expire after a month
    maxAge: 60 * 60 * 24 * 30,
  })

  // redirect the user
  throw redirect(302, '/admin')
}

export const actions: Actions = { logadmin }