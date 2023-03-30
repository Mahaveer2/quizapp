import { client } from '$lib/database'

export async function load({params}){
  const data = await client.admin.findMany({
    include:{
      Test:true
    }
  });

  const tests = await client.creditsUsed.findMany({})

  // console.log(data)

  return {
    professors:data,
    tests,
  }
}