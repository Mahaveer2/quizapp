import type { Handle } from '@sveltejs/kit'
import { client } from '$lib/database'

export const handle: Handle = async ({ event, resolve }) => {
  // get cookies from browser
  const session = event.cookies.get('session');

  if (!session) {
    // if there is no session load page as normal
    return await resolve(event)
  }

  // find the user based on the session
  const user = await client.student.findUnique({
    where: { userAuthToken: session },
    select: { email: true,firstName:true,lastName:true,id:true},
  })

  // if `user` exists set `events.local`
  if (user) {
    event.locals.user = {
      email: user.email,
      firstName:user.firstName,
      lastName:user.lastName,
      userId:user.id,
    }
  }

  // load page as normal
  return await resolve(event)
}