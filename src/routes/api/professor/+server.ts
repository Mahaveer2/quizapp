import { client } from "$lib/database";
import { json } from "@sveltejs/kit";

interface Prof{
  email:string;
  name:string;
  password:string;
  id?:number;
}

export async function POST({request}:any){
  const form = await request.formData();
  let obj = Object.fromEntries(
    Array.from(form.keys()).map(key => [
      key, form.getAll(key).length > 1 ? 
        form.getAll(key) : form.get(key)
    ])
  )
  const prof:Prof = obj;

  const isEmailTaken = await client.admin.findUnique({where:{email:prof.email}});
  
  if(isEmailTaken){
    return json({
      status:500,
      message:"Email already taken!",
    })
  }

  if(prof.email == "" || prof.name == ""||prof.password==""){
    return json({
      status:500,
      message:"Invalid Fields!"
    })
  }

  let admin = await client.admin.create({
    data:{
      ...prof,
      userAuthToken:crypto.randomUUID()
    }
  })

  prof.id = admin.id;

  return json({
    status:200,
    prof:prof,
    message:"Created professor succesfully!"
  })
}