import { client } from '$lib/database';
import { error, redirect } from '@sveltejs/kit';
export async function load({ params, locals }) {
    const link = params.link;
    if (!locals.admin && locals.user.credits <= 0) {
        throw error(500, "Not enough credits!");
    }
    const test = await client.test.findUnique({
        where: {
            shareLink: link
        },
        include: {
            questions: true
        }
    });
    if (!test || !locals.admin && !locals.user) {
        throw redirect(302, '/');
    }
    return test;
}
//# sourceMappingURL=+page.server.js.map