import { LayoutServerLoad, redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, request }) => {
  
  const currentUrl = new URL(request.url);
  const currentPath = currentUrl.pathname;

  if (!locals.admin && currentPath != '/admin/login') {
    throw redirect(302, '/');
  }

  return {
    admin: locals.admin,
  };
};