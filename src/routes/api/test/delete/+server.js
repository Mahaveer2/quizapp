import { client } from '$lib/database';
import { json } from '@sveltejs/kit';
export async function POST({ request }) {
    const formData = await request.formData();
    const questions = JSON.parse(formData.get('questions'));
    try {
        const test = await client.test.delete({
            where: {
                shareLink: formData.get('shareLink')
            }
        });
        return json({ status: 200 });
    }
    catch (e) {
        console.log(e);
    }
}
//# sourceMappingURL=+server.js.map