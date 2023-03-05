import { c as client } from "./database.js";
const handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session");
  if (!session) {
    return await resolve(event);
  }
  const user = await client.student.findUnique({
    where: { userAuthToken: session },
    select: { email: true, firstName: true, lastName: true, id: true }
  });
  if (user) {
    event.locals.user = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user.id
    };
  }
  return await resolve(event);
};
export {
  handle
};
