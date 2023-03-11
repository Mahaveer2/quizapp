import { client } from '$lib/database';
import { json } from 'stream/consumers';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  interface Score{
    feedback:string;
    grade:string;
    review:string;
    score:number;
    tips:string;
    totalQuestions:number;
    email:string;
    shareLink:string;
  }
  
  const data :Score = await request.json();

  try{
    let req = await client.score.create({
      data:{
        student:{
          connect:{
            email:data.email,
          }
        },
        test:{
          connect:{
            shareLink:data.shareLink,
          }
        },
        score:JSON.stringify(data)
      }
    });

    if(req){
      await client.student.update({
        where:{
          email:data.email,
        },
        data:{
          credits:{
            decrement:1
          }
        }
      })
    }
  
    return json({
      status:200,
    });
  }catch(e){
    return json(e)
  }
}