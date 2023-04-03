import { LayoutServerLoad, redirect } from '@sveltejs/kit';
export const load = async ({ locals, request }) => {
    const currentUrl = new URL(request.url);
    const currentPath = currentUrl.pathname;
    if (!locals.admin && currentPath !== '/admin/login') {
        throw redirect(302, '/');
    }
    return {
        admin: locals.admin,
    };
};
//# sourceMappingURL=+layout.server.js.map