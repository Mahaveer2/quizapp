import { client } from '$lib/database';
import { json } from '@sveltejs/kit';
export const POST = async ({ request, locals }) => {
    const data = await request.json();
    try {
        let req = await client.score.create({
            data: {
                student: {
                    connect: {
                        email: data.email,
                    }
                },
                test: {
                    connect: {
                        shareLink: data.shareLink,
                    }
                },
                score: JSON.stringify(data)
            }
        });
        if (req) {
            await client.student.update({
                where: {
                    email: data.email,
                },
                data: {
                    credits: {
                        decrement: 1
                    }
                }
            });
        }
        return json({
            status: 200,
        });
    }
    catch (e) {
        return json(e);
    }
};
//# sourceMappingURL=+server.js.map