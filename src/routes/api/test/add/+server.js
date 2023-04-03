import { client } from '$lib/database';
import { json } from '@sveltejs/kit';
export async function POST({ request }) {
    const formData = await request.formData();
    const questions = JSON.parse(formData.get('questions'));
    try {
        const test = await client.test.create({
            data: {
                name: formData.get('name'),
                shareLink: crypto.randomUUID(),
                questions: {
                    create: questions,
                },
            },
            include: { questions: true },
        });
        return json({ success: true });
    }
    catch (e) {
        console.log(e);
    }
}
//# sourceMappingURL=+server.js.map