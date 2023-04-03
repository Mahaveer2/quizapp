import { client } from '$lib/database';
import { json } from "@sveltejs/kit";
export const POST = async ({ request }) => {
    const form = await request.formData();
    const email = String(form.get("email"));
    const fname = String(form.get("fname"));
    const lname = String(form.get("lname"));
    const oldpass = String(form.get("oldpass"));
    const newpass = String(form.get("newpass"));
    const user = await client.student.findUnique({ where: { email: email } });
    if (!user) {
        return json({ status: 500, message: "User not found!" });
    }
    if (oldpass !== user.password) {
        return json({ status: 500, message: "Old password is incorrect!" });
    }
    if (newpass == oldpass) {
        return json({ status: 500, message: "New password cannot be equal to old password." });
    }
    await client.student.update({
        where: {
            email: email
        },
        data: {
            firstName: fname,
            lastName: lname,
            password: newpass,
        }
    });
    return json({ status: 200 });
};
//# sourceMappingURL=+server.js.map