import { client } from "$lib/database";
import { json } from "@sveltejs/kit";
export async function load() {
    const students = await client.student.findMany({
        include: {
            creditsUsed: true
        }
    });
    return {
        students: students
    };
}
//# sourceMappingURL=+page.server.js.map