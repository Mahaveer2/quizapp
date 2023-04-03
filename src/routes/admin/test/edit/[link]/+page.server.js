import { client } from "$lib/database";
import { error } from '@sveltejs/kit';
export async function load({ params }) {
    const shareLink = params.link;
    const isTest = await client.test.findUnique({ where: { shareLink }, include: { questions: true } });
    if (!isTest) {
        throw error(404, {
            message: 'Test not found!'
        });
    }
    return { test: isTest };
}
//# sourceMappingURL=+page.server.js.map