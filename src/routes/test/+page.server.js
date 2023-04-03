import { client } from "$lib/database";
import { redirect } from "@sveltejs/kit";
export async function load({ params, locals }) {
    const user = await client.student.findUnique({
        where: {
            email: locals.user.email,
        }
    });
    const tests = await client.test.findMany({});
    if (!locals.user) {
        throw redirect(302, '/');
    }
    return { user, tests };
}
//# sourceMappingURL=+page.server.js.map