import { client } from '$lib/database'

export async function load({params}){
  const data = await client.admin.findMany({
    include:{
      Test:true
    }
  });

  // console.log(data)

  return {
    professors:data
  }
}