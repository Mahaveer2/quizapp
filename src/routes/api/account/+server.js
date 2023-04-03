import { client } from "$lib/database";
import { json } from "@sveltejs/kit";
export async function PATCH({ request }) {
    const prof = await request.json();
    const user = await client.admin.findUnique({ where: { email: prof.email } });
    const isEmail = await client.admin.findMany({ where: { email: prof.email } });
    if (user?.password != prof.oldpassword) {
        return json({
            status: 500,
            message: "Invalid credentials!"
        });
    }
    if (prof.email == "" || prof.name == "" || prof.newpassword == "" || prof.oldpassword == "" || prof.newpassword.length < 5) {
        return json({
            status: 500,
            message: "Invalid Fields!"
        });
    }
    if (isEmail) {
        return json({
            status: 500,
            message: "Email already exists"
        });
    }
    let admin = await client.admin.update({
        where: {
            email: prof.email,
        },
        data: {
            email: prof.email,
            name: prof.name,
            password: prof.newpassword
        }
    });
    return json({
        status: 200,
        message: "Updated profile succesfully!"
    });
}
//# sourceMappingURL=+server.js.map