import { client } from "$lib/database";
import { redirect } from "@sveltejs/kit";

export async function load({params,locals}){
  const link = params.link;

  const test = await client.test.findUnique({
    where:{
      shareLink:link
    },
    include:{
      questions:true
    }
  })

  if(!test || !locals.user || locals.user.credits <= 0){
    throw redirect(302, '/')
  }

  return test;
}