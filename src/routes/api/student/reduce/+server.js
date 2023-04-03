import { client } from '$lib/database';
import { json } from '@sveltejs/kit';
export async function POST({ request }) {
    const { id, shareLink, score } = await request.json();
    await client.creditsUsed.create({
        data: {
            student: {
                connect: {
                    id: id
                }
            },
            shareLink: shareLink
        }
    });
    await client.student.update({
        where: {
            id: id
        },
        data: {
            credits: {
                decrement: 1
            },
            scores: {
                create: {
                    score: JSON.stringify(score),
                    test: {
                        connect: {
                            shareLink: String(shareLink)
                        }
                    }
                }
            }
        }
    });
    return json({
        status: 200
    });
}
//# sourceMappingURL=+server.js.map