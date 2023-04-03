import { client } from '$lib/database';
import { json } from '@sveltejs/kit';
export async function POST({ request }) {
    const formData = await request.formData();
    const data = await client.chat.findMany({
        where: {
            studentId: Number(formData.get('studentId')),
        },
    });
    return json({ data });
}
//# sourceMappingURL=+server.js.map