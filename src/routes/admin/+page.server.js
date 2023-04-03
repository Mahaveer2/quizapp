import { client } from "$lib/database";
export async function load() {
    const students = await client.student.findMany();
    // const profCount = await client.admin.count();
    const testCount = await client.test.count();
    const sessions = await client.creditsUsed.findMany();
    const cSession = await client.creditsUsed.findMany();
    return {
        students,
        sessions,
        testCount,
        cSession
    };
}
//# sourceMappingURL=+page.server.js.map