import { client } from '$lib/database';
import { json } from "@sveltejs/kit";
export const DELETE = async ({ request, locals }) => {
    const { id } = await request.json();
    const student = await client.student.findUnique({ where: { id: id } });
    if (!student) {
        return json({ status: 404, message: "User not found!" });
    }
    await client.student.delete({ where: { id: student.id } });
    return json({
        status: 200
    });
};
//# sourceMappingURL=+server.js.map