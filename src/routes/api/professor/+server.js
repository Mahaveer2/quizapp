import { client } from '$lib/database';
import { json } from '@sveltejs/kit';
export async function POST({ request }) {
    const form = await request.formData();
    let obj = Object.fromEntries(Array.from(form.keys()).map((key) => [
        key,
        form.getAll(key).length > 1 ? form.getAll(key) : form.get(key)
    ]));
    const prof = obj;
    const isEmailTaken = await client.admin.findUnique({ where: { email: prof.email } });
    if (isEmailTaken) {
        return json({
            status: 500,
            message: 'Email already taken!'
        });
    }
    if (prof.email == '' || prof.name == '' || prof.password == '') {
        return json({
            status: 500,
            message: 'Invalid Fields!'
        });
    }
    let admin = await client.admin.create({
        data: {
            ...prof,
            userAuthToken: crypto.randomUUID()
        }
    });
    prof.id = admin.id;
    return json({
        status: 200,
        prof: prof,
        message: 'Created professor succesfully!'
    });
}
export async function DELETE({ request }) {
    try {
        const data = await request.json();
        let admin = await client.admin.delete({ where: { id: data.id } });
        return json({
            status: 200
        });
    }
    catch (e) {
        console.log(e);
        return json(e);
    }
}
export async function PATCH({ request }) {
    try {
        const prof = await request.json();
        await client.admin.update({
            where: { email: prof.email },
            data: { ...prof }
        });
        return json({
            status: 200,
            message: "Updated professor succesfully!"
        });
    }
    catch (e) {
        console.log(e);
        return json(e);
    }
}
//# sourceMappingURL=+server.js.map