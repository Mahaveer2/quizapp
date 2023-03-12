import { client } from '$lib/database'
import { json } from "@sveltejs/kit"
import type { RequestEvent } from './$types'

export const POST = async ({ request} : RequestEvent) => {
  const form = await request.formData();
  const email:string = String(form.get("email"));
  const fname:string = String(form.get("fname"));
  const lname:string = String(form.get("lname"));
  const oldpass:string = String(form.get("oldpass"));
  const newpass:string = String(form.get("newpass"));

  const user = await client.student.findUnique({where:{email:email}});
  if(!user){
    return json({status:500,message:"User not found!"});
  }

  if(oldpass !== user.password){
    return json({status:500,message:"Old password is incorrect!"})
  }

  if(newpass == oldpass){
    return json({status:500,message:"New password cannot be equal to old password."})
  }

  await client.student.update({
    where:{
      email:email
    },
    data:{
      firstName:fname,
      lastName:lname,
      password:newpass,
    }
  })

  return json({status:200})
}
