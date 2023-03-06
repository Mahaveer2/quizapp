import { client } from "$lib/database";
import { redirect } from "@sveltejs/kit";

export async function load({params}){
  const link = params.link;

  const test = await client.test.findUnique({
    where:{
      shareLink:link
    },
    include:{
      questions:true
    }
  })

  if(!test){
    throw redirect(302, '/')
  }

  return test;
}