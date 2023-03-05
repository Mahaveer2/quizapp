import { r as redirect, f as fail } from "../../../chunks/index.js";
import { PrismaClient } from "@prisma/client";
const load = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, "/");
  }
};
const login = async ({ cookies, request }) => {
  const db = new PrismaClient();
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return fail(400, { invalid: true });
  }
  const user = await db.student.findUnique({ where: { email } });
  if (!user) {
    return fail(400, { credentials: true });
  }
  if (user.password != password) {
    return fail(400, { credentials: true });
  }
  const authenticatedUser = await db.student.update({
    where: { email: user.email },
    data: { userAuthToken: crypto.randomUUID() }
  });
  cookies.set("session", authenticatedUser.userAuthToken, {
    // send cookie for every page
    path: "/",
    // server side only cookie so you can't use `document.cookie`
    httpOnly: true,
    // only requests from same site can send cookies
    // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
    sameSite: "strict",
    // only sent over HTTPS in production
    secure: process.env.NODE_ENV === "production",
    // set cookie to expire after a month
    maxAge: 60 * 60 * 24 * 30
  });
  throw redirect(302, "/");
};
const actions = { login };
export {
  actions,
  load
};
