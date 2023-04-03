import { client } from '$lib/database';
import { json } from '@sveltejs/kit';
export async function POST({ request }) {
    try {
        const formData = await request.formData();
        const data = await client.chat.create({
            data: {
                student: {
                    connect: {
                        id: Number(formData.get('id'))
                    }
                },
                studentId: Number(formData.get('id')),
                prompt: formData.get('prompt') + '',
                returnMsg: formData.get('answer') + ''
            }
        });
        return json({ success: true });
    }
    catch (e) {
        console.log(e);
    }
}
//# sourceMappingURL=+server.js.map