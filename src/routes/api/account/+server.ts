import { client } from "$lib/database";
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "../$types";

export async function PATCH({request}:RequestEvent){
  interface Professor{
		email:string;
		name:string;
    oldpassword:string;
    newpassword:string;
	}

  const prof : Professor = await request.json();
  const user = await client.admin.findUnique({where:{email:prof.email}})
  const isEmail = await client.admin.findMany({where:{email:prof.email}})

  if(user?.password != prof.oldpassword){
    return json({
      status:500,
      message:"Invalid credentials!"
    })
  }

  if(prof.email == "" || prof.name == "" || prof.newpassword == "" || prof.oldpassword == "" || prof.newpassword.length < 5){
    return json({
      status:500,
      message:"Invalid Fields!"
    });
  }

  if(isEmail){
    return json({
      status:500,
      message:"Email already exists"
    })
  }

  let admin = await client.admin.update({
    where:{
      email:prof.email,
    },
    data:{
      email:prof.email,
      name:prof.name,
      password:prof.newpassword     
    }
  })

  return json({
    status:200,
    message:"Updated profile succesfully!"
  })

}