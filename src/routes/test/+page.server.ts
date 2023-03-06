import { client } from "$lib/database";
import { redirect } from "@sveltejs/kit";

export async function load({params,locals}){
  if (!locals.user) {
    throw redirect(302, '/')
  } 

}